// ============================================================
// CINEMATIC SCROLL ANIMATIONS — IntersectionObserver
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // ----- Configuration -----
    const animationConfig = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // ----- Elements to animate -----
    const revealElements = document.querySelectorAll([
        '.step-card',
        '.pricing-card-wrapper',
        '.comparison-panel',
        '.hub-card',
        '.pipeline-step',
        '.lead-capture-card',
        '.testimonial-card',
        '.comparison-grid',
        '.pipeline-timber',
        '.hero-content',
        '.hero-visual'
    ].join(','));

    // ----- Fallback for elements that might not have the reveal class yet -----
    // Add .reveal-up to all elements that should animate
    revealElements.forEach(el => {
        if (!el.classList.contains('reveal-up') && 
            !el.classList.contains('reveal-fade') &&
            !el.classList.contains('reveal-scale')) {
            el.classList.add('reveal-up');
        }
    });

    // ----- IntersectionObserver -----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, animationConfig);

    // ----- Observe all animated elements -----
    document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale').forEach(el => {
        observer.observe(el);
    });

    // ----- Staggered animation for grid items (pricing cards, hub cards) -----
    // Add a small delay to each child for a staggered effect
    document.querySelectorAll('.row.g-4, .row.gy-4').forEach(row => {
        const children = row.querySelectorAll('.col-md-4, .col-md-6, .col-lg-4');
        children.forEach((child, index) => {
            const card = child.querySelector('.pricing-card-wrapper, .hub-card, .step-card, .pipeline-step');
            if (card) {
                card.style.transitionDelay = `${index * 0.08}s`;
            }
        });
    });

    // ----- Stagger the comparison panels -----
    document.querySelectorAll('.comparison-grid .comparison-panel').forEach((panel, index) => {
        panel.style.transitionDelay = `${index * 0.15}s`;
    });

    // ----- Stagger the pipeline steps -----
    document.querySelectorAll('.pipeline-steps .pipeline-step').forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.1}s`;
    });

    // ----- Hero content stagger -----
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const heroChildren = heroContent.children;
        Array.from(heroChildren).forEach((child, index) => {
            if (child.tagName !== 'DIV' || child.classList.contains('hero-stats')) {
                // Skip wrapper divs, apply to direct children only
                child.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }

    // ----- Hero card -----
    const heroCard = document.querySelector('.hero-visual');
    if (heroCard) {
        heroCard.style.transitionDelay = '0.2s';
    }

    console.log('🎬 Cinematic scroll animations initialized.');
});