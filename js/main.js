// ============================================================
// APEX FUNDED — Main Application Controller
// ============================================================

// Global function to open Checkout Modal with selected plan preloaded
function openCheckoutModal(planName) {
    const modalEl = document.getElementById('checkoutModal');
    if (!modalEl) return;

    const selectedPlanSpan = document.getElementById('selectedPlan');
    const checkoutForm = document.getElementById('checkoutForm');
    const successMessage = document.getElementById('successMessage');

    if (selectedPlanSpan) {
        selectedPlanSpan.textContent = planName || 'Apex Funded Challenge';
    }

    if (checkoutForm) {
        checkoutForm.reset();
        checkoutForm.classList.remove('was-validated');

        // Pre-fill authenticated user data
        if (typeof getCurrentUser === 'function') {
            const user = getCurrentUser();
            if (user) {
                const nameInput = document.getElementById('fullName') || document.getElementById('checkoutName');
                const emailInput = document.getElementById('email') || document.getElementById('checkoutEmail');
                if (nameInput && user.name) nameInput.value = user.name;
                if (emailInput && user.email) emailInput.value = user.email;
            }
        }
    }

    if (successMessage) {
        successMessage.classList.add('d-none');
    }

    const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
    bsModal.show();
}

document.addEventListener('DOMContentLoaded', function() {
    // ============================================================
    // 1. CHECKOUT MODAL FORM SUBMISSION
    // ============================================================
    const checkoutForm = document.getElementById('checkoutForm');
    const checkoutModalEl = document.getElementById('checkoutModal');
    const successMessage = document.getElementById('successMessage');

    if (checkoutForm && checkoutModalEl) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (!checkoutForm.checkValidity()) {
                checkoutForm.classList.add('was-validated');
                return;
            }

            const plan = document.getElementById('selectedPlan')?.textContent || 'Growth $50,000 (MetaTrader 5) - $299';
            let user = (typeof getCurrentUser === 'function') ? getCurrentUser() : null;

            // If user somehow wasn't logged in, save session from checkout inputs
            if (!user) {
                const emailInput = document.getElementById('email') || document.getElementById('checkoutEmail');
                const nameInput = document.getElementById('fullName') || document.getElementById('checkoutName');
                const email = emailInput?.value.trim() || 'trader@apexfunded.io';
                const name = nameInput?.value.trim() || email.split('@')[0];
                if (typeof setCurrentUser === 'function') {
                    setCurrentUser(email, name);
                    user = getCurrentUser();
                }
            }

            // Create and persist the account
            let createdAccount = null;
            if (typeof createAccountForUser === 'function' && user) {
                createdAccount = createAccountForUser(user.email, plan);
            }

            const accountIdDisplay = createdAccount ? createdAccount.id : 'APEX-' + Math.floor(100000 + Math.random() * 900000);
            const planDetails = (typeof parsePlanDetails === 'function') ? parsePlanDetails(plan) : { plan: plan, platform: 'MetaTrader 5' };

            if (successMessage) {
                successMessage.innerHTML = `
                    <div class="p-3 rounded mb-3 text-start" style="background: rgba(34, 197, 94, 0.08); border-left: 3px solid #22c55e;">
                        <div class="d-flex align-items-center gap-2 mb-2">
                            <i class="bi bi-check-circle-fill text-success fs-4"></i>
                            <h6 class="fw-bold mb-0 text-success">Evaluation Challenge Activated!</h6>
                        </div>
                        <div class="small text-secondary mb-1">
                            Account ID: <strong class="text-dark">#${accountIdDisplay}</strong>
                        </div>
                        <div class="small text-secondary mb-1">
                            Plan: <strong class="text-dark">${planDetails.plan}</strong> (${planDetails.platform})
                        </div>
                        <div class="small text-secondary">
                            Status: <span class="badge bg-success">LIVE SIMULATED - ACTIVE</span>
                        </div>
                    </div>
                    <div class="text-center mt-3">
                        <a href="dashboard.html" class="btn btn-brass w-100 py-2">
                            <i class="bi bi-speedometer2 me-1"></i> Go to Dashboard
                        </a>
                    </div>
                `;
                successMessage.classList.remove('d-none');
            }

            // If already on dashboard.html, trigger real-time refresh
            if (window.location.pathname.includes('dashboard.html') && typeof initDashboardAccountSwitcher === 'function') {
                initDashboardAccountSwitcher();
            }
        });
    }

    // ============================================================
    // 2. STATIC BUY BUTTONS (Hero or non-dynamic buttons)
    // ============================================================
    document.querySelectorAll('.buy-btn-static').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const plan = this.getAttribute('data-plan') || 'Growth 50K - $299';
            if (typeof handlePurchaseGate === 'function') {
                handlePurchaseGate(plan);
            }
        });
    });

    // ============================================================
    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#!') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ============================================================
    // 4. NAVBAR ACTIVE LINK HIGHLIGHTING
    // ============================================================
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveLink() {
        if (sections.length === 0) return;
        let current = '';
        const scrollPosition = window.scrollY + 140;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                current = section.getAttribute('id');
            }
        });

        if (current) {
            navLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === '#' + current || href === 'index.html#' + current) {
                    link.classList.add('active');
                } else if (href && href.startsWith('#')) {
                    link.classList.remove('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
});