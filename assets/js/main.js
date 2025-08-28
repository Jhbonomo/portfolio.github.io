/**
 * Main JavaScript Module
 * Orchestrates all JavaScript functionality for the portfolio
 */

import { initializeFontLoading, createIntersectionObserver } from './utils.js';
import { startTypingAnimation } from './typing-animation.js';
import { initializeNavigation } from './navigation.js';

// Main initialization function
function initializeApp() {
    // Initialize font loading
    initializeFontLoading();
    
    // Create intersection observer for animations
    const observer = createIntersectionObserver();
    
    // Initialize mobile navigation
    initializeNavigation();
    
    // Start typing animation
    startTypingAnimation();
    
    // Observe project cards for animations
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already ready
    initializeApp();
}

// Export for potential external use
export { initializeApp };
