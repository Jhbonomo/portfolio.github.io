/**
 * Navigation Module
 * Handles mobile navigation between about and projects sections
 */

import { isMobile, logDebug, debounce, safeExecute, reportError } from './utils.js';

class MobileNavigation {
    constructor() {
        this.projectsHeading = safeExecute(() => document.querySelector('.projects-heading'), null, 'projects heading selection');
        this.aboutSection = safeExecute(() => document.querySelector('.about'), null, 'about section selection');
        this.casesSection = safeExecute(() => document.querySelector('.cases'), null, 'cases section selection');
        this.backButton = safeExecute(() => document.getElementById('backButton'), null, 'back button selection');
        
        // Store event handler functions so we can remove them properly
        this.projectsClickHandler = null;
        this.backClickHandler = null;
        
        // Validate required elements
        if (!this.projectsHeading || !this.aboutSection || !this.casesSection || !this.backButton) {
            console.warn('Some navigation elements not found:', {
                projectsHeading: !!this.projectsHeading,
                aboutSection: !!this.aboutSection,
                casesSection: !!this.casesSection,
                backButton: !!this.backButton
            });
        }
        
        this.init();
    }
    
    init() {
        return safeExecute(() => {
            // Initial setup
            this.handleMobileNavigation();
            
            // Add a simple test to verify mobile detection
            logDebug('Window width:', window.innerWidth);
            logDebug('Is mobile (< 1024px):', isMobile());
            logDebug('Projects heading element:', this.projectsHeading);
            
            // Handle resize events with debouncing
            window.addEventListener('resize', debounce(() => {
                this.handleMobileNavigation();
            }, 250));
        }, null, 'navigation initialization');
    }
    
    handleMobileNavigation() {
        // Remove existing event listeners first
        this.removeEventListeners();
        
        if (isMobile()) {
            this.setupMobileNavigation();
        } else {
            this.setupDesktopNavigation();
        }
    }
    
    removeEventListeners() {
        if (this.projectsClickHandler) {
            this.projectsHeading.removeEventListener('click', this.projectsClickHandler);
            this.projectsHeading.removeEventListener('touchstart', this.projectsClickHandler);
        }
        if (this.backClickHandler) {
            this.backButton.removeEventListener('click', this.backClickHandler);
            this.backButton.removeEventListener('touchstart', this.backClickHandler);
        }
    }
    
    setupMobileNavigation() {
        // Mobile setup
        this.projectsHeading.style.cursor = 'pointer';
        this.projectsHeading.style.userSelect = 'none';
        
        // Initialize mobile layout - both sections visible but cases off-screen
        this.aboutSection.style.display = 'flex';
        this.casesSection.style.display = 'flex';
        
        // Set initial state
        this.aboutSection.classList.add('slide-in');
        this.casesSection.classList.add('slide-out');
        
        // Ensure proper initial positioning
        this.aboutSection.style.transform = 'translateX(0)';
        this.aboutSection.style.opacity = '1';
        this.casesSection.style.transform = 'translateX(100%)';
        this.casesSection.style.opacity = '0';
        
        // Projects heading click handler
        this.projectsClickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            logDebug('Projects heading clicked!');
            logDebug('About section:', this.aboutSection);
            logDebug('Cases section:', this.casesSection);
            
            // Slide out about section
            this.aboutSection.classList.remove('slide-in');
            this.aboutSection.classList.add('slide-out');
            
            // Slide in cases section
            this.casesSection.classList.remove('slide-out');
            this.casesSection.classList.add('slide-in');
            
            // Force repaint
            this.aboutSection.offsetHeight;
            this.casesSection.offsetHeight;
            
            logDebug('Classes after click - About:', this.aboutSection.className);
            logDebug('Classes after click - Cases:', this.casesSection.className);
            
            // Show back button with animation
            this.backButton.style.display = 'block';
            setTimeout(() => {
                this.backButton.classList.add('visible');
            }, 50);
        };
        
        // Back button click handler
        this.backClickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            logDebug('Back button clicked!');
            
            // Slide out cases section
            this.casesSection.classList.remove('slide-in');
            this.casesSection.classList.add('slide-out');
            
            // Slide in about section
            this.aboutSection.classList.remove('slide-out');
            this.aboutSection.classList.add('slide-in');
            
            // Hide back button with animation
            this.backButton.classList.remove('visible');
            setTimeout(() => {
                this.backButton.style.display = 'none';
            }, 400); // Match transition duration
        };
        
        // Add both click and touchstart events for better mobile support
        this.projectsHeading.addEventListener('click', this.projectsClickHandler);
        this.projectsHeading.addEventListener('touchstart', this.projectsClickHandler);
        
        this.backButton.addEventListener('click', this.backClickHandler);
        this.backButton.addEventListener('touchstart', this.backClickHandler);
        
        logDebug('Mobile navigation setup complete with slide transitions.');
    }
    
    setupDesktopNavigation() {
        // Desktop setup
        this.projectsHeading.style.cursor = 'default';
        this.projectsHeading.style.userSelect = 'auto';
        
        // Show both sections on desktop with no transitions
        this.aboutSection.style.display = 'flex';
        this.casesSection.style.display = 'flex';
        
        // Remove mobile transition classes
        this.aboutSection.classList.remove('slide-in', 'slide-out');
        this.casesSection.classList.remove('slide-in', 'slide-out');
        
        // Reset transforms and opacity
        this.aboutSection.style.transform = '';
        this.aboutSection.style.opacity = '';
        this.casesSection.style.transform = '';
        this.casesSection.style.opacity = '';
        
        // Hide back button
        this.backButton.style.display = 'none';
        this.backButton.classList.remove('visible');
        
        logDebug('Desktop navigation setup complete.');
    }
}

// Export the class and a factory function
export { MobileNavigation };

export function initializeNavigation() {
    return new MobileNavigation();
}
