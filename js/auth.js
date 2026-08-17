// ============================================================
// AUTHENTICATION — localStorage based
// ============================================================

const AUTH_KEY = 'apex_funded_user';
const USERS_KEY = 'apex_funded_users';

// ----- Get stored users -----
function getUsers() {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
}

// ----- Save users -----
function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ----- Get current logged-in user -----
function getCurrentUser() {
    const user = localStorage.getItem(AUTH_KEY);
    return user ? JSON.parse(user) : null;
}

// ----- Set current user (login) — stores full user object with name -----
function setCurrentUser(email) {
    const users = getUsers();
    const userData = users[email];
    if (userData) {
        localStorage.setItem(AUTH_KEY, JSON.stringify({
            email: email,
            name: userData.name || email.split('@')[0]
        }));
    }
}

// ----- Clear session (logout) -----
function clearSession() {
    localStorage.removeItem(AUTH_KEY);
}

// ----- Check if user is logged in -----
function isLoggedIn() {
    return getCurrentUser() !== null;
}

// ----- Register a new user (stores name) -----
function registerUser(email, password, name) {
    const users = getUsers();
    if (users[email]) {
        return { success: false, message: 'Email already registered.' };
    }
    users[email] = {
        password: password,
        name: name || email.split('@')[0]
    };
    saveUsers(users);
    return { success: true, message: 'Account created successfully.' };
}

// ----- Login user -----
function loginUser(email, password) {
    const users = getUsers();
    if (!users[email]) {
        return { success: false, message: 'No account found with this email.' };
    }
    if (users[email].password !== password) {
        return { success: false, message: 'Incorrect password.' };
    }
    setCurrentUser(email);
    return { success: true, message: 'Login successful.' };
}

// ----- Logout -----
function logoutUser() {
    clearSession();
    window.location.href = 'login.html';
}

// ----- Redirect if not logged in (for protected pages) -----
function requireAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}

// ----- Redirect if already logged in (for login/signup pages) -----
function redirectIfLoggedIn() {
    if (isLoggedIn()) {
        window.location.href = 'dashboard.html';
    }
}

// ============================================================
// RENDER NAVBAR — shows user's name
// ============================================================
function renderNavbar() {
    const authSection = document.getElementById('authSection');
    if (!authSection) return;

    const user = getCurrentUser();

    if (user) {
        const displayName = user.name || user.email.split('@')[0];
        authSection.innerHTML = `
            <span class="text-secondary small me-2">Welcome, <strong>${displayName}</strong></span>
            <a href="#" id="logoutBtn" class="btn btn-outline-brass btn-sm">Logout</a>
        `;
        document.getElementById('logoutBtn')?.addEventListener('click', function(e) {
            e.preventDefault();
            logoutUser();
        });
    } else {
        authSection.innerHTML = `
            <a href="login.html" class="btn btn-outline-brass">Log In</a>
            <a href="signup.html" class="btn btn-brass">Get Started</a>
        `;
    }
}