/**
 * Main JavaScript Module
 * Simple and clean portfolio functionality
 */

// Simple projects navigation
function initializeProjectsNavigation() {
    const projectsButton = document.querySelector('.projects-button');
    const casesSection = document.querySelector('.cases');
    const backButton = document.getElementById('backButton');
    
    if (!projectsButton || !casesSection) {
        console.warn('Projects navigation elements not found');
        return;
    }
    
    // Simple click to scroll to projects with offset
    projectsButton.addEventListener('click', () => {
        const offset = 20; // 80px offset from top
        const elementPosition = casesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
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
