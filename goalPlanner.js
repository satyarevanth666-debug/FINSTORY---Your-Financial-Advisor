function initGoalPlanner() {
    let goalChartInstance = null;

    const amountInput = document.getElementById('goal-amount');
    const yearsInput = document.getElementById('goal-years');
    const rateInput = document.getElementById('goal-rate');

    const resultSipEl = document.getElementById('goal-sip');

    function calculateGoal() {
        const A = parseFloat(amountInput.value) || 0;
        const n = parseFloat(yearsInput.value) || 0;
        const r = parseFloat(rateInput.value) || 0;

        const i = r / 100 / 12; // monthly rate
        const months = n * 12;

        // Formula for required SIP: P = (A * i) / (((1+i)^n - 1) * (1+i))
        // Where P is monthly sip, A is target amount, i is monthly rate, n is months
        let requiredSip = 0;
        if(i > 0 && months > 0) {
            requiredSip = (A * i) / ((Math.pow(1 + i, months) - 1) * (1 + i));
        } else if(months > 0) {
            requiredSip = A / months;
        }

        resultSipEl.textContent = formatCurrency(requiredSip);

        updateChart(requiredSip, i, n, A);
    }

    function updateChart(P, i, n, targetAmt) {
        const ctx = document.getElementById('goalChart').getContext('2d');
        
        let labels = [];
        let wealthData = [];
//        let targetData = [];

        for(let yr = 1; yr <= n; yr++) {
            labels.push(`Year ${yr}`);
            let months = yr * 12;
            let fv = P * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
            wealthData.push(fv);
//            targetData.push(targetAmt);
        }

        if (goalChartInstance) goalChartInstance.destroy();

        goalChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Projected Wealth',
                        data: wealthData,
                        borderColor: '#10B981',
                        backgroundColor: 'rgba(16, 185, 129, 0.2)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3
                    }
                ]
            },
            options: {
                ...defaultChartOptions,
                plugins: {
                    ...defaultChartOptions.plugins,
                    annotation: {
                        // In a real project with chartjs-plugin-annotation we could draw the target line.
                        // For pure chart.js we can add a second dataset for the target line.
                    }
                }
            }
        });
        
        // Let's add target line dataset
        goalChartInstance.data.datasets.push({
            label: 'Goal Target',
            data: Array(n).fill(targetAmt),
            borderColor: '#EF4444',
            borderDash: [5, 5],
            fill: false,
            tension: 0,
            pointRadius: 0,
            borderWidth: 2
        });
        goalChartInstance.update();
    }

    // Event Listeners
    [amountInput, yearsInput, rateInput].forEach(el => {
        if(el) el.addEventListener('input', calculateGoal);
    });

    calculateGoal();
}
window.initGoalPlanner = initGoalPlanner;
