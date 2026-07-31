document.addEventListener('DOMContentLoaded', function() {
  // Login
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!loginForm.checkValidity()) { loginForm.classList.add('was-validated'); return; }
      document.getElementById('loginMessage').classList.remove('d-none');
    });
  }

  // Signup
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
      if (!signupForm.checkValidity()) { signupForm.classList.add('was-validated'); return; }
      document.getElementById('signupMessage').classList.remove('d-none');
    });
    document.getElementById('signupConfirm').addEventListener('input', function() { this.setCustomValidity(''); });
  }

  // Contact
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) { contactForm.classList.add('was-validated'); return; }
      document.getElementById('contactSuccess').classList.remove('d-none');
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    });
  }
});