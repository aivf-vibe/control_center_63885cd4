

// Initialize dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    initializeNavigation();
    initializeRealTimeUpdates();
    initializeResponsiveFeatures();
});

// Chart initialization
function initializeCharts() {
    // Cumulative Returns Chart
    const returnsCtx = document.getElementById('returnsChart');
    if (returnsCtx) {
        const returnsChart = new Chart(returnsCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Portfolio Returns',
                    data: [0, 2.3, 5.1, 3.8, 8.2, 12.5, 10.1, 13.7, 15.2, 18.9, 16.4, 15.7],
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00d4ff',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4
                }, {
                    label: 'Benchmark (S&P 500)',
                    data: [0, 1.8, 3.2, 2.1, 5.8, 8.9, 7.2, 10.1, 11.5, 13.2, 12.1, 11.8],
                    borderColor: '#ff4757',
                    backgroundColor: 'rgba(255, 71, 87, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff',
                            font: {
                                family: 'Inter'
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#b3b3b3'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#b3b3b3',
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Asset Allocation Chart
    const allocationCtx = document.getElementById('allocationChart');
    if (allocationCtx) {
        const allocationChart = new Chart(allocationCtx, {
            type: 'doughnut',
            data: {
                labels: ['Equities', 'Fixed Income', 'Alternatives', 'Cash', 'Commodities'],
                datasets: [{
                    data: [45, 25, 20, 5, 5],
                    backgroundColor: [
                        '#00d4ff',
                        '#00ff88',
                        '#ffa502',
                        '#ff4757',
                        '#a55eea'
                    ],
                    borderWidth: 2,
                    borderColor: '#1a1a2e'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            font: {
                                family: 'Inter'
                            },
                            padding: 20
                        }
                    }
                }
            }
        });
    }
}

// Navigation functionality
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Real-time updates simulation
function initializeRealTimeUpdates() {
    // Update P&L every 5 seconds
    setInterval(() => {
        updateRealTimeMetrics();
    }, 5000);

    // Update clock
    updateClock();
    setInterval(updateClock, 1000);
}

function updateRealTimeMetrics() {
    // Simulate real-time P&L updates
    const plElement = document.querySelector('.metric-card .metric-value');
    if (plElement && plElement.textContent.includes('$')) {
        const currentValue = parseFloat(plElement.textContent.replace(/[$+M]/g, ''));
        const change = (Math.random() - 0.5) * 0.5;
        const newValue = currentValue + change;
        
        plElement.textContent = `+$${newValue.toFixed(1)}M`;
        
        // Update change indicator
        const changeElement = plElement.nextElementSibling;
        if (changeElement) {
            const changePercent = (change / currentValue * 100).toFixed(2);
            changeElement.textContent = `${changePercent > 0 ? '+' : ''}${changePercent}%`;
            changeElement.className = `metric-change ${changePercent > 0 ? 'positive' : 'negative'}`;
        }
    }
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    // Update any clock elements if they exist
    const clockElements = document.querySelectorAll('.clock');
    clockElements.forEach(element => {
        element.textContent = timeString;
    });
}

// Responsive features
function initializeResponsiveFeatures() {
    // Mobile menu toggle
    const navToggle = document.createElement('button');
    navToggle.className = 'nav-toggle';
    navToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        navContainer.insertBefore(navToggle, navMenu);
        
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            if (navToggle.parentNode) {
                navToggle.remove();
            }
        } else if (!document.querySelector('.nav-toggle')) {
            navContainer.insertBefore(navToggle, navMenu);
        }
    });
}

// Utility functions
function formatCurrency(value) {
    if (value >= 1e9) {
        return `$${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
        return `$${(value / 1e6).toFixed(1)}M`;
    } else if (value >= 1e3) {
        return `$${(value / 1e3).toFixed(1)}K`;
    }
    return `$${value.toFixed(2)}`;
}

function formatPercentage(value) {
    return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

// Add loading states
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Export functions for potential external use
window.HedgeFundDashboard = {
    formatCurrency,
    formatPercentage,
    updateRealTimeMetrics,
    initializeCharts
};

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'r':
                e.preventDefault();
                updateRealTimeMetrics();
                break;
            case 'd':
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
        }
    }
});

// Add performance monitoring
function trackPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Dashboard loaded in ${loadTime}ms`);
        });
    }
}

trackPerformance();

// Add error handling for charts
window.addEventListener('error', function(e) {
    console.error('Dashboard error:', e.error);
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

