# Portfolio Project Template

A reusable, newspaper-style template for creating beautiful portfolio case study pages with interactive image functionality.

## Features

### 🎨 Newspaper-Style Design
- Clean, readable typography with Zilla Slab font
- Professional layout with proper spacing and hierarchy
- Responsive design that works on all devices
- Dark/light theme toggle
- Adjustable font size for accessibility

### 🔍 Interactive Images
- Click to zoom functionality
- Pan and zoom controls in modal view
- Touch support for mobile devices (pinch to zoom, drag to pan)
- Keyboard shortcuts (+, -, 0, Escape)
- Mouse wheel zoom support

### 📱 Responsive & Accessible
- Mobile-first responsive design
- WCAG compliant color contrasts
- Keyboard navigation support
- Screen reader friendly
- Reduced motion support

### ⚡ Performance Optimized
- Lazy loading for images
- Smooth scrolling
- Reading progress indicator
- Optimized event handling

## How to Use

### 1. Copy the Template Files

Copy these three files to your project:
- `project-template.html` - The HTML structure
- `project-template.css` - The styling
- `project-template.js` - The interactive functionality

### 2. Create a New Project Page

1. **Duplicate the HTML file** and rename it (e.g., `project-1.html`)
2. **Update the meta information** in the `<head>` section:
   ```html
   <title>Your Project Title - Juliana's Portfolio</title>
   <meta name="description" content="Your project description">
   <meta property="og:title" content="Your Project Title">
   <meta property="og:description" content="Your project description">
   ```

3. **Update the project header**:
   ```html
   <div class="project-categories">UX Research | Product Design</div>
   <h1 class="project-title">Your Project Title</h1>
   <div class="project-subtitle">Your project subtitle</div>
   <div class="project-meta-info">
       <span class="project-date">2024</span>
       <span class="project-duration">3 months</span>
       <span class="project-role">Lead UX Researcher</span>
   </div>
   ```

### 3. Add Your Content

Replace the placeholder content in each section:

#### Executive Summary
```html
<section class="article-section">
    <h2 class="section-title">Executive Summary</h2>
    <div class="article-content">
        <p class="lead-paragraph">
            Your compelling lead paragraph here...
        </p>
        <p>
            Additional context and background information...
        </p>
    </div>
</section>
```

#### Problem Statement
```html
<section class="article-section">
    <h2 class="section-title">The Problem</h2>
    <div class="article-content">
        <p>Describe the problem or challenge...</p>
        <div class="problem-highlight">
            <blockquote>
                "Your key problem statement here..."
            </blockquote>
        </div>
    </div>
</section>
```

#### Research & Discovery
```html
<section class="article-section">
    <h2 class="section-title">Research & Discovery</h2>
    <div class="article-content">
        <p>Detail your research methods and findings...</p>
        
        <!-- Interactive Image -->
        <div class="image-container">
            <div class="image-wrapper" data-zoom="true">
                <img src="path/to/your-image.jpg" 
                     alt="Description of the image" 
                     class="interactive-image"
                     loading="lazy">
                <div class="image-overlay">
                    <button class="zoom-btn" title="Click to zoom">🔍</button>
                </div>
            </div>
            <figcaption class="image-caption">
                Caption for your image
            </figcaption>
        </div>

        <h3>Key Insights</h3>
        <ul class="insights-list">
            <li>Insight 1: Description</li>
            <li>Insight 2: Description</li>
            <li>Insight 3: Description</li>
        </ul>
    </div>
</section>
```

#### Design Process
```html
<section class="article-section">
    <h2 class="section-title">Design Process</h2>
    <div class="article-content">
        <p>Walk through your design process...</p>
        
        <!-- Multiple Images -->
        <div class="image-gallery">
            <div class="image-container">
                <div class="image-wrapper" data-zoom="true">
                    <img src="path/to/image-1.jpg" 
                         alt="Description" 
                         class="interactive-image"
                         loading="lazy">
                    <div class="image-overlay">
                        <button class="zoom-btn" title="Click to zoom">🔍</button>
                    </div>
                </div>
                <figcaption class="image-caption">Caption 1</figcaption>
            </div>
            
            <div class="image-container">
                <div class="image-wrapper" data-zoom="true">
                    <img src="path/to/image-2.jpg" 
                         alt="Description" 
                         class="interactive-image"
                         loading="lazy">
                    <div class="image-overlay">
                        <button class="zoom-btn" title="Click to zoom">🔍</button>
                    </div>
                </div>
                <figcaption class="image-caption">Caption 2</figcaption>
            </div>
        </div>
    </div>
</section>
```

#### Solution
```html
<section class="article-section">
    <h2 class="section-title">The Solution</h2>
    <div class="article-content">
        <p>Present your final solution...</p>
        
        <!-- Hero Image -->
        <div class="image-container hero-image">
            <div class="image-wrapper" data-zoom="true">
                <img src="path/to/final-solution.jpg" 
                     alt="Final solution overview" 
                     class="interactive-image"
                     loading="lazy">
                <div class="image-overlay">
                    <button class="zoom-btn" title="Click to zoom">🔍</button>
                </div>
            </div>
            <figcaption class="image-caption">
                Final solution showing the complete user experience
            </figcaption>
        </div>
    </div>
</section>
```

#### Results & Impact
```html
<section class="article-section">
    <h2 class="section-title">Results & Impact</h2>
    <div class="article-content">
        <p>Share your outcomes and metrics...</p>
        
        <div class="results-grid">
            <div class="result-item">
                <div class="result-number">85%</div>
                <div class="result-label">User Satisfaction</div>
            </div>
            <div class="result-item">
                <div class="result-number">40%</div>
                <div class="result-label">Task Completion Rate</div>
            </div>
            <div class="result-item">
                <div class="result-number">60%</div>
                <div class="result-label">Time Reduction</div>
            </div>
        </div>
    </div>
</section>
```

#### Reflection & Learnings
```html
<section class="article-section">
    <h2 class="section-title">Reflection & Learnings</h2>
    <div class="article-content">
        <p>Share your personal reflections...</p>
        
        <div class="learning-highlight">
            <h3>Key Learnings</h3>
            <ul>
                <li>Learning 1: Description</li>
                <li>Learning 2: Description</li>
                <li>Learning 3: Description</li>
            </ul>
        </div>
    </div>
</section>
```

### 4. Add Images

1. **Place your images** in a folder (e.g., `images/project-1/`)
2. **Update image paths** in the HTML:
   ```html
   <img src="images/project-1/your-image.jpg" alt="Description">
   ```
3. **Use the interactive image structure** for zoomable images:
   ```html
   <div class="image-wrapper" data-zoom="true">
       <img src="path/to/image.jpg" alt="Description" class="interactive-image" loading="lazy">
       <div class="image-overlay">
           <button class="zoom-btn" title="Click to zoom">🔍</button>
       </div>
   </div>
   ```

### 5. Update Footer

Update the footer links:
```html
<div class="footer-links">
    <a href="https://www.linkedin.com/in/julianahb/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <a href="mailto:your-email@example.com">Email</a>
</div>
```

## Interactive Features

### Image Zoom Controls
- **Click the 🔍 button** on any image to open the zoom modal
- **Mouse wheel** to zoom in/out
- **Drag** to pan around when zoomed in
- **Touch devices**: Pinch to zoom, drag to pan
- **Keyboard shortcuts**:
  - `+` or `=` to zoom in
  - `-` to zoom out
  - `0` to reset zoom
  - `Escape` to close modal

### Theme Toggle
- Click the 🌙/☀️ button in the header to switch between light and dark themes
- Theme preference is saved in localStorage

### Font Size Toggle
- Click the `Aa` button to cycle through different font sizes
- Font size preference is saved in localStorage

## Customization

### Colors
The template uses CSS custom properties for easy color customization. You can modify the colors in `project-template.css`:

```css
:root {
    --primary-color: #2c2c2c;
    --secondary-color: #6c757d;
    --accent-color: #007bff;
    --background-color: #fafafa;
    --text-color: #2c2c2c;
}
```

### Typography
The template uses Google Fonts:
- **Zilla Slab** for body text and headings
- **Special Elite** for categories and accents

You can change fonts by updating the Google Fonts import and font-family declarations.

### Layout
The template is built with CSS Grid and Flexbox for maximum flexibility. You can adjust:
- Maximum width: `.newspaper-container { max-width: 1200px; }`
- Content width: `.article-section { max-width: 800px; }`
- Spacing: Various padding and margin values

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

1. **Optimize images** before adding them to your project
2. **Use appropriate image formats** (WebP for photos, PNG for graphics)
3. **Set proper alt text** for accessibility
4. **Use lazy loading** (already implemented with `loading="lazy"`)

## Troubleshooting

### Images not zooming
- Make sure the image has the `interactive-image` class
- Ensure the parent has `data-zoom="true"` attribute
- Check that the zoom button is present

### Theme not saving
- Check if localStorage is enabled in your browser
- Clear browser cache and try again

### Mobile touch not working
- Ensure you're using a modern mobile browser
- Check that touch events are not being blocked by other scripts

## License

This template is free to use for personal and commercial projects. Attribution is appreciated but not required.

---

**Happy creating!** 🎉
