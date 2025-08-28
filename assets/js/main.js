/**
 * Main JavaScript Module
 * Orchestrates all JavaScript functionality for the portfolio
 */

import { 
    initializeFontLoading, 
    createIntersectionObserver, 
    safeExecute, 
    safeExecuteAsync, 
    reportError,
    supportsCanvas,
    supportsRequestAnimationFrame,
    getDevicePerformance
} from './utils.js';
import { startTypingAnimation } from './typing-animation.js';
import { initializeNavigation } from './navigation.js';

// Main initialization function with comprehensive error handling
async function initializeApp() {
    try {
        // Check browser capabilities
        const performance = getDevicePerformance();
        console.log('Device performance:', performance);
        
        // Check feature support
        const canvasSupported = supportsCanvas();
        const rafSupported = supportsRequestAnimationFrame();
        
        if (!canvasSupported) {
            console.warn('Canvas not supported - animation may not work');
        }
        if (!rafSupported) {
            console.warn('requestAnimationFrame not supported - animations may be choppy');
        }
        
        // Initialize font loading
        safeExecute(() => initializeFontLoading(), null, 'font loading');
        
        // Create intersection observer for animations
        const observer = safeExecute(() => createIntersectionObserver(), null, 'intersection observer creation');
        
        // Initialize mobile navigation
        safeExecute(() => initializeNavigation(), null, 'navigation initialization');
        
        // Start typing animation
        await safeExecuteAsync(() => startTypingAnimation(), null, 'typing animation');
        
        // Observe project cards for animations
        safeExecute(() => {
            const cards = document.querySelectorAll('.card');
            if (cards.length === 0) {
                console.warn('No project cards found for animation');
                return;
            }
            
            cards.forEach(card => {
                safeExecute(() => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    if (observer && observer.observe) {
                        observer.observe(card);
                    }
                }, null, 'card animation setup');
            });
        }, null, 'project cards animation setup');
        
        console.log('App initialization completed successfully');
        
    } catch (error) {
        reportError(error, 'app initialization');
        console.error('Failed to initialize app, but continuing with basic functionality');
    }
}

// Initialize when DOM is ready with error handling
function initializeWhenReady() {
    safeExecuteAsync(() => initializeApp(), null, 'app initialization on DOM ready');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWhenReady);
} else {
    // DOM is already ready
    initializeWhenReady();
}

// Export for potential external use
export { initializeApp };
