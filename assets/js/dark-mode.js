/**
 * Dark Mode Toggle Script
 * Gerencia preferência de tema do usuário com localStorage
 */

(function initDarkMode() {
  'use strict';

  try {
    // Get stored theme preference or use system preference
    const getPreferredTheme = () => {
      const stored = localStorage.getItem('theme');
      if (stored) {
        return stored;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Apply theme to document
    const setTheme = theme => {
      try {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      } catch (error) {
        console.error('Error setting theme:', error);
      }
    };

    // Initialize theme immediately (before page render)
    const preferredTheme = getPreferredTheme();
    setTheme(preferredTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = e => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    // Modern API
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleSystemThemeChange);
    }

    // Export toggle function for optional theme switcher UI
    window.toggleTheme = () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    };

    // Export current theme getter
    window.getCurrentTheme = () => {
      return document.documentElement.getAttribute('data-theme');
    };
  } catch (error) {
    console.error('Error initializing dark mode:', error);
  }
})();
