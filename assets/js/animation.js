class EntangledLineAnimation {
    constructor() {
        // Validate canvas element
        this.canvas = document.getElementById('canvas');
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        // Validate canvas context
        this.ctx = this.canvas.getContext('2d');
        if (!this.ctx) {
            console.error('Canvas 2D context not available');
            return;
        }
        
        // Animation properties
        this.speed = 1;
        this.time = 0;
        this.bounceMode = true;
        this.isRunning = false;
        this.animationId = null;
        
        // Performance optimization
        this.lastFrameTime = 0;
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;
        
        // Line properties
        this.points = [];
        this.numPoints = 50;
        this.lineWidth = 1;
        this.hue = 120; // HSL hue value (0-360)
        this.saturation = 100; // Fixed saturation (0-100)
        this.lightness = 50; // Fixed lightness (0-100)
        this.glowColor = '#000000'; // Pure black glow
        
        // Device performance detection with error handling
        try {
            this.isMobile = window.innerWidth <= 768;
            this.isLowPerformance = this.isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
        } catch (error) {
            console.warn('Error detecting device performance, using conservative settings:', error);
            this.isMobile = true;
            this.isLowPerformance = true;
        }
        
        // Adjust settings for performance
        if (this.isLowPerformance) {
            this.numPoints = Math.min(this.numPoints, 30);
            this.targetFPS = 30;
            this.frameInterval = 1000 / this.targetFPS;
        }
        
        // Initialize with error handling
        try {
            this.init();
            this.setupControls();
            this.updateSliderColors();
            this.updateButtonColors();
            this.showLoadingState();
            this.startAnimation();
        } catch (error) {
            console.error('Error initializing animation:', error);
            this.showErrorState();
        }
    }
    
    init() {
        try {
            this.resize();
            this.generatePoints();
            this.resizeHandler = this.debounce(() => this.resize(), 250);
            window.addEventListener('resize', this.resizeHandler);
            
            // Handle visibility change for performance
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.stopAnimation();
                } else {
                    this.startAnimation();
                }
            });
        } catch (error) {
            console.error('Error initializing animation:', error);
        }
    }
    
    // Debounce function for performance
    debounce(func, wait) {
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
    
    resize() {
        // Get container dimensions
        const container = this.canvas.parentElement;
        const rect = container.getBoundingClientRect();
        this.width = rect.width;
        this.height = rect.height;
        
        // Set canvas style dimensions
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        
        // Use device pixel ratio for crisp rendering on high-DPI displays
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        this.ctx.scale(dpr, dpr);
    }
    
    generatePoints() {
        this.points = [];
        for (let i = 0; i < this.numPoints; i++) {
            this.points.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 4,
                angle: Math.random() * Math.PI * 2,
                radius: 50 + Math.random() * 100,
                expanding: true // Track if point is moving outward or inward
            });
        }
    }
    
    setupControls() {
        const speedSlider = document.getElementById('speedSlider');
        const pointsSlider = document.getElementById('pointsSlider');
        const hueSlider = document.getElementById('hueSlider');
        
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.speed = parseFloat(e.target.value);
                this.updateSliderProgress(speedSlider);
            });
            this.updateSliderProgress(speedSlider);
        }
        
        if (pointsSlider) {
            pointsSlider.addEventListener('input', (e) => {
                this.numPoints = parseInt(e.target.value);
                this.generatePoints();
                this.updateSliderProgress(pointsSlider);
            });
            this.updateSliderProgress(pointsSlider);
        }
        
        if (hueSlider) {
            hueSlider.addEventListener('input', (e) => {
                this.hue = parseInt(e.target.value);
                this.updateSliderColors();
                this.updateButtonColors();
                this.updateSliderProgress(hueSlider);
            });
            this.updateSliderProgress(hueSlider);
        }
        
        // Initialize slider colors
        this.updateSliderColors();
    }
    
    updatePoints() {
        this.time += 0.01 * this.speed;
        
        this.points.forEach((point, index) => {
            // Update position with unwinding motion
            point.angle += 0.02 * this.speed;
            
            // Calculate center and max radius
            const centerX = this.width / 2;
            const centerY = this.height / 2;
            const maxRadius = Math.min(this.width, this.height) * 0.5; // 50% of screen size
            const minRadius = 10; // Minimum radius from center
            
            if (this.bounceMode) {
                // Bounce mode: reverse direction when reaching boundaries
                if (point.expanding) {
                    point.radius += 0.5 * this.speed;
                    // Check if point has reached the outer boundary
                    if (point.radius >= maxRadius) {
                        point.expanding = false; // Start moving inward
                    }
                } else {
                    point.radius -= 0.5 * this.speed;
                    // Check if point has reached the inner boundary
                    if (point.radius <= minRadius) {
                        point.expanding = true; // Start moving outward
                    }
                }
            } else {
                // Original mode: continuous outward movement
                point.radius += 0.5 * this.speed;
                // Reset radius when it gets too large to prevent overflow
                if (point.radius > maxRadius * 2) {
                    point.radius = minRadius;
                }
            }
            
            // Calculate position using polar coordinates with vertical expansion
            point.x = centerX + Math.cos(point.angle) * point.radius;
            point.y = centerY + Math.sin(point.angle) * point.radius * 1.5; // Vertical stretch factor
            
            // Add some noise for organic movement - more vertical expansion
            point.x += Math.sin(this.time + index * 0.3) * 20;
            point.y += Math.cos(this.time + index * 0.3) * 40; // Increased vertical movement
            
            // Keep points within bounds
            point.x = Math.max(0, Math.min(this.width, point.x));
            point.y = Math.max(0, Math.min(this.height, point.y));
        });
    }
    
    drawLines() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Convert hex colors to RGB for opacity manipulation
        const glowRgb = this.hexToRgb(this.glowColor);
        
        // Draw connections between points
        for (let i = 0; i < this.points.length; i++) {
            for (let j = i + 1; j < this.points.length; j++) {
                const p1 = this.points[i];
                const p2 = this.points[j];
                
                const distance = Math.sqrt(
                    Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
                );
                
                // Only connect nearby points
                if (distance < 100) {
                    const opacity = 1 - (distance / 150);
                    
                    // Draw glow effect
                    this.ctx.strokeStyle = `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${opacity * 0.3})`;
                    this.ctx.lineWidth = this.lineWidth + 4;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                    
                    // Draw main line using HSL
                    this.ctx.strokeStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${opacity})`;
                    this.ctx.lineWidth = this.lineWidth;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw points
        this.points.forEach((point, index) => {
            const pulse = Math.sin(this.time * 2 + index * 0.5) * 0.5 + 0.5;
            
            // Draw point glow
            this.ctx.fillStyle = `rgba(${glowRgb.r}, ${glowRgb.g}, ${glowRgb.b}, ${0.3 * pulse})`;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 8, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw point using HSL
            this.ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${pulse})`;
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    updateSliderProgress(slider) {
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);
        const value = parseFloat(slider.value);
        const progress = ((value - min) / (max - min)) * 100;
        slider.style.setProperty('--slider-progress', `${progress}%`);
    }
    
    updateSliderColors() {
        const speedSlider = document.getElementById('speedSlider');
        const pointsSlider = document.getElementById('pointsSlider');
        const hueSlider = document.getElementById('hueSlider');
        
        // Create the HSL color string
        const hslColor = `hsl(${this.hue}, 100%, 50%)`;
        
        if (speedSlider) {
            speedSlider.style.setProperty('--slider-color', hslColor);
            this.updateSliderProgress(speedSlider);
        }
        
        if (pointsSlider) {
            pointsSlider.style.setProperty('--slider-color', hslColor);
            this.updateSliderProgress(pointsSlider);
        }
        
        if (hueSlider) {
            hueSlider.style.setProperty('--slider-color', hslColor);
            this.updateSliderProgress(hueSlider);
        }
        
        // Also update the CSS custom property for the accent color
        document.documentElement.style.setProperty('--color-accent', hslColor);
    }
    
    updateButtonColors() {
        const projectCards = document.querySelectorAll('project-card');
        projectCards.forEach(card => {
            if (card.updateButtonColor) {
                card.updateButtonColor();
            }
        });
        
        // Also update the projects button color
        const projectsButton = document.querySelector('.projects-button');
        if (projectsButton) {
            const hslColor = `hsl(${this.hue}, 100%, 50%)`;
            projectsButton.style.setProperty('--button-accent-color', hslColor);
        }
    }
    
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 0, g: 255, b: 136 }; // fallback to default green
    }
    
    showLoadingState() {
        try {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '16px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Loading animation...', this.width / 2, this.height / 2);
        } catch (error) {
            console.error('Error showing loading state:', error);
        }
    }
    
    showErrorState() {
        try {
            this.ctx.fillStyle = '#000';
            this.ctx.fillRect(0, 0, this.width, this.height);
            
            this.ctx.fillStyle = '#ff6b6b';
            this.ctx.font = '14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Animation unavailable', this.width / 2, this.height / 2 - 10);
            this.ctx.fillText('Please refresh the page', this.width / 2, this.height / 2 + 10);
        } catch (error) {
            console.error('Error showing error state:', error);
        }
    }
    
    startAnimation() {
        this.isRunning = true;
        this.animate();
    }
    
    stopAnimation() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    animate(currentTime = 0) {
        if (!this.isRunning) return;
        
        try {
            // Throttle frame rate for performance
            if (currentTime - this.lastFrameTime < this.frameInterval) {
                this.animationId = requestAnimationFrame((time) => this.animate(time));
                return;
            }
            
            this.lastFrameTime = currentTime;
            
            this.updatePoints();
            this.drawLines();
            
            this.animationId = requestAnimationFrame((time) => this.animate(time));
        } catch (error) {
            console.error('Error in animation loop:', error);
            this.stopAnimation();
            this.showErrorState();
        }
    }
    
    destroy() {
        this.stopAnimation();
        window.removeEventListener('resize', this.resize);
    }
}

// Initialize the animation when the page loads with error handling
window.addEventListener('load', () => {
    try {
        new EntangledLineAnimation();
    } catch (error) {
        console.error('Failed to initialize animation:', error);
        // Show a fallback message if animation fails completely
        const canvas = document.getElementById('canvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = '#000';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#666';
                ctx.font = '14px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Animation unavailable', canvas.width / 2, canvas.height / 2);
            }
        }
    }
});
