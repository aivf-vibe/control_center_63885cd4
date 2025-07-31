



// Portfolio Details JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolioDetails();
    initializeCharts();
    initializeFilters();
    initializeModal();
    loadHoldingsData();
});

// Sample holdings data
const holdingsData = [
    {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        sector: 'Technology',
        position: 'Long',
        weight: 8.5,
        value: 204000000,
        daily: 1.2,
        mtd: 5.4,
        ytd: 22.4,
        beta: 1.12
    },
    {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        sector: 'Technology',
        position: 'Long',
        weight: 7.2,
        value: 173000000,
        daily: 0.8,
        mtd: 3.2,
        ytd: 18.7,
        beta: 0.98
    },
    {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        sector: 'Technology',
        position: 'Long',
        weight: 6.1,
        value: 146000000,
        daily: -0.5,
        mtd: 2.1,
        ytd: 15.3,
        beta: 1.05
    },
    {
        symbol: 'AMZN',
        name: 'Amazon.com Inc.',
        sector: 'Consumer Discretionary',
        position: 'Long',
        weight: 5.8,
        value: 139000000,
        daily: 1.1,
        mtd: 4.7,
        ytd: 28.9,
        beta: 1.23
    },
    {
        symbol: 'TSLA',
        name: 'Tesla Inc.',
        sector: 'Consumer Discretionary',
        position: 'Short',
        weight: -4.9,
        value: -118000000,
        daily: -2.3,
        mtd: -8.4,
        ytd: -12.4,
        beta: 2.15
    },
    {
        symbol: 'NVDA',
        name: 'NVIDIA Corporation',
        sector: 'Technology',
        position: 'Long',
        weight: 4.2,
        value: 101000000,
        daily: 3.1,
        mtd: 12.5,
        ytd: 45.2,
        beta: 1.67
    },
    {
        symbol: 'META',
        name: 'Meta Platforms Inc.',
        sector: 'Technology',
        position: 'Long',
        weight: 3.8,
        value: 91000000,
        daily: 0.4,
        mtd: 1.8,
        ytd: 16.7,
        beta: 1.34
    },
    {
        symbol: 'JPM',
        name: 'JPMorgan Chase & Co.',
        sector: 'Financial Services',
        position: 'Long',
        weight: 3.5,
        value: 84000000,
        daily: -0.2,
        mtd: 0.9,
        ytd: 8.4,
        beta: 1.18
    },
    {
        symbol: 'JNJ',
        name: 'Johnson & Johnson',
        sector: 'Healthcare',
        position: 'Long',
        weight: 3.2,
        value: 77000000,
        daily: 0.1,
        mtd: 1.2,
        ytd: 5.3,
        beta: 0.72
    },
    {
        symbol: 'V',
        name: 'Visa Inc.',
        sector: 'Financial Services',
        position: 'Long',
        weight: 3.0,
        value: 72000000,
        daily: 0.7,
        mtd: 2.8,
        ytd: 12.1,
        beta: 0.95
    }
];

let currentPage = 1;
let itemsPerPage = 20;
let filteredData = [...holdingsData];
let sortColumn = null;
let sortDirection = 'asc';

function initializePortfolioDetails() {
    updateOverviewCards();
    setupEventListeners();
}

function updateOverviewCards() {
    // Update portfolio value mini chart
    const valueCtx = document.getElementById('valueChart');
    if (valueCtx) {
        new Chart(valueCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [{
                    data: [2.38, 2.39, 2.37, 2.41, 2.42],
                    borderColor: '#00ff88',
                    backgroundColor: 'rgba(0, 255, 136, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false }
                }
            }
        });
    }
}

function initializeCharts() {
    // Sector Allocation Chart
    const sectorCtx = document.getElementById('sectorChart');
    if (sectorCtx) {
        new Chart(sectorCtx, {
            type: 'doughnut',
            data: {
                labels: ['Technology', 'Healthcare', 'Financial Services', 'Consumer', 'Industrial', 'Energy', 'Other'],
                datasets: [{
                    data: [35.2, 18.7, 15.3, 12.1, 8.4, 5.2, 5.1],
                    backgroundColor: [
                        '#00d4ff',
                        '#00ff88',
                        '#ffa502',
                        '#ff4757',
                        '#a55eea',
                        '#26de81',
                        '#778ca3'
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
                            padding: 20
                        }
                    }
                }
            }
        });
    }

    // Factor Risk Chart
    const factorRiskCtx = document.getElementById('factorRiskChart');
    if (factorRiskCtx) {
        new Chart(factorRiskCtx, {
            type: 'radar',
            data: {
                labels: ['Market', 'Size', 'Value', 'Momentum', 'Quality', 'Volatility'],
                datasets: [{
                    label: 'Current Exposure',
                    data: [0.85, 0.23, -0.15, 0.42, 0.31, -0.28],
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.2)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        pointLabels: { color: '#ffffff' },
                        ticks: { color: '#b3b3b3' }
                    }
                }
            }
        });
    }

    // Performance Chart
    const performanceCtx = document.getElementById('performanceChart');
    if (performanceCtx) {
        new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: generateDateLabels(30),
                datasets: [{
                    label: 'Portfolio',
                    data: generatePerformanceData(30, 0.15),
                    borderColor: '#00d4ff',
                    backgroundColor: 'rgba(0, 212, 255, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }, {
                    label: 'Benchmark',
                    data: generatePerformanceData(30, 0.08),
                    borderColor: '#ff4757',
                    backgroundColor: 'rgba(255, 71, 87, 0.1)',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: { color: '#ffffff' }
                    }
                },
                scales: {
                    x: {
                        ticks: { color: '#b3b3b3' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    },
                    y: {
                        ticks: { color: '#b3b3b3' },
                        grid: { color: 'rgba(255, 255, 255, 0.1)' }
                    }
                }
            }
        });
    }
}

function generateDateLabels(days) {
    const labels = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return labels;
}

function generatePerformanceData(days, volatility) {
    const data = [0];
    for (let i = 1; i < days; i++) {
        const change = (Math.random() - 0.5) * volatility;
        data.push(data[i - 1] + change);
    }
    return data;
}

function loadHoldingsData() {
    renderHoldingsTable();
    updatePagination();
}

function renderHoldingsTable() {
    const tbody = document.getElementById('holdingsTableBody');
    if (!tbody) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);

    tbody.innerHTML = pageData.map(holding => `
        <tr>
            <td><strong>${holding.symbol}</strong></td>
            <td>${holding.name}</td>
            <td>${holding.sector}</td>
            <td>
                <span class="position-badge ${holding.position.toLowerCase()}">
                    ${holding.position}
                </span>
            </td>
            <td>${holding.weight > 0 ? '+' : ''}${holding.weight.toFixed(1)}%</td>
            <td>${formatCurrency(holding.value)}</td>
            <td class="${holding.daily > 0 ? 'positive' : 'negative'}">
                ${holding.daily > 0 ? '+' : ''}${holding.daily.toFixed(2)}%
            </td>
            <td class="${holding.mtd > 0 ? 'positive' : 'negative'}">
                ${holding.mtd > 0 ? '+' : ''}${holding.mtd.toFixed(2)}%
            </td>
            <td class="${holding.ytd > 0 ? 'positive' : 'negative'}">
                ${holding.ytd > 0 ? '+' : ''}${holding.ytd.toFixed(2)}%
            </td>
            <td>${holding.beta.toFixed(2)}</td>
            <td>
                <button class="btn-details" onclick="showPositionDetails('${holding.symbol}')">
                    <i class="fas fa-chart-line"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function formatCurrency(value) {
    if (Math.abs(value) >= 1e9) {
        return `$${(value / 1e9).toFixed(1)}B`;
    } else if (Math.abs(value) >= 1e6) {
        return `$${(value / 1e6).toFixed(0)}M`;
    } else if (Math.abs(value) >= 1e3) {
        return `$${(value / 1e3).toFixed(0)}K`;
    }
    return `$${value.toFixed(0)}`;
}

function initializeFilters() {
    const searchInput = document.getElementById('positionSearch');
    const sectorFilter = document.getElementById('sectorFilter');
    const sizeFilter = document.getElementById('sizeFilter');
    const performanceFilter = document.getElementById('performanceFilter');

    [searchInput, sectorFilter, sizeFilter, performanceFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('input', applyFilters);
        }
    });

    // Sort functionality
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', () => sortTable(header.dataset.sort));
    });
}

function applyFilters() {
    const searchTerm = document.getElementById('positionSearch')?.value.toLowerCase() || '';
    const sectorFilter = document.getElementById('sectorFilter')?.value.toLowerCase() || '';
    const sizeFilter = document.getElementById('sizeFilter')?.value || '';
    const performanceFilter = document.getElementById('performanceFilter')?.value || '';

    filteredData = holdingsData.filter(holding => {
        const matchesSearch = !searchTerm || 
            holding.symbol.toLowerCase().includes(searchTerm) ||
            holding.name.toLowerCase().includes(searchTerm) ||
            holding.sector.toLowerCase().includes(searchTerm);

        const matchesSector = !sectorFilter || 
            holding.sector.toLowerCase().includes(sectorFilter);

        const matchesSize = !sizeFilter || 
            (sizeFilter === 'large' && Math.abs(holding.value) >= 100e6) ||
            (sizeFilter === 'medium' && Math.abs(holding.value) >= 50e6 && Math.abs(holding.value) < 100e6) ||
            (sizeFilter === 'small' && Math.abs(holding.value) < 50e6);

        const matchesPerformance = !performanceFilter ||
            (performanceFilter === 'gainers' && holding.daily > 0) ||
            (performanceFilter === 'losers' && holding.daily < 0);

        return matchesSearch && matchesSector && matchesSize && matchesPerformance;
    });

    currentPage = 1;
    renderHoldingsTable();
    updatePagination();
}

function sortTable(column) {
    if (sortColumn === column) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        sortColumn = column;
        sortDirection = 'asc';
    }

    filteredData.sort((a, b) => {
        let aVal = a[column];
        let bVal = b[column];

        if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase();
            bVal = bVal.toLowerCase();
        }

        if (sortDirection === 'asc') {
            return aVal > bVal ? 1 : -1;
        } else {
            return aVal < bVal ? 1 : -1;
        }
    });

    renderHoldingsTable();
    updateSortIndicators();
}

function updateSortIndicators() {
    document.querySelectorAll('.sortable i').forEach(icon => {
        icon.className = 'fas fa-sort';
    });

    const activeHeader = document.querySelector(`[data-sort="${sortColumn}"] i`);
    if (activeHeader) {
        activeHeader.className = `fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'}`;
    }
}

function updatePagination() {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const from = (currentPage - 1) * itemsPerPage + 1;
    const to = Math.min(currentPage * itemsPerPage, filteredData.length);

    document.getElementById('showingFrom').textContent = from;
    document.getElementById('showingTo').textContent = to;
    document.getElementById('totalHoldings').textContent = filteredData.length;
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;

    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function changePage(direction) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const newPage = currentPage + direction;

    if (newPage >= 1 && newPage <= totalPages) {
        currentPage = newPage;
        renderHoldingsTable();
        updatePagination();
    }
}

function initializeModal() {
    const modal = document.getElementById('positionModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };
}

function showPositionDetails(symbol) {
    const holding = holdingsData.find(h => h.symbol === symbol);
    if (!holding) return;

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2>${holding.name} (${holding.symbol})</h2>
        <div class="position-summary">
            <div class="summary-row">
                <span>Sector:</span>
                <span>${holding.sector}</span>
            </div>
            <div class="summary-row">
                <span>Position:</span>
                <span class="position-badge ${holding.position.toLowerCase()}">${holding.position}</span>
            </div>
            <div class="summary-row">
                <span>Market Value:</span>
                <span>${formatCurrency(holding.value)}</span>
            </div>
            <div class="summary-row">
                <span>Portfolio Weight:</span>
                <span>${holding.weight > 0 ? '+' : ''}${holding.weight.toFixed(2)}%</span>
            </div>
            <div class="summary-row">
                <span>Beta:</span>
                <span>${holding.beta.toFixed(2)}</span>
            </div>
        </div>
        <div class="performance-metrics">
            <h3>Performance Metrics</h3>
            <div class="metrics-grid">
                <div class="metric-item">
                    <span class="metric-label">Daily Change</span>
                    <span class="metric-value ${holding.daily > 0 ? 'positive' : 'negative'}">
                        ${holding.daily > 0 ? '+' : ''}${holding.daily.toFixed(2)}%
                    </span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">MTD</span>
                    <span class="metric-value ${holding.mtd > 0 ? 'positive' : 'negative'}">
                        ${holding.mtd > 0 ? '+' : ''}${holding.mtd.toFixed(2)}%
                    </span>
                </div>
                <div class="metric-item">
                    <span class="metric-label">YTD</span>
                    <span class="metric-value ${holding.ytd > 0 ? 'positive' : 'negative'}">
                        ${holding.ytd > 0 ? '+' : ''}${holding.ytd.toFixed(2)}%
                    </span>
                </div>
            </div>
        </div>
    `;

    document.getElementById('positionModal').style.display = 'block';
}

function exportHoldings() {
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Symbol,Name,Sector,Position,Weight,Market Value,Daily Change,MTD,YTD,Beta\n"
        + filteredData.map(h => 
            `${holding.symbol},${holding.name},${holding.sector},${holding.position},${holding.weight},${holding.value},${holding.daily},${holding.mtd},${holding.ytd},${holding.beta}`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "portfolio_holdings.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function refreshHoldings() {
    const refreshBtn = document.querySelector('.btn-refresh');
    refreshBtn.classList.add('loading');
    
    setTimeout(() => {
        // Simulate data refresh
        loadHoldingsData();
        refreshBtn.classList.remove('loading');
    }, 1000);
}

function setupEventListeners() {
    // Time period buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updatePerformanceChart(this.dataset.period);
        });
    });
}

function updatePerformanceChart(period) {
    // Update chart based on selected period
    const days = {
        '1M': 30,
        '3M': 90,
        '6M': 180,
        '1Y': 365,
        'YTD': 240
    }[period] || 30;

    const chart = Chart.getChart('performanceChart');
    if (chart) {
        chart.data.labels = generateDateLabels(days);
        chart.data.datasets[0].data = generatePerformanceData(days, 0.15);
        chart.data.datasets[1].data = generatePerformanceData(days, 0.08);
        chart.update();
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'f':
                e.preventDefault();
                document.getElementById('positionSearch')?.focus();
                break;
            case 'r':
                e.preventDefault();
                refreshHoldings();
                break;
        }
    }
});

// Auto-refresh every 30 seconds
setInterval(() => {
    // Simulate real-time updates
    holdingsData.forEach(holding => {
        holding.daily += (Math.random() - 0.5) * 0.1;
        holding.mtd += (Math.random() - 0.5) * 0.05;
    });
    renderHoldingsTable();
}, 30000);



