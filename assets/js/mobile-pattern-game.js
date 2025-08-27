class MobilePatternGame {
    constructor() {
        this.gameDot = document.getElementById('gameDot');
        this.gameTarget = document.getElementById('gameTarget');
        this.gameArea = document.querySelector('.game-area');
        this.patternSwitch = document.getElementById('patternSwitch');
        
        this.isBroken = false;
        this.dotX = 50; // Start at center
        this.dotY = 50;
        this.stepSize = 5;
        this.isMobile = window.innerWidth <= 768;
        
        this.init();
    }
    
    init() {
        if (this.gameDot && this.gameArea && this.isMobile) {
            this.setupMobileControls();
            this.setupSwitchListener();
            this.initializePositions();
            this.updateDotPosition();
        }
    }
    
    setupMobileControls() {
        let startX, startY;
        
        this.gameArea.addEventListener('touchstart', (e) => {
            e.preventDefault();
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        this.gameArea.addEventListener('touchend', (e) => {
            e.preventDefault();
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            
            // Minimum swipe distance to trigger movement
            const minSwipeDistance = 30;
            const swipeDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (swipeDistance > minSwipeDistance) {
                if (this.isBroken) {
                    this.brokenMove(deltaX, deltaY);
                } else {
                    this.normalMove(deltaX, deltaY);
                }
            }
        });
    }
    
    setupSwitchListener() {
        if (this.patternSwitch) {
            this.patternSwitch.addEventListener('change', (e) => {
                this.isBroken = e.target.checked;
                this.updateInstructions();
            });
        }
    }
    
    normalMove(deltaX, deltaY) {
        // Normal swipe-to-move behavior
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal movement
            if (deltaX > 0) {
                this.dotX = Math.min(95, this.dotX + this.stepSize);
            } else {
                this.dotX = Math.max(5, this.dotX - this.stepSize);
            }
        } else {
            // Vertical movement
            if (deltaY > 0) {
                this.dotY = Math.min(95, this.dotY + this.stepSize);
            } else {
                this.dotY = Math.max(5, this.dotY - this.stepSize);
            }
        }
        
        this.updateDotPosition();
        this.checkWin();
    }
    
    brokenMove(deltaX, deltaY) {
        // Randomly choose from different broken behaviors
        const behaviors = [
            () => this.randomDirection(),
            () => this.invertedDirection(deltaX, deltaY),
            () => this.delayedRandomMove(),
            () => this.locationBasedMove(deltaX, deltaY),
            () => this.diagonalMove(deltaX, deltaY)
        ];
        
        const randomBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
        randomBehavior();
    }
    
    randomDirection() {
        const directions = [
            () => { this.dotX = Math.min(95, this.dotX + this.stepSize); }, // right
            () => { this.dotX = Math.max(5, this.dotX - this.stepSize); },  // left
            () => { this.dotY = Math.min(95, this.dotY + this.stepSize); }, // down
            () => { this.dotY = Math.max(5, this.dotY - this.stepSize); }   // up
        ];
        
        const randomDir = directions[Math.floor(Math.random() * directions.length)];
        randomDir();
        this.updateDotPosition();
        this.checkWin();
    }
    
    invertedDirection(deltaX, deltaY) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Inverted horizontal
            if (deltaX > 0) {
                this.dotX = Math.max(5, this.dotX - this.stepSize); // Swipe right = move left
            } else {
                this.dotX = Math.min(95, this.dotX + this.stepSize); // Swipe left = move right
            }
        } else {
            // Inverted vertical
            if (deltaY > 0) {
                this.dotY = Math.max(5, this.dotY - this.stepSize); // Swipe down = move up
            } else {
                this.dotY = Math.min(95, this.dotY + this.stepSize); // Swipe up = move down
            }
        }
        
        this.updateDotPosition();
        this.checkWin();
    }
    
    delayedRandomMove() {
        setTimeout(() => {
            this.randomDirection();
        }, Math.random() * 300 + 100);
    }
    
    locationBasedMove(deltaX, deltaY) {
        // Move based on absolute position, not direction
        const rect = this.gameArea.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Use the start position to determine movement
        if (Math.abs(deltaX) > centerX) {
            this.dotX = Math.max(5, this.dotX - this.stepSize);
        } else {
            this.dotX = Math.min(95, this.dotX + this.stepSize);
        }
        
        if (Math.abs(deltaY) > centerY) {
            this.dotY = Math.max(5, this.dotY - this.stepSize);
        } else {
            this.dotY = Math.min(95, this.dotY + this.stepSize);
        }
        
        this.updateDotPosition();
        this.checkWin();
    }
    
    diagonalMove(deltaX, deltaY) {
        // Move diagonally regardless of swipe direction
        const diagonalDirections = [
            () => { // Top-left
                this.dotX = Math.max(5, this.dotX - this.stepSize);
                this.dotY = Math.max(5, this.dotY - this.stepSize);
            },
            () => { // Top-right
                this.dotX = Math.min(95, this.dotX + this.stepSize);
                this.dotY = Math.max(5, this.dotY - this.stepSize);
            },
            () => { // Bottom-left
                this.dotX = Math.max(5, this.dotX - this.stepSize);
                this.dotY = Math.min(95, this.dotY + this.stepSize);
            },
            () => { // Bottom-right
                this.dotX = Math.min(95, this.dotX + this.stepSize);
                this.dotY = Math.min(95, this.dotY + this.stepSize);
            }
        ];
        
        const randomDiagonal = diagonalDirections[Math.floor(Math.random() * diagonalDirections.length)];
        randomDiagonal();
        this.updateDotPosition();
        this.checkWin();
    }
    
    updateDotPosition() {
        if (this.gameDot) {
            this.gameDot.style.left = this.dotX + '%';
            this.gameDot.style.top = this.dotY + '%';
        }
    }
    
    initializePositions() {
        // Set target to random position
        const targetX = Math.floor(Math.random() * 60) + 20; // 20-80%
        const targetY = Math.floor(Math.random() * 60) + 20; // 20-80%
        
        if (this.gameTarget) {
            this.gameTarget.style.left = targetX + '%';
            this.gameTarget.style.top = targetY + '%';
        }
        
        // Set dot to position away from target
        const safeX = targetX > 50 ? 20 : 80;
        const safeY = targetY > 50 ? 20 : 80;
        
        this.dotX = safeX;
        this.dotY = safeY;
    }
    
    checkWin() {
        if (!this.gameTarget || !this.gameDot) return;
        
        const targetRect = this.gameTarget.getBoundingClientRect();
        const dotRect = this.gameDot.getBoundingClientRect();
        
        const distance = Math.sqrt(
            Math.pow(dotRect.left - targetRect.left, 2) + 
            Math.pow(dotRect.top - targetRect.top, 2)
        );
        
        if (distance < 30) {
            setTimeout(() => {
                if (this.isBroken) {
                    alert('🎉 You reached the target! But notice how confusing the random controls were...');
                } else {
                    alert('🎉 Perfect! Clear patterns make it easy to reach your goal.');
                }
                
                // Reset positions
                this.initializePositions();
                this.updateDotPosition();
            }, 100);
        }
    }
    
    updateInstructions() {
        const instructions = document.querySelector('.game-instructions p');
        if (instructions) {
            if (this.isBroken) {
                instructions.textContent = 'Swipe to move the dot (controls are broken):';
            } else {
                instructions.textContent = 'Swipe to move the dot to the target:';
            }
        }
    }
}

// Initialize mobile game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on mobile devices
    if (window.innerWidth <= 768) {
        new MobilePatternGame();
    }
});
