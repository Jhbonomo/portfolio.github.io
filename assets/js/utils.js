/**
 * Utility Functions
 * Contains font loading detection, intersection observer, and other utility functions
 */

// Font loading detection and fallback
export function initializeFontLoading() {
    if ('fonts' in document) {
        // Check if custom fonts are loaded
        Promise.all([
            document.fonts.load('300 16px "Zilla Slab"'),
            document.fonts.load('400 16px "Special Elite"')
        ]).then(() => {
            console.log('Custom fonts loaded successfully');
            document.body.classList.add('fonts-loaded');
        }).catch((error) => {
            console.warn('Custom fonts failed to load, using fallbacks:', error);
            document.body.classList.add('fonts-fallback');
        });
    } else {
        // Fallback for browsers that don't support Font Loading API
        console.log('Font Loading API not supported, using fallbacks');
        document.body.classList.add('fonts-fallback');
    }
}

// Intersection Observer for animations
export function createIntersectionObserver() {
    return new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
}

// Debounce function for resize events
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Mobile detection utility
export function isMobile() {
    return window.innerWidth < 1024;
}

// Console logging utility for debugging
export function logDebug(message, data = null) {
    if (data) {
        console.log(message, data);
    } else {
        console.log(message);
    }
}
