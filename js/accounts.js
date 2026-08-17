// ============================================================
// APEX FUNDED — Multi-Account Management & Storage
// ============================================================

const ACCOUNTS_STORAGE_PREFIX = 'apex_funded_accounts_';
const ACTIVE_ACCOUNT_PREFIX = 'apex_funded_active_account_';

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Format integer number
function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

// Parse plan string: e.g. "Growth $100K (MetaTrader 5) - $599" or "Select 50K - $399"
function parsePlanDetails(planString) {
    if (!planString) {
        return {
            plan: 'Growth $50,000',
            model: 'Growth',
            sizeStr: '$50,000',
            balance: 50000,
            platform: 'MetaTrader 5',
            price: 299
        };
    }

    let model = 'Growth';
    if (planString.toLowerCase().includes('select')) model = 'Select';
    else if (planString.toLowerCase().includes('lightning')) model = 'Lightning';

    let balance = 50000;
    if (planString.includes('25K') || planString.includes('25k') || planString.includes('25,000')) balance = 25000;
    else if (planString.includes('50K') || planString.includes('50k') || planString.includes('50,000')) balance = 50000;
    else if (planString.includes('100K') || planString.includes('100k') || planString.includes('100,000')) balance = 100000;
    else if (planString.includes('200K') || planString.includes('200k') || planString.includes('200,000')) balance = 200000;

    let platform = 'MetaTrader 5';
    if (planString.toLowerCase().includes('tradovate')) platform = 'Tradovate';
    else if (planString.toLowerCase().includes('metatrader 4') || planString.toLowerCase().includes('mt4')) platform = 'MetaTrader 4';
    else if (planString.toLowerCase().includes('metatrader 5') || planString.toLowerCase().includes('mt5')) platform = 'MetaTrader 5';

    const sizeStr = '$' + formatNumber(balance);
    const planName = `${model} ${sizeStr}`;

    return {
        plan: planName,
        model: model,
        sizeStr: sizeStr,
        balance: balance,
        platform: platform,
        raw: planString
    };
}

// Generate realistic simulated metrics for an account size
function generateSimulatedAccountData(planDetails) {
    const startBal = planDetails.balance;
    const accountId = 'APEX-' + Math.floor(100000 + Math.random() * 900000);
    const dateStr = new Date().toISOString().split('T')[0];

    // Simulated profits
    const gainPct = 0.0846; // +8.46% total gain
    const currentBalance = Math.round((startBal * (1 + gainPct)) * 100) / 100;
    const todayPnl = Math.round((startBal * 0.0248) * 100) / 100;
    const openPnl = Math.round((startBal * 0.0077) * 100) / 100;
    const equity = Math.round((currentBalance + openPnl) * 100) / 100;

    // Daily equity curve (7 days)
    const chartData = [
        startBal,
        Math.round(startBal * 1.004),
        Math.round(startBal * 1.010),
        Math.round(startBal * 1.020),
        Math.round(startBal * 1.036),
        Math.round(startBal * 1.048),
        currentBalance
    ];

    // Scale lot sizes with account size
    const lotFactor = startBal / 50000;
    const lot1 = (0.10 * lotFactor).toFixed(2);
    const lot2 = (0.05 * lotFactor).toFixed(2);
    const lot3 = (1.00 * lotFactor).toFixed(2);
    const pnl1 = (120.50 * lotFactor).toFixed(2);
    const pnl2 = (-45.00 * lotFactor).toFixed(2);
    const pnl3 = (310.00 * lotFactor).toFixed(2);
    const totalPnl = (parseFloat(pnl1) + parseFloat(pnl2) + parseFloat(pnl3)).toFixed(2);

    const openPositions = [
        { symbol: 'EURUSD', setup: 'Swing Low Sweep', side: 'Buy', vol: lot1, pnl: '+' + formatCurrency(parseFloat(pnl1)), isProfit: true },
        { symbol: 'XAUUSD', setup: 'Liquidity Grab', side: 'Sell', vol: lot2, pnl: '-' + formatCurrency(Math.abs(parseFloat(pnl2))), isProfit: false },
        { symbol: 'US30', setup: 'Breaker Block', side: 'Buy', vol: lot3, pnl: '+' + formatCurrency(parseFloat(pnl3)), isProfit: true }
    ];

    return {
        id: accountId,
        plan: planDetails.plan,
        model: planDetails.model,
        platform: planDetails.platform,
        startingBalance: startBal,
        balance: currentBalance,
        equity: equity,
        todayPnl: todayPnl,
        drawdown: '-2.1%',
        status: 'Active',
        date: dateStr,
        chartData: chartData,
        openPositions: openPositions,
        totalOpenPnl: '+' + formatCurrency(parseFloat(totalPnl)),
        winRate: '68%',
        riskReward: '1:2.4',
        volumeLots: (1.15 * lotFactor).toFixed(2),
        tradesCount: 4,
        accountAge: '1d',
        nextPayout: '7d'
    };
}

// Get user accounts
function getUserAccounts(email) {
    if (!email) {
        const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
        if (user) email = user.email;
    }
    if (!email) return [];

    const key = ACCOUNTS_STORAGE_PREFIX + email.toLowerCase().trim();
    try {
        const data = localStorage.getItem(key);
        if (data) return JSON.parse(data);

        // Seed demo account for default demo user
        if (email.toLowerCase().trim() === 'trader@apexfunded.io') {
            const seedAccount = generateSimulatedAccountData({
                plan: 'Growth $50,000',
                model: 'Growth',
                sizeStr: '$50,000',
                balance: 50000,
                platform: 'MetaTrader 5'
            });
            seedAccount.id = 'APEX-104928';
            seedAccount.accountAge = '12d';
            seedAccount.nextPayout = '3d';
            const seedList = [seedAccount];
            localStorage.setItem(key, JSON.stringify(seedList));
            return seedList;
        }

        return [];
    } catch (e) {
        console.error('Error fetching accounts:', e);
        return [];
    }
}

// Save user accounts
function saveUserAccounts(email, accounts) {
    if (!email) {
        const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
        if (user) email = user.email;
    }
    if (!email) return;

    const key = ACCOUNTS_STORAGE_PREFIX + email.toLowerCase().trim();
    localStorage.setItem(key, JSON.stringify(accounts || []));
}

// Get active account ID
function getActiveAccountId(email) {
    if (!email) {
        const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
        if (user) email = user.email;
    }
    if (!email) return null;

    const key = ACTIVE_ACCOUNT_PREFIX + email.toLowerCase().trim();
    const activeId = localStorage.getItem(key);
    const accounts = getUserAccounts(email);

    if (activeId && accounts.some(a => a.id === activeId)) {
        return activeId;
    }
    return accounts.length > 0 ? accounts[0].id : null;
}

// Set active account ID
function setActiveAccountId(email, accountId) {
    if (!email) {
        const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
        if (user) email = user.email;
    }
    if (!email || !accountId) return;

    const key = ACTIVE_ACCOUNT_PREFIX + email.toLowerCase().trim();
    localStorage.setItem(key, accountId);
}

// Get active account object
function getActiveAccount(email) {
    const accounts = getUserAccounts(email);
    if (accounts.length === 0) return null;

    const activeId = getActiveAccountId(email);
    return accounts.find(a => a.id === activeId) || accounts[0];
}

// Create new account for user
function createAccountForUser(email, planString) {
    if (!email) {
        const user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;
        if (user) email = user.email;
    }
    if (!email) return null;

    const planDetails = parsePlanDetails(planString);
    const newAccount = generateSimulatedAccountData(planDetails);

    const accounts = getUserAccounts(email);
    accounts.unshift(newAccount); // Place new account at top
    saveUserAccounts(email, accounts);
    setActiveAccountId(email, newAccount.id);

    return newAccount;
}
