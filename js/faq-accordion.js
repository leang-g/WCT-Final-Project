// Optional: just logs FAQ clicks
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('#faqAccordion .accordion-button').forEach(btn => {
    btn.addEventListener('click', () => console.log('FAQ:', btn.textContent.trim()));
  });
});