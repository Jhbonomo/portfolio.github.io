class PatternAnimation {
    constructor() {
        this.canvas = document.getElementById('patternAnimation');
        this.ctx = this.canvas.getContext('2d');
        this.swipeIndicator = document.getElementById('swipeIndicator');
        
        // Animation state
        this.animationState = 'initial'; // 'initial', 'expanding', 'expanded'
        this.blackCoverage = 0.5; // Start with 50% coverage
        this.cursorX = 0;
        this.cursorY = 0;
        this.isAnimating = false;
        this.swipeIndicatorShown = false;
        
        // Configuration
        this.duration = 2000; // 2 seconds for expansion
        this.resetDelay = 3000; // 3 seconds before reset
        this.swipeDistance = 50; // Minimum swipe distance
        this.minCoverage = 0.1; // Minimum coverage on hover
        this.maxCoverage = 1.0; // Maximum coverage on hover
        
        // Swipe indicator timing
        this.swipeMoveDuration = 1500; // 1.5 seconds for swipe movement
        this.swipeFadeDuration = 500; // 0.5 seconds for fade out
        this.swipeRepeatDelay = 1500; // 1.5 seconds before showing again
        
        this.init();
    }
    
    init() {
        if (this.canvas && this.ctx) {
            // Set canvas size
            this.canvas.width = 800;
            this.canvas.height = 400;
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Show swipe indicator immediately
            this.showSwipeIndicator();
            
            // Initial draw
            this.drawAnimation();
        }
    }
    
    setupEventListeners() {
        // Mouse tracking for real-time border position
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.animationState === 'initial') {
                const rect = this.canvas.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const normalizedX = Math.max(0, Math.min(1, mouseX / this.canvas.width));
                
                // Ensure minimum and maximum coverage
                this.blackCoverage = Math.max(this.minCoverage, Math.min(this.maxCoverage, normalizedX));
                this.drawAnimation();
            }
        });
        
        // Click to expand
        this.canvas.addEventListener('click', () => {
            this.animateExpansion();
        });
        
        // Touch/swipe support
        let touchStartX = 0;
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchStartX = e.touches[0].clientX;
        });
        
        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            const touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchEndX - touchStartX;
            
            if (Math.abs(swipeDistance) > this.swipeDistance) {
                this.animateExpansion();
            }
        });
    }
    
    drawAnimation() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw black rectangle
        const blackWidth = this.canvas.width * this.blackCoverage;
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, blackWidth, this.canvas.height);
        
        // Draw text
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 32px Zilla Slab, Georgia, serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        const fullText = 'Provide patterns to uncover';
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        // Draw text with clipping to show only visible part
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(0, 0, blackWidth, this.canvas.height);
        this.ctx.clip();
        this.ctx.fillText(fullText, centerX, centerY);
        this.ctx.restore();
    }
    
    animateExpansion() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.animationState = 'expanding';
        
        const startTime = Date.now();
        const startCoverage = 0.5;
        const endCoverage = 1.0;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / this.duration, 1);
            
            // Easing function for smooth animation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            
            this.blackCoverage = startCoverage + (endCoverage - startCoverage) * easeProgress;
            
            // Animate cursor position
            this.cursorX = 100 + (this.canvas.width - 200) * easeProgress;
            this.cursorY = this.canvas.height / 2;
            
            this.drawAnimation();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.animationState = 'expanded';
                this.isAnimating = false;
                
                // Reset after delay
                setTimeout(() => {
                    this.blackCoverage = 0.5;
                    this.animationState = 'initial';
                    this.drawAnimation();
                }, this.resetDelay);
            }
        };
        
        animate();
    }
    
    showSwipeIndicator() {
        if (this.swipeIndicator && !this.swipeIndicatorShown) {
            this.swipeIndicatorShown = true;
            this.swipeIndicator.style.opacity = '1';
            this.swipeIndicator.style.transform = 'translateX(-50%) translateX(0)';
            
            // Start the swipe animation immediately
            setTimeout(() => {
                this.animateSwipeIndicator();
            }, 100);
        }
    }
    
    animateSwipeIndicator() {
        if (!this.swipeIndicator) return;
        
        // Move from center to 150px to the right
        this.swipeIndicator.style.transition = `all ${this.swipeMoveDuration}ms ease-in-out`;
        this.swipeIndicator.style.transform = 'translateX(-50%) translateX(150px)';
        
        // Fade out after movement
        setTimeout(() => {
            this.swipeIndicator.style.opacity = '0';
            this.swipeIndicator.style.transform = 'translateX(-50%) translateX(200px)';
            
            // Reset after fade out
            setTimeout(() => {
                this.swipeIndicator.style.transition = 'none';
                this.swipeIndicator.style.transform = 'translateX(-50%) translateX(-50px)';
                this.swipeIndicator.style.opacity = '0';
                this.swipeIndicatorShown = false;
                
                // Show again after delay
                setTimeout(() => {
                    this.showSwipeIndicator();
                }, this.swipeRepeatDelay);
            }, this.swipeFadeDuration);
        }, this.swipeMoveDuration);
    }
    
    // Configuration methods for easy customization
    setDuration(duration) {
        this.duration = duration;
    }
    
    setResetDelay(delay) {
        this.resetDelay = delay;
    }
    
    setSwipeDistance(distance) {
        this.swipeDistance = distance;
    }
    
    setCoverageLimits(min, max) {
        this.minCoverage = min;
        this.maxCoverage = max;
    }
    
    setSwipeTiming(moveDuration, fadeDuration, repeatDelay) {
        this.swipeMoveDuration = moveDuration;
        this.swipeFadeDuration = fadeDuration;
        this.swipeRepeatDelay = repeatDelay;
    }
}

// Initialize the animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new PatternAnimation();
});
