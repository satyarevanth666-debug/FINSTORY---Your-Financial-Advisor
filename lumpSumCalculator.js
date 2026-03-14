function initLumpSumCalculator() {
    let lumpChartInstance = null;

    const principalInput = document.getElementById('lump-principal');
    const rateInput = document.getElementById('lump-rate');
    const yearsInput = document.getElementById('lump-years');

    const futureValueEl = document.getElementById('lump-future-value');
    const profitEl = document.getElementById('lump-profit');

    function calculateLumpSum() {
        const P = parseFloat(principalInput.value) || 0;
        const r = parseFloat(rateInput.value) || 0;
        const n = parseFloat(yearsInput.value) || 0;

        // Formula: A = P(1+r)^n
        const rate = r / 100;
        let futureValue = P * Math.pow((1 + rate), n);
        let profit = futureValue - P;

        futureValueEl.textContent = formatCurrency(futureValue);
        profitEl.textContent = formatCurrency(profit);

        updateChart(P, rate, n);
    }

    function updateChart(P, rate, n) {
        const ctx = document.getElementById('lumpChart').getContext('2d');
        
        let labels = [];
        let investedData = [];
        let futureData = [];

        for(let yr = 1; yr <= n; yr++) {
            labels.push(`Year ${yr}`);
            let fv = P * Math.pow((1 + rate), yr);
            investedData.push(P);
            futureData.push(fv);
        }

        if (lumpChartInstance) lumpChartInstance.destroy();

        lumpChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Principal Invested',
                        data: investedData,
                        borderColor: '#E2E8F0',
                        borderDash: [5, 5],
                        fill: false,
                        tension: 0,
                        borderWidth: 2
                    },
                    {
                        label: 'Future Value',
                        data: futureData,
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
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
    [principalInput, rateInput, yearsInput].forEach(el => {
        if(el) el.addEventListener('input', calculateLumpSum);
    });

    calculateLumpSum();
}
window.initLumpSumCalculator = initLumpSumCalculator;
