// Account Management UI Enhancements
// Separate from login theme - uses Tailwind v4 + DaisyUI

// Import account CSS
import './css/account.css';

document.addEventListener("DOMContentLoaded", () => {
    enhanceAccountUI();
    addSmoothScrolling();
    forceWhiteHeader(); // New aggressive fix
    styleHeaderDropdown(); // Force dropdown style
});

// Force specific styles on the header dropdown (admin menu)
function styleHeaderDropdown() {
    const observer = new MutationObserver(() => {
        // Ultra-broad selectors to catch ANY version (v4/v5/React) of the dropdown
        const selectors = [
            '.pf-v5-c-masthead .pf-v5-c-dropdown__toggle',
            'header .pf-v5-c-dropdown__toggle',
            '.pf-c-dropdown__toggle', // PatternFly 4
            '.pf-c-masthead .pf-c-dropdown__toggle',
            '[class*="masthead"] [class*="dropdown__toggle"]', // Wildcard matching
            'header button[aria-haspopup="true"]', // ARIA matching
            '#user-dropdown',
            '#landing-mobile-dropdown-button',
            '.kc-dropdown', // Keycloak specific
            '[id*="dropdown"]' // ID wildcard
        ];

        const dropdowns = document.querySelectorAll(selectors.join(','));

        dropdowns.forEach(toggle => {
            const el = toggle as HTMLElement;

            // Skip if it's the mobile hamburger menu which typically has different classes or IDs (often just an icon)
            // Ideally we check if it has text.
            if (!el.innerText && !el.textContent) return;

            // Force the "Update" button look (Standard Button Style - Rectangle with slight round)
            // User feedback: "not gray as the update button" -> standard gray-200. "corners not rounded" -> ensure 4px radius.
            el.style.setProperty('background-color', '#e5e7eb', 'important'); // bg-gray-200 (Darker than #f0f0f0)
            el.style.setProperty('background', '#e5e7eb', 'important');
            el.style.setProperty('border', '1px solid #9ca3af', 'important'); // Visible gray border (gray-400)
            el.style.setProperty('color', '#374151', 'important'); // gray-700
            el.style.setProperty('border-radius', '4px', 'important'); // Rounded rectangle (4px)
            el.style.setProperty('padding', '6px 16px', 'important'); // Standard button padding
            el.style.setProperty('display', 'inline-flex', 'important');
            el.style.setProperty('align-items', 'center', 'important');

            // Remove "plain" or "link" modifiers that strip backgrounds
            el.classList.remove('pf-m-plain', 'pf-m-link', 'pf-v5-m-plain');

            // Force children (like text) to be dark
            const children = el.querySelectorAll('*');
            children.forEach(c => {
                (c as HTMLElement).style.setProperty('color', '#111827', 'important');
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
}

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
