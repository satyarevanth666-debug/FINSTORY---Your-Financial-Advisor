function initDelayImpact() {
    let delayChartInstance = null;

    const monthlyInput = document.getElementById('delay-monthly');
    const totalYearsInput = document.getElementById('delay-total-years');
    const delayYearsInput = document.getElementById('delay-years');

    const nowValEl = document.getElementById('delay-now-val');
    const laterValEl = document.getElementById('delay-later-val');
    const costEl = document.getElementById('delay-cost');

    function calculateDelay() {
        const P = parseFloat(monthlyInput.value) || 0;
        const totalYears = parseFloat(totalYearsInput.value) || 0;
        const delayYears = parseFloat(delayYearsInput.value) || 0;
        
        const r = 12; // Assuming 12% return for this specific educational simulator
        const i = r / 100 / 12;
        
        // Started Now
        const monthsNow = totalYears * 12;
        let wealthNow = P * ((Math.pow(1 + i, monthsNow) - 1) / i) * (1 + i);

        // Started Later
        let yearsRemaining = totalYears - delayYears;
        let wealthLater = 0;
        if(yearsRemaining > 0) {
            const monthsLater = yearsRemaining * 12;
            wealthLater = P * ((Math.pow(1 + i, monthsLater) - 1) / i) * (1 + i);
        }

        let costOfDelay = wealthNow - wealthLater;

        nowValEl.textContent = formatCurrency(wealthNow);
        laterValEl.textContent = formatCurrency(wealthLater);
        costEl.textContent = formatCurrency(costOfDelay);

        updateChart(P, i, totalYears, delayYears);
    }

    function updateChart(P, i, totalYears, delayYears) {
        const ctx = document.getElementById('delayChart').getContext('2d');
        
        let labels = [];
        let nowData = [];
        let laterData = [];

        for(let yr = 1; yr <= totalYears; yr++) {
            labels.push(`Year ${yr}`);
            
            // Now Data
            let monthsN = yr * 12;
            let valN = P * ((Math.pow(1 + i, monthsN) - 1) / i) * (1 + i);
            nowData.push(valN);

            // Later Data
            if(yr <= delayYears) {
                laterData.push(0);
            } else {
                let monthsL = (yr - delayYears) * 12;
                let valL = P * ((Math.pow(1 + i, monthsL) - 1) / i) * (1 + i);
                laterData.push(valL);
            }
        }

        if (delayChartInstance) delayChartInstance.destroy();

        delayChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Started Immediately',
                        data: nowData,
                        borderColor: '#3B82F6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3
                    },
                    {
                        label: `Started after ${delayYears} years`,
                        data: laterData,
                        borderColor: '#EF4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
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
    [monthlyInput, totalYearsInput, delayYearsInput].forEach(el => {
        if(el) el.addEventListener('input', calculateDelay);
    });

    calculateDelay();
}
window.initDelayImpact = initDelayImpact;
