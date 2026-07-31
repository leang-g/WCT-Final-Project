document.addEventListener('DOMContentLoaded', function() {
  // ===== CHECKOUT MODAL =====
  const buyButtons = document.querySelectorAll('.buy-btn');
  if (buyButtons.length > 0) {
    const checkoutModal = new bootstrap.Modal(document.getElementById('checkoutModal'));
    const selectedPlanSpan = document.getElementById('selectedPlan');
    const checkoutForm = document.getElementById('checkoutForm');
    const successMessage = document.getElementById('successMessage');

    buyButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const plan = btn.getAttribute('data-plan');
        selectedPlanSpan.textContent = plan;
        checkoutForm.reset();
        checkoutForm.classList.remove('was-validated');
        successMessage.classList.add('d-none');
        checkoutModal.show();
      });
    });

    checkoutForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!checkoutForm.checkValidity()) {
        checkoutForm.classList.add('was-validated');
        return;
      }
      successMessage.classList.remove('d-none');
      setTimeout(() => {
        checkoutModal.hide();
        checkoutForm.reset();
        checkoutForm.classList.remove('was-validated');
      }, 3000);
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== NAVBAR ACTIVE LINK UPDATING =====
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 120) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  window.addEventListener('load', updateActiveLink);

  // ===== ATTACH TOGGLE EVENT LISTENERS =====
  // The actual rendering is in pricing-calculator.js
  if (document.getElementById('pricingCardsContainer')) {
    // Initial render
    if (typeof renderPricingCards === 'function') {
      renderPricingCards();
    }
    // Add event listeners to toggles
    document.querySelectorAll('.toggle-option').forEach(option => {
      option.addEventListener('click', function() {
        const group = this.parentElement;
        group.querySelectorAll('.toggle-option').forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        if (typeof renderPricingCards === 'function') {
          renderPricingCards();
        }
      });
    });
  }
});