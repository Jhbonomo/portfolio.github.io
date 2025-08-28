/**
 * Utility Functions
 * Contains font loading detection, intersection observer, and other utility functions
 */

// Error handling wrapper
export function safeExecute(fn, fallback = null, context = 'Unknown operation') {
    try {
        return fn();
    } catch (error) {
        console.error(`Error in ${context}:`, error);
        return fallback;
    }
}

// Async error handling wrapper
export async function safeExecuteAsync(fn, fallback = null, context = 'Unknown async operation') {
    try {
        return await fn();
    } catch (error) {
        console.error(`Error in ${context}:`, error);
        return fallback;
    }
}

// Font loading detection and fallback with enhanced error handling
export function initializeFontLoading() {
    return safeExecute(() => {
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
    }, null, 'font loading initialization');
}

// Intersection Observer for animations with error handling
export function createIntersectionObserver() {
    return safeExecute(() => {
        if ('IntersectionObserver' in window) {
            return new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        safeExecute(() => {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }, null, 'intersection observer animation');
                    }
                });
            }, { threshold: 0.1 });
        } else {
            // Fallback for browsers without IntersectionObserver
            console.warn('IntersectionObserver not supported, using fallback');
            return createFallbackObserver();
        }
    }, createFallbackObserver(), 'intersection observer creation');
}

// Fallback observer for browsers without IntersectionObserver
function createFallbackObserver() {
    return {
        observe: (element) => {
            // Immediately show elements for browsers without IntersectionObserver
            safeExecute(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, null, 'fallback observer animation');
        },
        unobserve: () => {},
        disconnect: () => {}
    };
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

// Feature detection utilities
export function supportsCanvas() {
    return safeExecute(() => {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext && canvas.getContext('2d'));
    }, false, 'canvas support detection');
}

export function supportsWebGL() {
    return safeExecute(() => {
        const canvas = document.createElement('canvas');
        return !!(canvas.getContext && canvas.getContext('webgl'));
    }, false, 'WebGL support detection');
}

export function supportsRequestAnimationFrame() {
    return safeExecute(() => {
        return 'requestAnimationFrame' in window;
    }, false, 'requestAnimationFrame support detection');
}

// Performance monitoring
export function getDevicePerformance() {
    return safeExecute(() => {
        const isMobile = window.innerWidth <= 768;
        const cpuCores = navigator.hardwareConcurrency || 1;
        const memory = navigator.deviceMemory || 1;
        
        return {
            isMobile,
            cpuCores,
            memory,
            isLowPerformance: isMobile || cpuCores <= 4 || memory <= 2
        };
    }, { isMobile: true, cpuCores: 1, memory: 1, isLowPerformance: true }, 'device performance detection');
}

// Error reporting utility
export function reportError(error, context = 'Unknown context') {
    console.error(`[${context}] Error:`, error);
    
    // In a production environment, you might want to send this to an error reporting service
    // Example: Sentry, LogRocket, etc.
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'exception', {
            description: `${context}: ${error.message}`,
            fatal: false
        });
    }
}
