function initSIPCalculator() {
    let sipChartInstance = null;

    const monthlyInput = document.getElementById('sip-monthly');
    const rateInput = document.getElementById('sip-rate');
    const yearsInput = document.getElementById('sip-years');

    const totalInvestedEl = document.getElementById('sip-total-invested');
    const futureValueEl = document.getElementById('sip-future-value');
    const wealthGainedEl = document.getElementById('sip-wealth-gained');

    function calculateSIP() {
        const P = parseFloat(monthlyInput.value) || 0;
        const r = parseFloat(rateInput.value) || 0;
        const n = parseFloat(yearsInput.value) || 0;

        const i = r / 100 / 12; // monthly rate
        const months = n * 12;

        let totalInvested = P * months;
        // SIP Formula: M = P × ({[1 + i]^n - 1} / i) × (1 + i).
        let futureValue = P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
        let wealthGained = futureValue - totalInvested;

        totalInvestedEl.textContent = formatCurrency(totalInvested);
        futureValueEl.textContent = formatCurrency(futureValue);
        wealthGainedEl.textContent = formatCurrency(wealthGained);

        updateChart(P, i, n);
    }

    function updateChart(P, i, n) {
        const ctx = document.getElementById('sipChart').getContext('2d');
        
        let labels = [];
        let investedData = [];
        let futureData = [];

        for(let yr = 1; yr <= n; yr++) {
            labels.push(`Year ${yr}`);
            let months = yr * 12;
            let inv = P * months;
            let fv = P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
            investedData.push(inv);
            futureData.push(fv);
        }

        if (sipChartInstance) sipChartInstance.destroy();

        sipChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Total Invested',
                        data: investedData,
                        borderColor: '#E2E8F0',
                        backgroundColor: 'rgba(226, 232, 240, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 2
                    },
                    {
                        label: 'Future Wealth',
                        data: futureData,
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
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
    [monthlyInput, rateInput, yearsInput].forEach(el => {
        if(el) el.addEventListener('input', calculateSIP);
    });

    // Initial calculation
    calculateSIP();
}
window.initSIPCalculator = initSIPCalculator;
