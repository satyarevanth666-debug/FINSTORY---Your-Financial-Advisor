function initCompoundingVisualizer() {
    let compChartInstance = null;

    const initialInput = document.getElementById('comp-initial');
    const annualInput = document.getElementById('comp-annual');
    const yearsInput = document.getElementById('comp-years');

    function calculateCompounding() {
        const P = parseFloat(initialInput.value) || 0;
        const A = parseFloat(annualInput.value) || 0;
        const n = parseFloat(yearsInput.value) || 0;
        const r = 12; // Static 12% for visualizer
        const rate = r / 100;

        updateChart(P, A, rate, n);
    }

    function updateChart(P, A, rate, n) {
        const ctx = document.getElementById('compChart').getContext('2d');
        
        let labels = [];
        let principalData = [];
        let returnsData = [];

        for(let yr = 0; yr <= n; yr++) {
            labels.push(`Year ${yr}`);
            
            // Total principal put in
            let principal = P + (A * yr);
            principalData.push(principal);

            // Future value with annual compound + annual contributions at year start
            let fv = P * Math.pow(1 + rate, yr);
            if(yr > 0) {
                // Future value of an annuity due (since contributions are yearly)
                // PMT * [((1+r)^n - 1) / r]
                let fvAnnuity = A * ((Math.pow(1 + rate, yr) - 1) / rate);
                fv += fvAnnuity;
            }
            
            let returns = fv - principal;
            returnsData.push(returns < 0 ? 0 : returns);
        }

        if (compChartInstance) compChartInstance.destroy();

        compChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Contributions',
                        data: principalData,
                        backgroundColor: '#3B82F6',
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Compound Returns',
                        data: returnsData,
                        backgroundColor: '#10B981',
                        stack: 'Stack 0'
                    }
                ]
            },
            options: {
                ...defaultChartOptions,
                plugins: {
                    ...defaultChartOptions.plugins,
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        grid: { display: false }
                    },
                    y: {
                        stacked: true,
                        grid: { color: 'rgba(255,255,255,0.05)' },
                        ticks: defaultChartOptions.scales.y.ticks
                    }
                }
            }
        });
    }

    // Event Listeners
    [initialInput, annualInput, yearsInput].forEach(el => {
        if(el) el.addEventListener('input', calculateCompounding);
    });

    calculateCompounding();
}
window.initCompoundingVisualizer = initCompoundingVisualizer;
