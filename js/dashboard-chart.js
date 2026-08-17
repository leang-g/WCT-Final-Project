// ============================================================
// APEX FUNDED — Dashboard Multi-Account Switcher & Live Chart
// ============================================================

let balanceChartInstance = null;

// Render Chart.js for specific account
function renderBalanceChart(account) {
    const ctx = document.getElementById('balanceChart');
    if (!ctx) return;

    if (balanceChartInstance) {
        balanceChartInstance.destroy();
        balanceChartInstance = null;
    }

    const chartContext = ctx.getContext('2d');
    const gradient = chartContext.createLinearGradient(0, 0, 0, 260);
    gradient.addColorStop(0, 'rgba(201, 168, 76, 0.35)');
    gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.15)');
    gradient.addColorStop(1, 'rgba(201, 168, 76, 0)');

    const chartLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const chartData = (account && account.chartData && account.chartData.length === 7) 
        ? account.chartData 
        : [50000, 50200, 50500, 51000, 51800, 52400, 54230];

    balanceChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Equity Growth',
                data: chartData,
                borderColor: '#c9a84c',
                backgroundColor: gradient,
                borderWidth: 2.5,
                pointBackgroundColor: '#22c55e',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 1.5,
                pointRadius: 4,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: '#c9a84c',
                pointHoverBorderColor: '#ffffff',
                tension: 0.35,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(20, 20, 20, 0.92)',
                    titleColor: '#c9a84c',
                    bodyColor: '#ffffff',
                    borderColor: 'rgba(201, 168, 76, 0.4)',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return ' Equity: ' + (typeof formatCurrency === 'function' ? formatCurrency(context.parsed.y) : '$' + context.parsed.y);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: { color: 'rgba(0, 0, 0, 0.05)' },
                    ticks: {
                        color: '#6b6864',
                        callback: value => '$' + (value >= 1000 ? (value / 1000).toFixed(0) + 'k' : value)
                    }
                },
                x: {
                    grid: { color: 'rgba(0, 0, 0, 0.03)' },
                    ticks: { color: '#6b6864' }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            }
        }
    });
}

// Update all Dashboard UI KPIs for an account
function updateDashboardUI(account) {
    if (!account) return;

    // Header & Badges
    const modelBadge = document.getElementById('accountModelBadge');
    if (modelBadge) modelBadge.textContent = `${account.model} (${account.platform})`;

    const statusBadge = document.getElementById('accountStatusBadge');
    if (statusBadge) statusBadge.textContent = `LIVE SIMULATED - ${account.status.toUpperCase()}`;

    // KPI 1: Balance
    const balanceEl = document.getElementById('statBalance');
    if (balanceEl) balanceEl.textContent = formatCurrency(account.balance);

    // KPI 2: Today's P&L
    const todayPnlEl = document.getElementById('statTodayPnl');
    if (todayPnlEl) {
        todayPnlEl.textContent = (account.todayPnl >= 0 ? '+' : '') + formatCurrency(account.todayPnl);
        todayPnlEl.className = account.todayPnl >= 0 ? 'stat-value text-success' : 'stat-value text-danger';
    }

    // KPI 3: Equity
    const equityEl = document.getElementById('statEquity');
    if (equityEl) equityEl.textContent = formatCurrency(account.equity);

    // KPI 4: Drawdown
    const drawdownEl = document.getElementById('statDrawdown');
    if (drawdownEl) drawdownEl.textContent = account.drawdown || '-2.1%';

    // Secondary metrics
    const totalPnlEl = document.getElementById('totalTradesPnl');
    if (totalPnlEl) totalPnlEl.textContent = account.totalOpenPnl || '+$385.50';

    const volumeLotsEl = document.getElementById('statVolumeLots');
    if (volumeLotsEl) volumeLotsEl.textContent = account.volumeLots || '1.15';

    const accountAgeEl = document.getElementById('statAccountAge');
    if (accountAgeEl) accountAgeEl.textContent = account.accountAge || '12d';

    const nextPayoutEl = document.getElementById('statNextPayout');
    if (nextPayoutEl) nextPayoutEl.textContent = account.nextPayout || '3d';

    const openPositionsCountBadge = document.getElementById('openPositionsCountBadge');
    if (openPositionsCountBadge && account.openPositions) {
        openPositionsCountBadge.textContent = account.openPositions.length;
    }

    // Open Positions Table
    const tableBody = document.getElementById('openPositionsTableBody');
    if (tableBody && account.openPositions) {
        tableBody.innerHTML = account.openPositions.map(pos => `
            <tr>
                <td>
                    <span class="fw-bold">${pos.symbol}</span>
                    <br /><small class="text-muted">${pos.setup}</small>
                </td>
                <td class="${pos.side === 'Buy' ? 'text-success' : 'text-danger'} fw-semibold">${pos.side}</td>
                <td>${pos.vol}</td>
                <td class="${pos.isProfit ? 'profit' : 'loss'}">${pos.pnl}</td>
            </tr>
        `).join('');
    }

    // Re-render chart with new account data
    renderBalanceChart(account);
}

// Initialize Multi-Account Switcher on Dashboard
function initDashboardAccountSwitcher() {
    const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
    if (!user) return;

    const emptyState = document.getElementById('emptyStateContainer');
    const dashboardContent = document.getElementById('dashboardContent');
    const switcherContainer = document.getElementById('accountSwitcherContainer');
    const dropdown = document.getElementById('accountSelectDropdown');

    const accounts = (typeof getUserAccounts === 'function') ? getUserAccounts(user.email) : [];

    // Empty state handling
    if (accounts.length === 0) {
        if (emptyState) emptyState.classList.remove('d-none');
        if (dashboardContent) dashboardContent.classList.add('d-none');
        if (switcherContainer) switcherContainer.classList.add('d-none');
        return;
    }

    // Accounts exist
    if (emptyState) emptyState.classList.add('d-none');
    if (dashboardContent) dashboardContent.classList.remove('d-none');
    if (switcherContainer) switcherContainer.classList.remove('d-none');

    const activeAccountId = (typeof getActiveAccountId === 'function') ? getActiveAccountId(user.email) : accounts[0].id;

    // Populate dropdown
    if (dropdown) {
        let optionsHtml = accounts.map(acc => {
            const isSelected = acc.id === activeAccountId ? 'selected' : '';
            const formattedStart = typeof formatCurrency === 'function' ? formatCurrency(acc.startingBalance).replace('.00', '') : '$' + acc.startingBalance;
            return `<option value="${acc.id}" ${isSelected}>${acc.plan} - #${acc.id} (${formattedStart})</option>`;
        }).join('');

        optionsHtml += `<option value="__BUY_NEW__">+ Buy New Account...</option>`;
        dropdown.innerHTML = optionsHtml;

        // Switcher event listener
        dropdown.onchange = function() {
            if (this.value === '__BUY_NEW__') {
                window.location.href = 'pricing.html';
                return;
            }
            if (typeof setActiveAccountId === 'function') {
                setActiveAccountId(user.email, this.value);
            }
            const activeAcc = (typeof getActiveAccount === 'function') ? getActiveAccount(user.email) : accounts.find(a => a.id === this.value);
            updateDashboardUI(activeAcc);
        };
    }

    // Initial UI render with active account
    const activeAcc = (typeof getActiveAccount === 'function') ? getActiveAccount(user.email) : accounts[0];
    updateDashboardUI(activeAcc);
}

// Auto-run on dashboard load
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('dashboard.html') || document.getElementById('balanceChart')) {
        initDashboardAccountSwitcher();
    }
});