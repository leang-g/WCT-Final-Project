import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

const USER_STORAGE_KEY = 'apex_user';
const USERS_DB_KEY = 'apex_registered_users';
const ACCOUNTS_PREFIX = 'apex_accounts_';
const ACTIVE_ACC_PREFIX = 'apex_active_acc_';

export function AppProvider({ children }) {
  // 1. Initial User Session
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY) || localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // 2. Navigation Tab State: 'home' | 'pricing' | 'rules' | 'dashboard' | 'help'
  const [activeTab, setActiveTab] = useState('home');

  // 3. User's Purchased Accounts List
  const [accounts, setAccounts] = useState(() => {
    try {
      const currentUser = localStorage.getItem(USER_STORAGE_KEY) || localStorage.getItem('user');
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        const storedAccs = localStorage.getItem(ACCOUNTS_PREFIX + parsedUser.email.toLowerCase());
        if (storedAccs) return JSON.parse(storedAccs);
        
        // Seed initial account for default demo user
        if (parsedUser.email.toLowerCase() === 'trader@apexfunded.io') {
          const demoAccount = createInitialDemoAccount();
          localStorage.setItem(ACCOUNTS_PREFIX + parsedUser.email.toLowerCase(), JSON.stringify([demoAccount]));
          return [demoAccount];
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  // 4. Currently Selected Active Account ID
  const [activeAccountId, setActiveAccountId] = useState(() => {
    try {
      const currentUser = localStorage.getItem(USER_STORAGE_KEY) || localStorage.getItem('user');
      if (currentUser) {
        const parsedUser = JSON.parse(currentUser);
        return localStorage.getItem(ACTIVE_ACC_PREFIX + parsedUser.email.toLowerCase()) || null;
      }
      return null;
    } catch {
      return null;
    }
  });

  // 5. Modals State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup'
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [pendingPlanAfterAuth, setPendingPlanAfterAuth] = useState(null);

  // Sync accounts and active account when user changes
  useEffect(() => {
    if (user) {
      const userKey = user.email.toLowerCase();
      try {
        const stored = localStorage.getItem(ACCOUNTS_PREFIX + userKey);
        if (stored) {
          const parsed = JSON.parse(stored);
          setAccounts(parsed);
          const activeId = localStorage.getItem(ACTIVE_ACC_PREFIX + userKey) || (parsed[0] ? parsed[0].id : null);
          setActiveAccountId(activeId);
        } else if (userKey === 'trader@apexfunded.io') {
          const demoAcc = createInitialDemoAccount();
          const list = [demoAcc];
          localStorage.setItem(ACCOUNTS_PREFIX + userKey, JSON.stringify(list));
          localStorage.setItem(ACTIVE_ACC_PREFIX + userKey, demoAcc.id);
          setAccounts(list);
          setActiveAccountId(demoAcc.id);
        } else {
          setAccounts([]);
          setActiveAccountId(null);
        }
      } catch (e) {
        console.error('Error loading user accounts:', e);
      }
    } else {
      setAccounts([]);
      setActiveAccountId(null);
    }
  }, [user]);

  // Seed default registered users database
  useEffect(() => {
    const existing = localStorage.getItem(USERS_DB_KEY);
    if (!existing) {
      const defaultUsers = {
        'trader@apexfunded.io': {
          name: 'Alex Mercer',
          password: 'password123',
          email: 'trader@apexfunded.io'
        }
      };
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(defaultUsers));
    }
  }, []);

  // Helper to create the default demo account
  function createInitialDemoAccount() {
    return {
      id: 'APX-104928',
      plan: 'Growth $50,000',
      model: 'Growth',
      platform: 'MetaTrader 5',
      startingBalance: 50000,
      currentBalance: 54230.00,
      equity: 55470.50,
      todayPnL: 1240.50,
      drawdownPct: 2.1,
      maxDrawdownPct: 6.0,
      dailyLossLimitPct: 5.0,
      profitTargetPct: 10.0,
      status: 'Active (Evaluation)',
      createdAt: '2026-08-17',
      chartData: [50000, 50200, 50500, 51000, 51800, 52400, 54230],
      openPositions: [
        { symbol: 'EURUSD', setup: 'Swing Low Sweep', side: 'Buy', vol: '0.10', pnl: 120.50 },
        { symbol: 'XAUUSD', setup: 'Liquidity Grab', side: 'Sell', vol: '0.05', pnl: -45.00 },
        { symbol: 'US30', setup: 'Breaker Block', side: 'Buy', vol: '1.00', pnl: 310.00 }
      ],
      winRate: '68%',
      tradesCount: 4,
      accountAge: '12d'
    };
  }

  // --- Auth Handlers ---
  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');
    const existing = db[normalizedEmail];

    if (!existing) {
      return { success: false, message: 'No account found with this email.' };
    }
    if (existing.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again.' };
    }

    const userData = {
      name: existing.name || normalizedEmail.split('@')[0],
      email: normalizedEmail
    };

    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setAuthModalOpen(false);

    // CRITICAL REQUIREMENT 1: Always route to 'home' tab upon login
    setActiveTab('home');

    // If user clicked "Get Funded" prior to logging in, open CheckoutModal
    if (pendingPlanAfterAuth) {
      setSelectedPlanForCheckout(pendingPlanAfterAuth);
      setPendingPlanAfterAuth(null);
      setCheckoutModalOpen(true);
    }

    return { success: true, message: 'Login successful.' };
  };

  const signup = (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const db = JSON.parse(localStorage.getItem(USERS_DB_KEY) || '{}');

    if (db[normalizedEmail]) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const userData = {
      name: name.trim(),
      email: normalizedEmail,
      password: password
    };

    db[normalizedEmail] = userData;
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));

    const sessionUser = { name: userData.name, email: userData.email };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionUser));
    localStorage.setItem('user', JSON.stringify(sessionUser));
    setUser(sessionUser);
    setAuthModalOpen(false);

    // CRITICAL REQUIREMENT 1: Route to 'home' tab upon signup
    setActiveTab('home');

    if (pendingPlanAfterAuth) {
      setSelectedPlanForCheckout(pendingPlanAfterAuth);
      setPendingPlanAfterAuth(null);
      setCheckoutModalOpen(true);
    }

    return { success: true, message: 'Account registered successfully.' };
  };

  const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem('user');
    setUser(null);
    setAccounts([]);
    setActiveAccountId(null);
    setAuthModalOpen(false);
    setCheckoutModalOpen(false);
    // Return to public home view
    setActiveTab('home');
  };

  // --- Purchase Gate Interceptor ---
  const triggerGetFunded = (planObj) => {
    if (user) {
      // User is logged in -> Open Checkout Modal directly
      setSelectedPlanForCheckout(planObj);
      setCheckoutModalOpen(true);
    } else {
      // User is unauthenticated -> Remember intent and open Auth Modal
      setPendingPlanAfterAuth(planObj);
      setAuthModalMode('signup');
      setAuthModalOpen(true);
    }
  };

  // --- Multi-Account Generation & Switching ---
  const createAccount = (planData) => {
    if (!user) return null;

    const startBal = planData.numericSize || 50000;
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const accountId = `APX-${randomSuffix}`;
    const dateStr = new Date().toISOString().split('T')[0];

    // Initial simulation metrics
    const currentBalance = startBal;
    const equity = startBal;
    const todayPnL = 0;
    const drawdownPct = 0.0;

    const lotMultiplier = startBal / 50000;
    const newAccount = {
      id: accountId,
      plan: `${planData.model || 'Growth'} $${new Intl.NumberFormat('en-US').format(startBal)}`,
      model: planData.model || 'Growth',
      platform: planData.platform || 'MetaTrader 5',
      startingBalance: startBal,
      currentBalance: currentBalance,
      equity: equity,
      todayPnL: todayPnL,
      drawdownPct: drawdownPct,
      maxDrawdownPct: planData.model === 'Lightning' ? 4.0 : (planData.model === 'Select' ? 5.0 : 6.0),
      dailyLossLimitPct: planData.model === 'Lightning' ? 3.0 : (planData.model === 'Select' ? 4.0 : 5.0),
      profitTargetPct: planData.model === 'Lightning' ? 6.0 : (planData.model === 'Select' ? 8.0 : 10.0),
      status: 'Active (Evaluation)',
      createdAt: dateStr,
      chartData: [startBal, startBal, startBal, startBal, startBal, startBal, startBal],
      openPositions: [
        { symbol: 'EURUSD', setup: 'Order Block Sweep', side: 'Buy', vol: (0.10 * lotMultiplier).toFixed(2), pnl: 45.00 * lotMultiplier },
        { symbol: 'US30', setup: 'Fair Value Gap', side: 'Buy', vol: (1.00 * lotMultiplier).toFixed(2), pnl: 110.00 * lotMultiplier }
      ],
      winRate: '75%',
      tradesCount: 2,
      accountAge: '1d'
    };

    const userKey = user.email.toLowerCase();
    const updatedAccounts = [newAccount, ...accounts];
    setAccounts(updatedAccounts);
    setActiveAccountId(newAccount.id);

    localStorage.setItem(ACCOUNTS_PREFIX + userKey, JSON.stringify(updatedAccounts));
    localStorage.setItem(ACTIVE_ACC_PREFIX + userKey, newAccount.id);

    return newAccount;
  };

  const switchAccount = (accountId) => {
    if (!user) return;
    setActiveAccountId(accountId);
    localStorage.setItem(ACTIVE_ACC_PREFIX + user.email.toLowerCase(), accountId);
  };

  const updateAccount = (accountId, updatedFields) => {
    if (!user) return;
    const userKey = user.email.toLowerCase();
    const updated = accounts.map(acc => {
      if (acc.id === accountId) {
        return { ...acc, ...updatedFields };
      }
      return acc;
    });
    setAccounts(updated);
    localStorage.setItem(ACCOUNTS_PREFIX + userKey, JSON.stringify(updated));
  };

  // Active account object
  const activeAccount = accounts.find(a => a.id === activeAccountId) || accounts[0] || null;

  return (
    <AppContext.Provider
      value={{
        user,
        activeTab,
        setActiveTab,
        accounts,
        activeAccountId,
        activeAccount,
        switchAccount,
        createAccount,
        updateAccount,
        login,
        signup,
        logout,
        authModalOpen,
        setAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        checkoutModalOpen,
        setCheckoutModalOpen,
        selectedPlanForCheckout,
        setSelectedPlanForCheckout,
        pendingPlanAfterAuth,
        setPendingPlanAfterAuth,
        triggerGetFunded
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
