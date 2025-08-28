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
        
        // Initially hide the cases section on mobile
        this.casesSection.style.display = 'none';
        this.casesSection.style.transform = 'translateY(100%)';
        this.casesSection.style.opacity = '0';
        
        // Projects heading click handler
        this.projectsClickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            logDebug('Projects heading clicked!');
            
            // Show cases section
            this.casesSection.style.display = 'flex';
            this.casesSection.style.transform = 'translateY(0)';
            this.casesSection.style.opacity = '1';
            
            // Hide about section
            this.aboutSection.style.display = 'none';
            
            // Show back button
            this.backButton.style.display = 'block';
            this.backButton.style.opacity = '1';
        };
        
        // Back button click handler
        this.backClickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            logDebug('Back button clicked!');
            
            // Hide cases section
            this.casesSection.style.display = 'none';
            this.casesSection.style.transform = 'translateY(100%)';
            this.casesSection.style.opacity = '0';
            
            // Show about section
            this.aboutSection.style.display = 'flex';
            
            // Hide back button
            this.backButton.style.display = 'none';
            this.backButton.style.opacity = '0';
        };
        
        // Add both click and touchstart events for better mobile support
        this.projectsHeading.addEventListener('click', this.projectsClickHandler);
        this.projectsHeading.addEventListener('touchstart', this.projectsClickHandler);
        
        this.backButton.addEventListener('click', this.backClickHandler);
        this.backButton.addEventListener('touchstart', this.backClickHandler);
        
        logDebug('Mobile navigation setup complete. Projects heading is clickable.');
    }
    
    setupDesktopNavigation() {
        // Desktop setup
        this.projectsHeading.style.cursor = 'default';
        this.projectsHeading.style.userSelect = 'auto';
        
        // Show both sections on desktop
        this.aboutSection.style.display = 'flex';
        this.casesSection.style.display = 'flex';
        this.casesSection.style.transform = 'translateY(0)';
        this.casesSection.style.opacity = '1';
        this.backButton.style.display = 'none';
        
        logDebug('Desktop navigation setup complete.');
    }
}

// Export the class and a factory function
export { MobileNavigation };

export function initializeNavigation() {
    return new MobileNavigation();
}
