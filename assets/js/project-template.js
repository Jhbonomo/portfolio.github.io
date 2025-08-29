/**
 * Project Template JavaScript
 * Handles image zoom functionality and modal interactions
 */

class ImageZoomModal {
    constructor() {
        this.modal = document.getElementById('imageModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalClose = document.getElementById('modalClose');
        this.zoomInBtn = document.getElementById('zoomIn');
        this.zoomOutBtn = document.getElementById('zoomOut');
        this.resetZoomBtn = document.getElementById('resetZoom');
        
        this.currentScale = 1;
        this.minScale = 0.5;
        this.maxScale = 3;
        this.scaleStep = 0.25;
        
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.translateX = 0;
        this.translateY = 0;
        
        // Pinch-to-zoom variables
        this.initialDistance = 0;
        this.initialScale = 1;
        this.isPinching = false;
        this.lastTouchDistance = 0;
        
        this.init();
    }
    
    init() {
        // Initialize zoom buttons
        this.setupZoomButtons();
        
        // Initialize image click handlers
        this.setupImageHandlers();
        
        // Initialize modal close handlers
        this.setupModalHandlers();
        
        // Initialize keyboard handlers
        this.setupKeyboardHandlers();
        
        // Initialize touch/mouse handlers for panning
        this.setupPanHandlers();
    }
    
    setupZoomButtons() {
        if (this.zoomInBtn) {
            this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        }
        
        if (this.zoomOutBtn) {
            this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        }
        
        if (this.resetZoomBtn) {
            this.resetZoomBtn.addEventListener('click', () => this.resetZoom());
        }
    }
    
    setupImageHandlers() {
        // Handle clicks on images with data-zoom="true"
        document.addEventListener('click', (e) => {
            const imageWrapper = e.target.closest('.image-wrapper[data-zoom="true"]');
            if (imageWrapper) {
                const img = imageWrapper.querySelector('.interactive-image');
                if (img) {
                    this.openModal(img.src, img.alt);
                }
            }
            
            // Handle zoom button clicks
            const zoomBtn = e.target.closest('.zoom-btn');
            if (zoomBtn) {
                const imageWrapper = zoomBtn.closest('.image-wrapper[data-zoom="true"]');
                if (imageWrapper) {
                    const img = imageWrapper.querySelector('.interactive-image');
                    if (img) {
                        this.openModal(img.src, img.alt);
                    }
                }
            }
        });
    }
    
    setupModalHandlers() {
        if (this.modalClose) {
            this.modalClose.addEventListener('click', () => this.closeModal());
        }
        
        if (this.modal) {
            // Close modal when clicking outside the image
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }
    }
    
    setupKeyboardHandlers() {
        document.addEventListener('keydown', (e) => {
            if (!this.modal || this.modal.style.display === 'none') return;
            
            switch (e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case '+':
                case '=':
                    e.preventDefault();
                    this.zoomIn();
                    break;
                case '-':
                    e.preventDefault();
                    this.zoomOut();
                    break;
                case '0':
                    e.preventDefault();
                    this.resetZoom();
                    break;
            }
        });
    }
    
    setupPanHandlers() {
        if (!this.modalImage) return;
        
        // Mouse events
        this.modalImage.addEventListener('mousedown', (e) => this.startPan(e));
        document.addEventListener('mousemove', (e) => this.pan(e));
        document.addEventListener('mouseup', () => this.endPan());
        
        // Touch events with pinch-to-zoom
        this.modalImage.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        document.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        document.addEventListener('touchend', (e) => this.handleTouchEnd(e));
    }
    
    startPan(e) {
        this.isDragging = true;
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        this.startX = clientX - this.translateX;
        this.startY = clientY - this.translateY;
        
        e.preventDefault();
    }
    
    pan(e) {
        if (!this.isDragging) return;
        
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        
        this.translateX = clientX - this.startX;
        this.translateY = clientY - this.startY;
        
        this.updateImageTransform();
        e.preventDefault();
    }
    
    endPan() {
        this.isDragging = false;
    }
    
    // Calculate distance between two touch points
    getTouchDistance(touches) {
        if (touches.length < 2) return 0;
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    // Calculate center point between two touches
    getTouchCenter(touches) {
        if (touches.length < 2) return { x: 0, y: 0 };
        return {
            x: (touches[0].clientX + touches[1].clientX) / 2,
            y: (touches[0].clientY + touches[1].clientY) / 2
        };
    }
    
    handleTouchStart(e) {
        e.preventDefault();
        
        if (e.touches.length === 1) {
            // Single touch - start panning
            this.isDragging = true;
            this.isPinching = false;
            const touch = e.touches[0];
            this.startX = touch.clientX - this.translateX;
            this.startY = touch.clientY - this.translateY;
        } else if (e.touches.length === 2) {
            // Two touches - start pinch-to-zoom
            this.isDragging = false;
            this.isPinching = true;
            this.initialDistance = this.getTouchDistance(e.touches);
            this.initialScale = this.currentScale;
            this.lastTouchDistance = this.initialDistance;
        }
    }
    
    handleTouchMove(e) {
        e.preventDefault();
        
        if (e.touches.length === 1 && this.isDragging) {
            // Single touch - continue panning
            const touch = e.touches[0];
            this.translateX = touch.clientX - this.startX;
            this.translateY = touch.clientY - this.startY;
            this.updateImageTransform();
        } else if (e.touches.length === 2 && this.isPinching) {
            // Two touches - handle pinch-to-zoom
            const currentDistance = this.getTouchDistance(e.touches);
            const center = this.getTouchCenter(e.touches);
            
            if (this.initialDistance > 0) {
                const scale = currentDistance / this.initialDistance;
                const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.initialScale * scale));
                
                // Calculate zoom center offset
                const scaleChange = newScale / this.currentScale;
                const rect = this.modalImage.getBoundingClientRect();
                const centerX = center.x - rect.left;
                const centerY = center.y - rect.top;
                
                this.translateX = centerX - (centerX - this.translateX) * scaleChange;
                this.translateY = centerY - (centerY - this.translateY) * scaleChange;
                
                this.currentScale = newScale;
                this.updateImageTransform();
            }
        }
    }
    
    handleTouchEnd(e) {
        this.isDragging = false;
        this.isPinching = false;
        this.initialDistance = 0;
    }
    
    openModal(src, alt) {
        if (!this.modal || !this.modalImage) return;
        
        this.modalImage.src = src;
        this.modalImage.alt = alt;
        this.modal.style.display = 'block';
        
        // Reset zoom and position
        this.resetZoom();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        if (!this.modal) return;
        
        this.modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    zoomIn() {
        this.currentScale = Math.min(this.currentScale + this.scaleStep, this.maxScale);
        this.updateImageTransform();
    }
    
    zoomOut() {
        this.currentScale = Math.max(this.currentScale - this.scaleStep, this.minScale);
        this.updateImageTransform();
    }
    
    resetZoom() {
        this.currentScale = 1;
        this.translateX = 0;
        this.translateY = 0;
        this.updateImageTransform();
    }
    
    updateImageTransform() {
        if (!this.modalImage) return;
        
        this.modalImage.style.transform = `translate(${this.translateX}px, ${this.translateY}px) scale(${this.currentScale})`;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ImageZoomModal();
    });
} else {
    new ImageZoomModal();
}
