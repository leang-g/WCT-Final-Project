// ============================================================
// APEX FUNDED — Form Validation & Auth Routing
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // Preserve URL query params on toggle links
    const searchParams = window.location.search;
    if (searchParams) {
        const toSignup = document.getElementById('toSignupLink');
        if (toSignup) toSignup.href = 'signup.html' + searchParams;
        const toLogin = document.getElementById('toLoginLink');
        if (toLogin) toLogin.href = 'login.html' + searchParams;
    }

    // Display plan notice if redirected from purchase gate
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plan') || sessionStorage.getItem('apex_intended_plan');
    const planNoticeBanner = document.getElementById('planNoticeBanner');
    const planNoticeText = document.getElementById('planNoticeText');
    if (planParam && planNoticeBanner && planNoticeText) {
        planNoticeText.textContent = `Sign in to complete checkout for ${planParam}.`;
        planNoticeBanner.classList.remove('d-none');
    }

    // ============================================================
    // 1. STANDALONE LOGIN FORM (login.html)
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
            const password = document.getElementById('loginPassword').value;
            const messageEl = document.getElementById('loginMessage');

            const result = loginUser(email, password);

            if (result.success) {
                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect') || sessionStorage.getItem('apex_intended_action');
                const plan = urlParams.get('plan') || sessionStorage.getItem('apex_intended_plan');

                let targetUrl = 'index.html';
                let msg = 'Login successful! Redirecting to Home...';

                if (redirect === 'checkout' && plan) {
                    targetUrl = `index.html?action=checkout&plan=${encodeURIComponent(plan)}`;
                    msg = 'Login successful! Taking you to checkout...';
                } else if (redirect === 'dashboard.html') {
                    targetUrl = 'dashboard.html';
                    msg = 'Login successful! Redirecting to Dashboard...';
                }

                if (messageEl) {
                    messageEl.className = 'alert alert-success text-center';
                    messageEl.innerHTML = `<i class="bi bi-check-circle me-1"></i> ${msg}`;
                    messageEl.classList.remove('d-none');
                }

                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 600);
            } else {
                if (messageEl) {
                    messageEl.className = 'alert alert-danger text-center';
                    messageEl.innerHTML = `<i class="bi bi-exclamation-circle me-1"></i> ${result.message}`;
                    messageEl.classList.remove('d-none');
                }
            }
        });
    }

    // ============================================================
    // 2. STANDALONE SIGNUP FORM (signup.html)
    // ============================================================
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const pw = document.getElementById('signupPassword').value;
            const cpw = document.getElementById('signupConfirm').value;
            const confirmInput = document.getElementById('signupConfirm');

            if (pw !== cpw) {
                confirmInput.setCustomValidity('Passwords do not match');
            } else {
                confirmInput.setCustomValidity('');
            }

            if (!signupForm.checkValidity()) {
                signupForm.classList.add('was-validated');
                return;
            }

            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const messageEl = document.getElementById('signupMessage');

            // 1. Register
            const registerResult = registerUser(email, pw, name);

            if (registerResult.success) {
                // 2. Auto-login
                loginUser(email, pw);

                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect') || sessionStorage.getItem('apex_intended_action');
                const plan = urlParams.get('plan') || sessionStorage.getItem('apex_intended_plan');

                let targetUrl = 'index.html';
                let msg = 'Account created! Redirecting to Home...';

                if (redirect === 'checkout' && plan) {
                    targetUrl = `index.html?action=checkout&plan=${encodeURIComponent(plan)}`;
                    msg = 'Account created! Taking you to checkout...';
                }

                if (messageEl) {
                    messageEl.className = 'alert alert-success text-center';
                    messageEl.innerHTML = `<i class="bi bi-check-circle me-1"></i> ${msg}`;
                    messageEl.classList.remove('d-none');
                }

                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 600);
            } else {
                if (messageEl) {
                    messageEl.className = 'alert alert-danger text-center';
                    messageEl.innerHTML = `<i class="bi bi-exclamation-circle me-1"></i> ${registerResult.message}`;
                    messageEl.classList.remove('d-none');
                }
            }
        });

        const confirmInput = document.getElementById('signupConfirm');
        if (confirmInput) {
            confirmInput.addEventListener('input', function() {
                this.setCustomValidity('');
            });
        }
    }

    // ============================================================
    // 3. MODAL AUTH FORMS (For seamless in-page login/signup)
    // ============================================================
    const modalLoginForm = document.getElementById('modalLoginForm');
    if (modalLoginForm) {
        modalLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!modalLoginForm.checkValidity()) {
                modalLoginForm.classList.add('was-validated');
                return;
            }

            const email = document.getElementById('modalLoginEmail').value.trim();
            const password = document.getElementById('modalLoginPassword').value;
            const messageEl = document.getElementById('modalLoginMessage');

            const result = loginUser(email, password);

            if (result.success) {
                if (messageEl) {
                    messageEl.className = 'alert alert-success text-center';
                    messageEl.innerHTML = '<i class="bi bi-check-circle me-1"></i> Login successful!';
                    messageEl.classList.remove('d-none');
                }

                renderNavbar();

                setTimeout(() => {
                    const authModalEl = document.getElementById('authModal');
                    if (authModalEl) {
                        const bsAuthModal = bootstrap.Modal.getInstance(authModalEl);
                        if (bsAuthModal) bsAuthModal.hide();
                    }

                    // Check if there was an intended plan to open checkout
                    const pendingPlan = sessionStorage.getItem('apex_intended_plan');
                    if (pendingPlan) {
                        sessionStorage.removeItem('apex_intended_plan');
                        sessionStorage.removeItem('apex_intended_action');
                        if (typeof openCheckoutModal === 'function') {
                            openCheckoutModal(pendingPlan);
                        }
                    }
                }, 500);
            } else {
                if (messageEl) {
                    messageEl.className = 'alert alert-danger text-center';
                    messageEl.innerHTML = `<i class="bi bi-exclamation-circle me-1"></i> ${result.message}`;
                    messageEl.classList.remove('d-none');
                }
            }
        });
    }

    const modalSignupForm = document.getElementById('modalSignupForm');
    if (modalSignupForm) {
        modalSignupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const pw = document.getElementById('modalSignupPassword').value;
            const cpw = document.getElementById('modalSignupConfirm').value;
            const confirmInput = document.getElementById('modalSignupConfirm');

            if (pw !== cpw) {
                confirmInput.setCustomValidity('Passwords do not match');
            } else {
                confirmInput.setCustomValidity('');
            }

            if (!modalSignupForm.checkValidity()) {
                modalSignupForm.classList.add('was-validated');
                return;
            }

            const name = document.getElementById('modalSignupName').value.trim();
            const email = document.getElementById('modalSignupEmail').value.trim();
            const messageEl = document.getElementById('modalSignupMessage');

            const registerResult = registerUser(email, pw, name);

            if (registerResult.success) {
                loginUser(email, pw);
                renderNavbar();

                if (messageEl) {
                    messageEl.className = 'alert alert-success text-center';
                    messageEl.innerHTML = '<i class="bi bi-check-circle me-1"></i> Account created!';
                    messageEl.classList.remove('d-none');
                }

                setTimeout(() => {
                    const authModalEl = document.getElementById('authModal');
                    if (authModalEl) {
                        const bsAuthModal = bootstrap.Modal.getInstance(authModalEl);
                        if (bsAuthModal) bsAuthModal.hide();
                    }

                    const pendingPlan = sessionStorage.getItem('apex_intended_plan');
                    if (pendingPlan) {
                        sessionStorage.removeItem('apex_intended_plan');
                        sessionStorage.removeItem('apex_intended_action');
                        if (typeof openCheckoutModal === 'function') {
                            openCheckoutModal(pendingPlan);
                        }
                    }
                }, 500);
            } else {
                if (messageEl) {
                    messageEl.className = 'alert alert-danger text-center';
                    messageEl.innerHTML = `<i class="bi bi-exclamation-circle me-1"></i> ${registerResult.message}`;
                    messageEl.classList.remove('d-none');
                }
            }
        });
    }

    // ============================================================
    // 4. CONTACT FORM
    // ============================================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!contactForm.checkValidity()) {
                contactForm.classList.add('was-validated');
                return;
            }
            const successEl = document.getElementById('contactSuccess');
            if (successEl) successEl.classList.remove('d-none');
            contactForm.reset();
            contactForm.classList.remove('was-validated');
        });
    }

    // ============================================================
    // 5. PAGE PROTECTION CHECKS
    // ============================================================
    const currentPath = window.location.pathname;
    if (currentPath.includes('login.html') || currentPath.includes('signup.html')) {
        redirectIfLoggedIn();
    }
    if (currentPath.includes('dashboard.html')) {
        requireAuth();
    }
});