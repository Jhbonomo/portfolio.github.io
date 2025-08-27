// ==========================================================================
// PROJECT TEMPLATE JAVASCRIPT
// ==========================================================================

class ProjectTemplate {
    constructor() {
        this.currentZoom = 1;
        this.pageZoom = 1;
        this.isDragging = false;
        this.dragStart = { x: 0, y: 0 };
        this.dragOffset = { x: 0, y: 0 };
        this.fontSize = 1;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupImageZoom();
        this.setupThemeToggle();
        this.setupFontSizeToggle();
        this.loadSavedPreferences();
    }

    setupEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
            
            // Page zoom shortcuts (Ctrl/Cmd + Plus/Minus/0)
            if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
                e.preventDefault();
                this.pageZoomIn();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === '-') {
                e.preventDefault();
                this.pageZoomOut();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === '0') {
                e.preventDefault();
                this.pageZoomReset();
            }
            
            // Modal image zoom shortcuts (only when modal is open)
            if (this.isModalOpen()) {
                if (e.key === '+' || e.key === '=') {
                    e.preventDefault();
                    this.zoomIn();
                }
                if (e.key === '-') {
                    e.preventDefault();
                    this.zoomOut();
                }
                if (e.key === '0') {
                    e.preventDefault();
                    this.resetZoom();
                }
            }
        });

        // Mouse wheel zoom in modal
        document.addEventListener('wheel', (e) => {
            if (this.isModalOpen()) {
                e.preventDefault();
                if (e.deltaY < 0) {
                    this.zoomIn();
                } else {
                    this.zoomOut();
                }
            }
        });

        // Touch events for mobile
        this.setupTouchEvents();
        
        // Mobile before/after functionality
        this.setupMobileBeforeAfter();
    }

    setupImageZoom() {
        // Setup zoom buttons for all interactive images
        const zoomButtons = document.querySelectorAll('.zoom-btn');
        zoomButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const imageWrapper = btn.closest('.image-wrapper');
                const image = imageWrapper.querySelector('.interactive-image');
                this.openModal(image.src, image.alt);
            });
        });

        // Setup click events for entire image wrappers
        const imageWrappers = document.querySelectorAll('.image-wrapper[data-zoom="true"]');
        imageWrappers.forEach(wrapper => {
            wrapper.addEventListener('click', (e) => {
                // Don't trigger if clicking on the zoom button (it has its own handler)
                if (e.target.classList.contains('zoom-btn') || e.target.closest('.zoom-btn')) {
                    return;
                }
                
                const image = wrapper.querySelector('.interactive-image');
                if (image) {
                    this.openModal(image.src, image.alt);
                }
            });
        });

        // Setup modal controls
        const modalClose = document.getElementById('modalClose');
        const zoomIn = document.getElementById('zoomIn');
        const zoomOut = document.getElementById('zoomOut');
        const resetZoom = document.getElementById('resetZoom');

        modalClose.addEventListener('click', () => this.closeModal());
        zoomIn.addEventListener('click', () => this.zoomIn());
        zoomOut.addEventListener('click', () => this.zoomOut());
        resetZoom.addEventListener('click', () => this.resetZoom());

        // Close modal when clicking outside
        const modal = document.getElementById('imageModal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
    }

    setupTouchEvents() {
        const modalImage = document.getElementById('modalImage');
        
        // Touch events for panning
        let touchStartX = 0;
        let touchStartY = 0;
        let initialTransformX = 0;
        let initialTransformY = 0;

        modalImage.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
                
                const transform = this.getTransformValues(modalImage);
                initialTransformX = transform.x;
                initialTransformY = transform.y;
                
                this.isDragging = true;
            }
        });

        modalImage.addEventListener('touchmove', (e) => {
            if (this.isDragging && e.touches.length === 1) {
                e.preventDefault();
                const touch = e.touches[0];
                const deltaX = touch.clientX - touchStartX;
                const deltaY = touch.clientY - touchStartY;
                
                const newX = initialTransformX + deltaX;
                const newY = initialTransformY + deltaY;
                
                this.setImageTransform(modalImage, this.currentZoom, newX, newY);
            }
        });

        modalImage.addEventListener('touchend', () => {
            this.isDragging = false;
        });

        // Pinch to zoom
        let initialDistance = 0;
        let initialZoom = 1;

        modalImage.addEventListener('touchstart', (e) => {
            if (e.touches.length === 2) {
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                initialDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
                initialZoom = this.currentZoom;
            }
        });

        modalImage.addEventListener('touchmove', (e) => {
            if (e.touches.length === 2) {
                e.preventDefault();
                const touch1 = e.touches[0];
                const touch2 = e.touches[1];
                const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
                
                const scale = currentDistance / initialDistance;
                const newZoom = Math.max(0.5, Math.min(5, initialZoom * scale));
                
                this.currentZoom = newZoom;
                this.setImageTransform(modalImage, newZoom, 0, 0);
            }
        });
    }

    setupMobileBeforeAfter() {
        const mobileBeforeAfter = document.getElementById('mobileBeforeAfter');
        if (!mobileBeforeAfter) {
            console.log('Mobile before/after element not found');
            return;
        }

        console.log('Mobile before/after element found, setting up single transition');
        let isActive = false;
        let hasTransitioned = false;
        let transitionTimeout;

        // Single transition from before to after
        const performSingleTransition = () => {
            if (!hasTransitioned) {
                isActive = true;
                mobileBeforeAfter.classList.add('active');
                hasTransitioned = true;
                console.log('Transitioned to AFTER image');
                
                // Show restart arrow after transition
                showRestartArrow();
            }
        };

        // Show restart arrow
        const showRestartArrow = () => {
            const restartArrow = document.createElement('div');
            restartArrow.className = 'restart-arrow';
            restartArrow.innerHTML = '↻';
            restartArrow.title = 'Restart animation';
            restartArrow.addEventListener('click', restartAnimation);
            mobileBeforeAfter.appendChild(restartArrow);
        };

        // Restart animation
        const restartAnimation = () => {
            // Remove restart arrow
            const existingArrow = mobileBeforeAfter.querySelector('.restart-arrow');
            if (existingArrow) {
                existingArrow.remove();
            }
            
            // Reset state
            isActive = false;
            hasTransitioned = false;
            mobileBeforeAfter.classList.remove('active');
            
            // Start new transition after a short delay
            setTimeout(performSingleTransition, 1000);
        };

        // Start transition after 2 seconds
        transitionTimeout = setTimeout(performSingleTransition, 2000);

        // Pause on hover/touch (for desktop testing)
        mobileBeforeAfter.addEventListener('mouseenter', () => {
            if (transitionTimeout) {
                clearTimeout(transitionTimeout);
            }
        });
        
        mobileBeforeAfter.addEventListener('mouseleave', () => {
            if (!hasTransitioned) {
                transitionTimeout = setTimeout(performSingleTransition, 1000);
            }
        });
        
        // Pause on touch for mobile
        mobileBeforeAfter.addEventListener('touchstart', () => {
            if (transitionTimeout) {
                clearTimeout(transitionTimeout);
            }
            // Resume after 1 second if not already transitioned
            if (!hasTransitioned) {
                transitionTimeout = setTimeout(performSingleTransition, 1000);
            }
        });

        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            if (transitionTimeout) {
                clearTimeout(transitionTimeout);
            }
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        themeToggle.addEventListener('click', () => {
            const body = document.body;
            const isDark = body.classList.contains('dark-theme');
            
            if (isDark) {
                body.classList.remove('dark-theme');
                themeToggle.textContent = '🌙';
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.add('dark-theme');
                themeToggle.textContent = '☀️';
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    setupFontSizeToggle() {
        const fontSizeBtn = document.getElementById('fontSizeBtn');
        fontSizeBtn.addEventListener('click', () => {
            const sizes = [1, 1.2, 1.4, 1.6, 1.8, 2];
            const currentIndex = sizes.indexOf(this.fontSize);
            const nextIndex = (currentIndex + 1) % sizes.length;
            this.fontSize = sizes[nextIndex];
            
            document.documentElement.style.fontSize = `${16 * this.fontSize}px`;
            localStorage.setItem('fontSize', this.fontSize);
            
            // Update button text
            fontSizeBtn.textContent = `Aa${Math.round(this.fontSize * 10) / 10}`;
        });
    }

    loadSavedPreferences() {
        // Load theme preference
        const savedTheme = localStorage.getItem('theme');
        const themeToggle = document.getElementById('themeToggle');
        
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeToggle.textContent = '☀️';
        }
        
        // Load font size preference
        const savedFontSize = localStorage.getItem('fontSize');
        const fontSizeBtn = document.getElementById('fontSizeBtn');
        
        if (savedFontSize) {
            this.fontSize = parseFloat(savedFontSize);
            document.documentElement.style.fontSize = `${16 * this.fontSize}px`;
            fontSizeBtn.textContent = `Aa${Math.round(this.fontSize * 10) / 10}`;
        }
    }

    openModal(imageSrc, imageAlt) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        
        modalImage.src = imageSrc;
        modalImage.alt = imageAlt;
        
        // Reset zoom and position
        this.currentZoom = 1;
        this.dragOffset = { x: 0, y: 0 };
        this.setImageTransform(modalImage, 1, 0, 0);
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Focus trap for accessibility
        modal.focus();
    }

    closeModal() {
        const modal = document.getElementById('imageModal');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        
        // Reset zoom and position
        this.currentZoom = 1;
        this.dragOffset = { x: 0, y: 0 };
    }

    isModalOpen() {
        const modal = document.getElementById('imageModal');
        return modal.style.display === 'block';
    }

    zoomIn() {
        if (this.isModalOpen()) {
            this.currentZoom = Math.min(5, this.currentZoom + 0.25);
            this.updateModalImage();
        }
    }

    zoomOut() {
        if (this.isModalOpen()) {
            this.currentZoom = Math.max(0.5, this.currentZoom - 0.25);
            this.updateModalImage();
        }
    }

    resetZoom() {
        if (this.isModalOpen()) {
            this.currentZoom = 1;
            this.dragOffset = { x: 0, y: 0 };
            this.updateModalImage();
        }
    }

    // Page zoom methods
    pageZoomIn() {
        this.pageZoom = Math.min(2.0, this.pageZoom + 0.1);
        this.applyPageZoom();
        this.showZoomIndicator();
    }

    pageZoomOut() {
        this.pageZoom = Math.max(0.5, this.pageZoom - 0.1);
        this.applyPageZoom();
        this.showZoomIndicator();
    }

    pageZoomReset() {
        this.pageZoom = 1;
        this.applyPageZoom();
        this.showZoomIndicator();
    }

    applyPageZoom() {
        const container = document.querySelector('.newspaper-container');
        if (container) {
            container.style.transform = `scale(${this.pageZoom})`;
            container.style.transformOrigin = 'top center';
            container.style.transition = 'transform 0.3s ease';
        }
    }

    showZoomIndicator() {
        let indicator = document.getElementById('pageZoomIndicator');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'pageZoomIndicator';
            indicator.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                font-size: 14px;
                font-family: 'Zilla Slab', Georgia, serif;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
            `;
            document.body.appendChild(indicator);
        }
        
        indicator.textContent = `Page Zoom: ${Math.round(this.pageZoom * 100)}%`;
        indicator.style.opacity = '1';
        
        // Hide indicator after 2 seconds
        setTimeout(() => {
            indicator.style.opacity = '0';
        }, 2000);
    }

    updateModalImage() {
        const modalImage = document.getElementById('modalImage');
        this.setImageTransform(modalImage, this.currentZoom, this.dragOffset.x, this.dragOffset.y);
    }

    setImageTransform(element, scale, x, y) {
        element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    }

    getTransformValues(element) {
        const transform = element.style.transform;
        const match = transform.match(/translate\(([^,]+),\s*([^)]+)\)\s*scale\(([^)]+)\)/);
        
        if (match) {
            return {
                x: parseFloat(match[1]),
                y: parseFloat(match[2]),
                scale: parseFloat(match[3])
            };
        }
        
        return { x: 0, y: 0, scale: 1 };
    }

    // Mouse drag functionality for desktop
    setupMouseDrag() {
        const modalImage = document.getElementById('modalImage');
        
        modalImage.addEventListener('mousedown', (e) => {
            if (this.currentZoom > 1) {
                this.isDragging = true;
                this.dragStart = { x: e.clientX, y: e.clientY };
                modalImage.style.cursor = 'grabbing';
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const deltaX = e.clientX - this.dragStart.x;
                const deltaY = e.clientY - this.dragStart.y;
                
                this.dragOffset.x += deltaX;
                this.dragOffset.y += deltaY;
                
                this.dragStart = { x: e.clientX, y: e.clientY };
                this.updateModalImage();
            }
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
            modalImage.style.cursor = 'grab';
        });
    }
}

// ==========================================================================
// UTILITY FUNCTIONS
// ==========================================================================

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Progress bar for reading
function setupReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #007bff, #0056b3);
        z-index: 1000;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// ==========================================================================
// INITIALIZATION
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the project template
    const projectTemplate = new ProjectTemplate();
    
    // Setup additional features
    setupSmoothScrolling();
    setupLazyLoading();
    setupReadingProgress();
    
    // Setup mouse drag after modal is created
    projectTemplate.setupMouseDrag();
    
    // Add loading animation
    document.body.classList.add('loaded');
});

// ==========================================================================
// PERFORMANCE OPTIMIZATIONS
// ==========================================================================

// Debounce function for scroll events
function debounce(func, wait) {
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

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll events
window.addEventListener('scroll', throttle(() => {
    // Any scroll-based functionality can go here
}, 16)); // ~60fps

// Optimize resize events
window.addEventListener('resize', debounce(() => {
    // Any resize-based functionality can go here
}, 250));
