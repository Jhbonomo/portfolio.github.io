/**
 * Main JavaScript Module
 * Simple and clean portfolio functionality
 */

// Simple projects navigation
function initializeProjectsNavigation() {
    const projectsHeading = document.querySelector('.projects-heading');
    const casesSection = document.querySelector('.cases');
    const backButton = document.getElementById('backButton');
    
    if (!projectsHeading || !casesSection) {
        console.warn('Projects navigation elements not found');
        return;
    }
    
    // Simple click to scroll to projects
    projectsHeading.addEventListener('click', () => {
        casesSection.scrollIntoView({ behavior: 'smooth' });
    });
    
    // Simple click to scroll to top
    if (backButton) {
        backButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeProjectsNavigation);
} else {
    // DOM is already ready
    initializeProjectsNavigation();
}
