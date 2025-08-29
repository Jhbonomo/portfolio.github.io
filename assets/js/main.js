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
        
        // Initialize projects navigation
        safeExecute(() => initializeProjectsNavigation(), null, 'projects navigation initialization');
        
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

// Initialize projects navigation
function initializeProjectsNavigation() {
    const projectsHeading = document.querySelector('.projects-heading');
    const aboutSection = document.querySelector('.about');
    const casesSection = document.querySelector('.cases');
    const backButton = document.getElementById('backButton');
    
    if (!projectsHeading || !aboutSection || !casesSection) {
        console.warn('Projects navigation elements not found');
        return;
    }
    
    // Add click handler to projects heading
    projectsHeading.addEventListener('click', () => {
        navigateToProjects();
    });
    
    // Add keyboard support for accessibility
    projectsHeading.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigateToProjects();
        }
    });
    
    // Navigation function
    function navigateToProjects() {
        // Add slide-out class to about section
        aboutSection.classList.add('slide-out');
        aboutSection.classList.remove('slide-in');
        
        // Add slide-in class to cases section
        casesSection.classList.add('slide-in');
        casesSection.classList.remove('slide-out');
        
        // Show back button
        if (backButton) {
            backButton.classList.add('visible');
        }
        
        // Update URL without page reload
        history.pushState({ section: 'projects' }, '', '#projects');
    }
    
    // Add click handler to back button
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Add slide-in class to about section
            aboutSection.classList.add('slide-in');
            aboutSection.classList.remove('slide-out');
            
            // Add slide-out class to cases section
            casesSection.classList.add('slide-out');
            casesSection.classList.remove('slide-in');
            
            // Hide back button
            backButton.classList.remove('visible');
            
            // Update URL without page reload
            history.pushState({ section: 'about' }, '', '#');
        });
    }
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.section === 'projects') {
            // Navigate to projects
            aboutSection.classList.add('slide-out');
            aboutSection.classList.remove('slide-in');
            casesSection.classList.add('slide-in');
            casesSection.classList.remove('slide-out');
            if (backButton) backButton.classList.add('visible');
        } else {
            // Navigate to about
            aboutSection.classList.add('slide-in');
            aboutSection.classList.remove('slide-out');
            casesSection.classList.add('slide-out');
            casesSection.classList.remove('slide-in');
            if (backButton) backButton.classList.remove('visible');
        }
    });
    
    // Check initial URL state
    if (window.location.hash === '#projects') {
        aboutSection.classList.add('slide-out');
        aboutSection.classList.remove('slide-in');
        casesSection.classList.add('slide-in');
        casesSection.classList.remove('slide-out');
        if (backButton) backButton.classList.add('visible');
    }
}

// Export for potential external use
export { initializeApp };
