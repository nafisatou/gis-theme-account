// Account Management UI Enhancements
// Separate from login theme - uses Tailwind v4 + DaisyUI

// Import account CSS
import './css/account.css';

document.addEventListener("DOMContentLoaded", () => {
    enhanceAccountUI();
    addSmoothScrolling();
});

function enhanceAccountUI() {
    // Apply DaisyUI classes to PatternFly components
    enhanceCards();
    enhanceInputs();
    enhanceButtons();
    enhanceNavigation();
}

function enhanceCards() {
    document.querySelectorAll('.pf-v5-c-card').forEach(card => {
        card.classList.add('card', 'bg-base-100', 'shadow-xl', 'hover:shadow-2xl', 'transition-shadow', 'duration-300');
    });
}

function enhanceInputs() {
    document.querySelectorAll('.pf-v5-c-form-control, input:not([type="checkbox"]):not([type="radio"])').forEach(input => {
        input.classList.add('input', 'input-bordered', 'rounded-3xl', 'focus:ring-2', 'focus:ring-primary', 'transition-all');
    });
}

function enhanceButtons() {
    document.querySelectorAll('.pf-v5-c-button').forEach(btn => {
        btn.classList.add('btn', 'rounded-full', 'transition-transform', 'hover:scale-105', 'active:scale-95');

        if (btn.classList.contains('pf-m-primary')) {
            btn.classList.add('btn-primary');
        } else if (btn.classList.contains('pf-m-secondary')) {
            btn.classList.add('btn-outline');
        }
    });
}

function enhanceNavigation() {
    document.querySelectorAll('.pf-v5-c-nav__link').forEach(link => {
        link.classList.add('transition-colors', 'duration-200', 'rounded-r-full');

        if (link.classList.contains('pf-m-current')) {
            link.classList.add('border-l-4', 'border-primary', 'bg-primary/10');
        }
    });
}

function addSmoothScrolling() {
    document.documentElement.style.scrollBehavior = 'smooth';
}
