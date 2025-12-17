// Account Management UI Enhancements
// Separate from login theme - uses Tailwind v4 + DaisyUI

// Import account CSS
import './css/account.css';

document.addEventListener("DOMContentLoaded", () => {
    enhanceAccountUI();
    addSmoothScrolling();
    forceWhiteHeader(); // New aggressive fix
});

// Brute force fix for resistant black header with MutationObserver
function forceWhiteHeader() {
    const headerSelectors = [
        '.pf-v5-c-masthead',
        'header',
        '.pf-v5-c-page__header',
        '.pf-v5-c-masthead__main',
        '.pf-v5-c-masthead__content',
        '.pf-v5-c-masthead__tools'
    ];

    const applyForce = () => {
        document.querySelectorAll(headerSelectors.join(',')).forEach(el => {
            // Remove dark class
            if (el.classList.contains('pf-m-dark')) {
                el.classList.remove('pf-m-dark');
            }

            // Force inline styles
            const element = el as HTMLElement;
            if (element.style.backgroundColor !== 'rgb(255, 255, 255)' && element.style.backgroundColor !== '#ffffff') {
                element.style.setProperty('background-color', '#ffffff', 'important');
                element.style.setProperty('background', '#ffffff', 'important');
            }
            if (element.style.color !== 'rgb(21, 21, 21)' && element.style.color !== '#151515') {
                element.style.setProperty('color', '#151515', 'important');
            }

            // Force children
            el.querySelectorAll('*').forEach(child => {
                const childEl = child as HTMLElement;
                // Don't override buttons that need to be blue
                if (!childEl.classList.contains('pf-v5-c-button') && !childEl.classList.contains('pf-m-primary')) {
                    if (window.getComputedStyle(childEl).color === 'rgb(255, 255, 255)') { // If white text
                        childEl.style.color = '#151515';
                    }
                }
            });
        });
    };

    // Initial run
    applyForce();

    // Observe for changes (React re-renders)
    const observer = new MutationObserver(() => {
        applyForce();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class', 'style']
    });
}

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
