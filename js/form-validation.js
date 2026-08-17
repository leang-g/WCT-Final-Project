document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // LOGIN FORM
    // ============================================================
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!loginForm.checkValidity()) {
                loginForm.classList.add('was-validated');
                return;
            }
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value.trim();

            const result = loginUser(email, password);
            const messageEl = document.getElementById('loginMessage');
            if (result.success) {
                messageEl.className = 'alert alert-success text-center';
                messageEl.innerHTML = '<i class="bi bi-check-circle me-1"></i> ' + result.message + ' Redirecting...';
                messageEl.classList.remove('d-none');
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                messageEl.className = 'alert alert-danger text-center';
                messageEl.innerHTML = '<i class="bi bi-exclamation-circle me-1"></i> ' + result.message;
                messageEl.classList.remove('d-none');
            }
        });
    }

    // ============================================================
    // SIGNUP FORM — with auto‑login after registration
    // ============================================================
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const pw = document.getElementById('signupPassword').value;
            const cpw = document.getElementById('signupConfirm').value;
            if (pw !== cpw) {
                document.getElementById('signupConfirm').setCustomValidity('Passwords do not match');
            } else {
                document.getElementById('signupConfirm').setCustomValidity('');
            }
            if (!signupForm.checkValidity()) {
                signupForm.classList.add('was-validated');
                return;
            }

            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = pw;

            // 1. Register the user
            const registerResult = registerUser(email, password, name);
            const messageEl = document.getElementById('signupMessage');

            if (registerResult.success) {
                // 2. Auto‑login the user
                const loginResult = loginUser(email, password);
                if (loginResult.success) {
                    messageEl.className = 'alert alert-success text-center';
                    messageEl.innerHTML = '<i class="bi bi-check-circle me-1"></i> Account created! Redirecting to dashboard...';
                    messageEl.classList.remove('d-none');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    // Fallback: if auto‑login fails, go to login page
                    messageEl.className = 'alert alert-warning text-center';
                    messageEl.innerHTML = 'Account created. Please log in.';
                    messageEl.classList.remove('d-none');
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                }
            } else {
                messageEl.className = 'alert alert-danger text-center';
                messageEl.innerHTML = '<i class="bi bi-exclamation-circle me-1"></i> ' + registerResult.message;
                messageEl.classList.remove('d-none');
            }
        });

        document.getElementById('signupConfirm').addEventListener('input', function() {
            this.setCustomValidity('');
        });
    }

    // ============================================================
    // CONTACT FORM (unchanged)
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }
            document.getElementById('contactSuccess').classList.remove('d-none');
            contactForm.reset();
            contactForm.classList.remove('was-validated');
        });
    }

    // ============================================================
    // PROTECT PAGES
    // ============================================================
    if (window.location.pathname.includes('login.html') || window.location.pathname.includes('signup.html')) {
        redirectIfLoggedIn();
    }
    if (window.location.pathname.includes('dashboard.html')) {
        requireAuth();
    }
});