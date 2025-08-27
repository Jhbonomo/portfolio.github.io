class ProjectCard extends HTMLElement {
  constructor() {
    super();
    // Use light DOM so external CSS applies
    this.innerHTML = `
      <div class="card">
        <h3 class="card-title"></h3>
        <div class="card-categories"></div>
        <p class="card-description"></p>
        <button class="card-button"></button>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['categories', 'title', 'description', 'button', 'href'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'categories') this.updateCategories(newValue);
    if (name === 'title') this.querySelector('.card-title').textContent = newValue;
    if (name === 'description') this.querySelector('.card-description').textContent = newValue;
    if (name === 'button') this.querySelector('.card-button').textContent = newValue;
    if (name === 'href') this.setupNavigation(newValue);
  }

  updateCategories(categoriesString) {
    const categoriesContainer = this.querySelector('.card-categories');
    categoriesContainer.innerHTML = '';
    
    if (categoriesString) {
      const categories = categoriesString.split('|').map(cat => cat.trim());
      
      categories.forEach((category, index) => {
        const tag = document.createElement('span');
        tag.className = 'category-tag';
        tag.textContent = category;
        categoriesContainer.appendChild(tag);
        
        // Add separator between tags (except for the last one)
        if (index < categories.length - 1) {
          const separator = document.createElement('span');
          separator.className = 'tag-separator';
          categoriesContainer.appendChild(separator);
        }
      });
    }
  }

  connectedCallback() {
    // Set initial values
    this.attributeChangedCallback('categories', '', this.getAttribute('categories') || '');
    this.attributeChangedCallback('title', '', this.getAttribute('title') || '');
    this.attributeChangedCallback('description', '', this.getAttribute('description') || '');
    this.attributeChangedCallback('button', '', this.getAttribute('button') || '');
    this.attributeChangedCallback('href', '', this.getAttribute('href') || '');
    
    // Set initial button color
    this.updateButtonColor();
    
    // Setup click handlers
    this.setupClickHandlers();
  }

  updateButtonColor() {
    const hueSlider = document.getElementById('hueSlider');
    if (hueSlider) {
      const hue = hueSlider.value;
      const button = this.querySelector('.card-button');
      if (button) {
        // Normal state
        const normalLightness = 50;
        const normalColor = `hsl(${hue}, 100%, ${normalLightness}%)`;
        button.style.backgroundColor = normalColor;
        
        // Calculate accessible text color for normal state
        const normalTextColor = this.getAccessibleTextColor(normalColor);
        button.style.color = normalTextColor;
        
        // Hover state (luminosity +20%)
        const hoverLightness = Math.min(70, normalLightness + 20);
        const hoverColor = `hsl(${hue}, 100%, ${hoverLightness}%)`;
        button.style.setProperty('--hover-color', hoverColor);
        
        // Calculate accessible text color for hover state
        const hoverTextColor = this.getAccessibleTextColor(hoverColor);
        button.style.setProperty('--hover-text-color', hoverTextColor);
      }
    }
  }

  // Calculate accessible text color based on background color
  getAccessibleTextColor(backgroundColor) {
    // Convert HSL to RGB for proper contrast calculation
    const rgb = this.hslToRgb(backgroundColor);
    const luminance = this.calculateLuminance(rgb);
    
    // Use white text for dark backgrounds, black text for light backgrounds
    // This ensures WCAG AA compliance (4.5:1 contrast ratio)
    return luminance > 0.179 ? '#000000' : '#ffffff';
  }

  // Convert HSL string to RGB array
  hslToRgb(hslString) {
    // Extract HSL values from string like "hsl(120, 100%, 50%)"
    const match = hslString.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (!match) return [0, 0, 0];
    
    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;
    
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h * 6) % 2 - 1));
    const m = l - c / 2;
    
    let r, g, b;
    
    if (h < 1/6) {
      [r, g, b] = [c, x, 0];
    } else if (h < 2/6) {
      [r, g, b] = [x, c, 0];
    } else if (h < 3/6) {
      [r, g, b] = [0, c, x];
    } else if (h < 4/6) {
      [r, g, b] = [0, x, c];
    } else if (h < 5/6) {
      [r, g, b] = [x, 0, c];
    } else {
      [r, g, b] = [c, 0, x];
    }
    
    return [
      Math.round((r + m) * 255),
      Math.round((g + m) * 255),
      Math.round((b + m) * 255)
    ];
  }

  // Calculate relative luminance (WCAG 2.1 formula)
  calculateLuminance(rgb) {
    const [r, g, b] = rgb.map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }

  // Setup navigation functionality
  setupNavigation(href) {
    if (href) {
      this.setAttribute('data-href', href);
    }
  }

  // Setup click handlers for navigation
  setupClickHandlers() {
    const card = this.querySelector('.card');
    const button = this.querySelector('.card-button');
    
    // Make the entire card clickable
    card.addEventListener('click', (e) => {
      // Don't trigger if clicking the button specifically
      if (e.target !== button) {
        this.navigateToProject();
      }
    });
    
    // Button click handler
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      this.navigateToProject();
    });
  }

  // Navigate to the project page
  navigateToProject() {
    const href = this.getAttribute('href') || this.getAttribute('data-href');
    if (href) {
      window.location.href = href;
    }
  }
}

customElements.define('project-card', ProjectCard);