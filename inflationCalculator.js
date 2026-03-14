function initInflationCalculator() {
    let inflationChartInstance = null;

    const currentInput = document.getElementById('inf-current');
    const rateInput = document.getElementById('inf-rate');
    const yearsInput = document.getElementById('inf-years');

    const futurePriceEl = document.getElementById('inf-future-price');
    const powerLossEl = document.getElementById('inf-power-loss');

    function calculateInflation() {
        const C = parseFloat(currentInput.value) || 0;
        const inf = parseFloat(rateInput.value) || 0;
        const n = parseFloat(yearsInput.value) || 0;

        const infRate = inf / 100;
        
        let futurePrice = C * Math.pow((1 + infRate), n);
        
        // Purchasing power loss: The value of 1 unit of money today in n years
        let valueOfOneUnit = C / futurePrice; // ratio
        let powerLoss = (1 - valueOfOneUnit) * 100;

        futurePriceEl.textContent = formatCurrency(futurePrice);
        powerLossEl.textContent = powerLoss.toFixed(1) + '%';

        updateChart(C, infRate, n);
    }

    function updateChart(C, infRate, n) {
        const ctx = document.getElementById('inflationChart').getContext('2d');
        
        let labels = [];
        let priceData = [];
//        let powerData = [];

        for(let yr = 0; yr <= n; yr++) {
            labels.push(`Year ${yr}`);
            let fp = C * Math.pow((1 + infRate), yr);
            priceData.push(fp);
//            powerData.push(C / Math.pow((1+infRate), yr)); // alternative way to show declining power
        }

        if (inflationChartInstance) inflationChartInstance.destroy();

        inflationChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Cost of Item',
                        data: priceData,
                        backgroundColor: '#EF4444',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                ...defaultChartOptions,
                plugins: {
                    ...defaultChartOptions.plugins,
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Cost: ' + formatCurrency(context.raw);
                            }
                        }
                    }
                }
            }
        });
    }

    // Event Listeners
    [currentInput, rateInput, yearsInput].forEach(el => {
        if(el) el.addEventListener('input', calculateInflation);
    });

    calculateInflation();
}
window.initInflationCalculator = initInflationCalculator;
