/**
 * Main JavaScript Module
 * Simple and clean portfolio functionality
 */

/**
 * Initialize projects navigation with smooth scrolling
 */
function initializeProjectsNavigation() {
  try {
    const projectsButton = document.querySelector('.projects-button');
    const casesSection = document.querySelector('.cases');
    const backButton = document.getElementById('backButton');

    if (!projectsButton || !casesSection) {
      return; // Silently fail if elements not found (may not be on this page)
    }

    // Smooth scroll to projects with offset
    projectsButton.addEventListener('click', () => {
      try {
        const offset = 20;
        const elementPosition = casesSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      } catch (error) {
        // Fallback to instant scroll if smooth scroll fails
        casesSection.scrollIntoView();
      }
    });

    // Scroll to top button
    if (backButton) {
      backButton.addEventListener('click', () => {
        try {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
          window.scrollTo(0, 0);
        }
      });
    }
  } catch (error) {
    // Production: fail silently
    // Development: log to console (will be removed in build)
    console.error('Error initializing projects navigation:', error);
  }
}

/**
 * Initialize all functionality when DOM is ready
 */
function initialize() {
  initializeProjectsNavigation();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

// Export for potential future module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initializeProjectsNavigation };
}
