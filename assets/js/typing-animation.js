/**
 * Typing Animation Module
 * Handles typing effects for mark elements and text animations
 */

import { safeExecute, safeExecuteAsync, reportError } from './utils.js';

// Typing animation function with natural variation and error handling
export function typeWriter(element, text, baseSpeed = 60, delay = 0) {
    return new Promise((resolve) => {
        // Validate inputs
        if (!element || !text) {
            console.warn('Invalid inputs for typeWriter:', { element, text });
            resolve();
            return;
        }

        setTimeout(() => {
            let i = 0;
            
            safeExecute(() => {
                element.textContent = '';
                element.classList.add('typing'); // Show cursor when typing starts
            }, null, 'typeWriter initialization');
            
            function type() {
                if (i < text.length) {
                    safeExecute(() => {
                        element.textContent += text.charAt(i);
                        i++;
                    }, null, 'typeWriter character addition');
                    
                    // Add natural variation to typing speed
                    let currentSpeed = baseSpeed;
                    
                    // Slight random variation (±12ms)
                    currentSpeed += (Math.random() - 0.5) * 24;
                    
                    // Slower on punctuation and spaces
                    const char = text.charAt(i - 1);
                    if (char === ' ' || char === ',' || char === '.' || char === '!' || char === '?') {
                        currentSpeed += 40;
                    }
                    
                    // Ensure minimum speed
                    currentSpeed = Math.max(currentSpeed, 30);
                    
                    setTimeout(type, currentSpeed);
                } else {
                    safeExecute(() => {
                        element.classList.remove('typing');
                        element.classList.add('typing-complete');
                    }, null, 'typeWriter completion');
                    resolve();
                }
            }
            
            type();
        }, delay);
    });
}

// Start typing animation for mark tags with error handling
export async function startTypingAnimation() {
    return safeExecuteAsync(async () => {
        const markElements = document.querySelectorAll('.content mark');
        const originalTexts = [];
        
        if (markElements.length === 0) {
            console.warn('No mark elements found for typing animation');
            return;
        }
        
        // Store original text content
        markElements.forEach((mark, index) => {
            originalTexts[index] = mark.textContent;
            safeExecute(() => {
                mark.textContent = '';
            }, null, 'mark element text clearing');
        });
        
        // Type each mark element sequentially
        for (let i = 0; i < markElements.length; i++) {
            try {
                await typeWriter(markElements[i], originalTexts[i], 60, 0);
                // Shorter pause between lines
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (error) {
                reportError(error, `typing animation for mark element ${i}`);
                // Continue with next element even if one fails
                continue;
            }
        }
        
        // Show LinkedIn link after all text is typed
        const linkedinLink = document.querySelector('.content h2 a');
        if (linkedinLink) {
            safeExecute(() => {
                linkedinLink.style.opacity = '1';
            }, null, 'LinkedIn link opacity setting');
        }
    }, null, 'startTypingAnimation');
}
