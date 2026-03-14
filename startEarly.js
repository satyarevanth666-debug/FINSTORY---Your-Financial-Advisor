function initStartEarly() {
    let earlyChartInstance = null;

    const monthlyInput = document.getElementById('early-monthly');
    const rateInput = document.getElementById('early-rate');

    const valAEl = document.getElementById('early-a-value');
    const valBEl = document.getElementById('early-b-value');

    function calculateStartEarly() {
        const P = parseFloat(monthlyInput.value) || 0;
        const r = parseFloat(rateInput.value) || 0;
        const i = r / 100 / 12; // monthly rate
        
        // Investor A: 22 to 60 (38 years)
        const yearsA = 38;
        const monthsA = yearsA * 12;
        let futureValueA = P * ((Math.pow(1 + i, monthsA) - 1) / i) * (1 + i);
        
        // Investor B: 32 to 60 (28 years)
        const yearsB = 28;
        const monthsB = yearsB * 12;
        let futureValueB = P * ((Math.pow(1 + i, monthsB) - 1) / i) * (1 + i);

        valAEl.textContent = formatCurrency(futureValueA);
        valBEl.textContent = formatCurrency(futureValueB);

        updateChart(P, i, yearsA, yearsB);
    }

    function updateChart(P, i, yearsA, yearsB) {
        const ctx = document.getElementById('earlyChart').getContext('2d');
        
        let labels = [];
        let dataA = [];
        let dataB = [];

        // Track from age 22 to 60.
        // Age is 22 + current year span.
        for(let age = 22; age <= 60; age++) {
            labels.push(`Age ${age}`);
            
            // A starts at 22
            let nA = age - 22;
            let valA = nA > 0 ? P * ((Math.pow(1 + i, nA * 12) - 1) / i) * (1 + i) : 0;
            dataA.push(valA);

            // B starts at 32
            let nB = age - 32;
            let valB = nB > 0 ? P * ((Math.pow(1 + i, nB * 12) - 1) / i) * (1 + i) : 0;
            dataB.push(valB);
        }

        if (earlyChartInstance) earlyChartInstance.destroy();

        earlyChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Investor A (Started 22)',
                        data: dataA,
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: 'Investor B (Started 32)',
                        data: dataB,
                        borderColor: '#F59E0B',
                        backgroundColor: 'rgba(245, 158, 11, 0.2)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3
                    }
                ]
            },
            options: defaultChartOptions
        });
    }

    // Event Listeners
    [monthlyInput, rateInput].forEach(el => {
        if(el) el.addEventListener('input', calculateStartEarly);
    });

    calculateStartEarly();
}
window.initStartEarly = initStartEarly;
