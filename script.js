// Format numbers as Indian Rupee Currency
window.formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(Math.round(value));
};

// Global Chart Options for Fintech aesthetic
Chart.defaults.color = '#94A3B8';
Chart.defaults.font.family = "'Inter', sans-serif";
window.defaultChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: { color: '#E2E8F0', font: { size: 12 } }
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(11, 17, 32, 0.9)',
            titleColor: '#E2E8F0',
            bodyColor: '#10B981',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            padding: 10
        }
    },
    scales: {
        x: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { maxTicksLimit: 10 }
        },
        y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: {
                callback: function(value) {
                    if(value >= 10000000) return '₹' + (value/10000000).toFixed(1) + 'Cr';
                    if(value >= 100000) return '₹' + (value/100000).toFixed(1) + 'L';
                    if(value >= 1000) return '₹' + (value/1000).toFixed(1) + 'k';
                    return '₹' + value;
                }
            }
        }
    },
    interaction: {
        mode: 'nearest',
        axis: 'x',
        intersect: false
    }
};

// General Utilities to handle range slider text update and input syncing
function linkInputAndRange(inputId, rangeId, displayId, suffix = '') {
    const input = document.getElementById(inputId);
    const range = document.getElementById(rangeId);
    const display = document.getElementById(displayId);
    
    if(!input || !range) return;

    // Optional: if input doesn't exist but range does (e.g., years where we only have range)
    if(range && display) {
        range.addEventListener('input', () => {
            display.textContent = `${range.value} ${suffix}`;
            if(input) input.value = range.value;
        });
    }

    if(input && range) {
        input.addEventListener('input', () => {
            range.value = input.value;
            if(display) display.textContent = `${range.value} ${suffix}`;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Sync UI elements across calculators
    linkInputAndRange(null, 'sip-years', 'sip-years-val', 'Years');
    linkInputAndRange(null, 'lump-years', 'lump-years-val', 'Years');
    linkInputAndRange(null, 'inf-years', 'inf-years-val', 'Years');
    linkInputAndRange(null, 'goal-years', 'goal-years-val', 'Years');
    linkInputAndRange(null, 'delay-years', 'delay-years-val', 'Years');
    linkInputAndRange(null, 'comp-years', 'comp-years-val', 'Years');

    // Setup hover animations natively or via CSS
    // Currently relying on CSS for hover effects

    // Intersection Observer for scroll animations (fade in)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.calculator-card, .feature-card, .edu-card').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "all 0.6s ease-out";
        observer.observe(el);
    });

    // Initialize all calculators modules
    if(typeof initSIPCalculator === 'function') initSIPCalculator();
    if(typeof initLumpSumCalculator === 'function') initLumpSumCalculator();
    if(typeof initStartEarly === 'function') initStartEarly();
    if(typeof initInflationCalculator === 'function') initInflationCalculator();
    if(typeof initGoalPlanner === 'function') initGoalPlanner();
    if(typeof initDelayImpact === 'function') initDelayImpact();
    if(typeof initCompoundingVisualizer === 'function') initCompoundingVisualizer();
});
