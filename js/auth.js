// ============================================================
// APEX FUNDED — Universal Authentication & Session Persistence
// ============================================================

const AUTH_KEY = 'apex_funded_user';
const USER_KEY_ALIAS = 'user'; // Supported alias for localStorage.removeItem('user')
const USERS_KEY = 'apex_funded_users';
const PENDING_PLAN_KEY = 'apex_intended_plan';
const PENDING_ACTION_KEY = 'apex_intended_action';

// Seed demo users if storage is empty
(function initDefaultUsers() {
    const existing = localStorage.getItem(USERS_KEY);
    if (!existing) {
        const seedUsers = {
            'trader@apexfunded.io': {
                password: 'password123',
                name: 'Alex Mercer'
            },
            'demo@apexfunded.io': {
                password: 'password123',
                name: 'Demo Trader'
            }
        };
        localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
    }
})();

// ----- Get stored users database -----
function getUsers() {
    try {
        const users = localStorage.getItem(USERS_KEY);
        return users ? JSON.parse(users) : {};
    } catch (e) {
        console.error('Error reading users from localStorage:', e);
        return {};
    }
}

// ----- Save users database -----
function saveUsers(users) {
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
        console.error('Error saving users to localStorage:', e);
    }
}

// ----- Get current logged-in user -----
function getCurrentUser() {
    try {
        const primary = localStorage.getItem(AUTH_KEY);
        if (primary) return JSON.parse(primary);

        const alias = localStorage.getItem(USER_KEY_ALIAS);
        if (alias) {
            const parsed = JSON.parse(alias);
            // Sync with primary key
            localStorage.setItem(AUTH_KEY, JSON.stringify(parsed));
            return parsed;
        }
        return null;
    } catch (e) {
        console.error('Error getting current user session:', e);
        return null;
    }
}

// ----- Set current user (login session) -----
function setCurrentUser(email, optionalName) {
    const users = getUsers();
    const userData = users[email] || {};
    const displayName = optionalName || userData.name || email.split('@')[0];

    const sessionData = {
        email: email,
        name: displayName,
        loginTime: new Date().toISOString()
    };

    const sessionString = JSON.stringify(sessionData);
    localStorage.setItem(AUTH_KEY, sessionString);
    localStorage.setItem(USER_KEY_ALIAS, sessionString);
}

// ----- Clear session (logout) -----
function clearSession() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY_ALIAS);
    sessionStorage.removeItem(PENDING_PLAN_KEY);
    sessionStorage.removeItem(PENDING_ACTION_KEY);
}

// ----- Check if user is logged in -----
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// ----- Register a new user -----
function registerUser(email, password, name) {
    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (users[normalizedEmail]) {
        return { success: false, message: 'An account with this email already exists.' };
    }

    const displayName = name ? name.trim() : normalizedEmail.split('@')[0];
    users[normalizedEmail] = {
        password: password,
        name: displayName,
        createdAt: new Date().toISOString()
    };

    saveUsers(users);
    return { success: true, message: 'Account created successfully.' };
}

// ----- Login user -----
function loginUser(email, password) {
    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (!users[normalizedEmail]) {
        return { success: false, message: 'No account found with this email.' };
    }
    if (users[normalizedEmail].password !== password) {
        return { success: false, message: 'Incorrect password. Please try again.' };
    }

    setCurrentUser(normalizedEmail, users[normalizedEmail].name);
    return { 
        success: true, 
        message: 'Login successful.',
        user: getCurrentUser()
    };
}

// ----- Logout user -----
function logoutUser() {
    clearSession();

    // If currently on a protected page (e.g. dashboard), redirect to home page
    const pathname = window.location.pathname;
    if (pathname.includes('dashboard.html')) {
        window.location.href = 'index.html';
        return;
    }

    // Re-render navbar in place on public pages
    renderNavbar();

    // Close any open modals
    const openModals = document.querySelectorAll('.modal.show');
    openModals.forEach(m => {
        const bsModal = bootstrap.Modal.getInstance(m);
        if (bsModal) bsModal.hide();
    });
}

// ----- Require authentication (for protected pages like dashboard.html) -----
function requireAuth() {
    if (!isLoggedIn()) {
        const returnUrl = encodeURIComponent(window.location.pathname.split('/').pop() || 'dashboard.html');
        window.location.href = `login.html?redirect=${returnUrl}`;
    }
}

// ----- Redirect if already logged in (for login.html / signup.html) -----
function redirectIfLoggedIn() {
    if (isLoggedIn()) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect');
        const plan = urlParams.get('plan');

        if (redirect === 'checkout' && plan) {
            window.location.href = `index.html?action=checkout&plan=${encodeURIComponent(plan)}`;
        } else if (redirect && redirect.endsWith('.html')) {
            window.location.href = redirect;
        } else {
            window.location.href = 'index.html';
        }
    }
}

// ============================================================
// UNIVERSAL NAVBAR RENDERER
// ============================================================
function renderNavbar() {
    const authSection = document.getElementById('authSection');
    if (!authSection) return;

    const user = getCurrentUser();

    if (user) {
        const displayName = user.name || user.email.split('@')[0];
        authSection.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <span class="text-secondary small d-none d-sm-inline">
                    Welcome, <strong class="text-dark" style="color: var(--text-primary) !important;">${escapeHtml(displayName)}</strong>
                </span>
                <a href="dashboard.html" class="btn btn-outline-brass btn-sm d-none d-md-inline-flex align-items-center gap-1">
                    <i class="bi bi-speedometer2"></i> Dashboard
                </a>
                <button type="button" id="logoutBtn" class="btn btn-brass btn-sm d-inline-flex align-items-center gap-1">
                    <i class="bi bi-box-arrow-right"></i> Logout
                </button>
            </div>
        `;

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                logoutUser();
            });
        }
    } else {
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');
        const pricingHref = isHomePage ? '#pricing-section' : 'index.html#pricing-section';

        authSection.innerHTML = `
            <div class="d-flex align-items-center gap-2">
                <a href="login.html" class="btn btn-outline-brass btn-sm">Sign In</a>
                <a href="${pricingHref}" class="btn btn-brass btn-sm">Get Funded</a>
            </div>
        `;
    }
}

// Helper to escape HTML characters in user-provided names
function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ============================================================
// PURCHASE GATE & INTENDED REDIRECT HANDLER
// ============================================================
function handlePurchaseGate(planString) {
    if (isLoggedIn()) {
        // User is logged in -> Open Checkout Modal directly
        if (typeof openCheckoutModal === 'function') {
            openCheckoutModal(planString);
        } else {
            // Fallback if modal function is in main.js
            const modalEl = document.getElementById('checkoutModal');
            if (modalEl) {
                const planSpan = document.getElementById('selectedPlan');
                if (planSpan) planSpan.textContent = planString;
                const user = getCurrentUser();
                const nameInput = document.getElementById('fullName') || document.getElementById('checkoutName');
                const emailInput = document.getElementById('email') || document.getElementById('checkoutEmail');
                if (nameInput && user.name) nameInput.value = user.name;
                if (emailInput && user.email) emailInput.value = user.email;

                const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
                bsModal.show();
            }
        }
    } else {
        // User is NOT logged in -> Save intent and show Auth Modal or redirect
        sessionStorage.setItem(PENDING_PLAN_KEY, planString);
        sessionStorage.setItem(PENDING_ACTION_KEY, 'checkout');

        const authModalEl = document.getElementById('authModal');
        if (authModalEl) {
            const planNotice = document.getElementById('authModalPlanNotice');
            if (planNotice) {
                planNotice.textContent = `Sign in or register to get started with your ${planString} challenge.`;
                planNotice.classList.remove('d-none');
            }
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                const bsAuthModal = bootstrap.Modal.getOrCreateInstance(authModalEl);
                bsAuthModal.show();
            } else {
                window.location.href = `login.html?redirect=checkout&plan=${encodeURIComponent(planString)}`;
            }
        } else {
            // Redirect to login page with return query params
            window.location.href = `login.html?redirect=checkout&plan=${encodeURIComponent(planString)}`;
        }
    }
}

// ----- Check Pending Actions on Page Load -----
function checkPendingActions() {
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action') || sessionStorage.getItem(PENDING_ACTION_KEY);
    const plan = urlParams.get('plan') || sessionStorage.getItem(PENDING_PLAN_KEY);

    if (isLoggedIn() && action === 'checkout' && plan) {
        // Clean up URL and session storage
        sessionStorage.removeItem(PENDING_ACTION_KEY);
        sessionStorage.removeItem(PENDING_PLAN_KEY);
        if (window.history.replaceState && urlParams.has('action')) {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }

        setTimeout(() => {
            if (typeof openCheckoutModal === 'function') {
                openCheckoutModal(plan);
            } else {
                const modalEl = document.getElementById('checkoutModal');
                if (modalEl) {
                    const planSpan = document.getElementById('selectedPlan');
                    if (planSpan) planSpan.textContent = plan;
                    const user = getCurrentUser();
                    const nameInput = document.getElementById('fullName') || document.getElementById('checkoutName');
                    const emailInput = document.getElementById('email') || document.getElementById('checkoutEmail');
                    if (nameInput && user.name) nameInput.value = user.name;
                    if (emailInput && user.email) emailInput.value = user.email;

                    const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
                    bsModal.show();
                }
            }
        }, 300);
    }
}

// ============================================================
// AUTO-INITIALIZATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    renderNavbar();
    checkPendingActions();
});

// Handle browser back/forward cache restore (pageshow event)
window.addEventListener('pageshow', function(e) {
    renderNavbar();
});