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
        
        // Touch events
        this.modalImage.addEventListener('touchstart', (e) => this.startPan(e));
        document.addEventListener('touchmove', (e) => this.pan(e));
        document.addEventListener('touchend', () => this.endPan());
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
