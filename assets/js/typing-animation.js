/**
 * Typing Animation Module
 * Handles typing effects for mark elements and text animations
 */

// Typing animation function with natural variation
export function typeWriter(element, text, baseSpeed = 60, delay = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let i = 0;
            element.textContent = '';
            element.classList.add('typing'); // Show cursor when typing starts
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    
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
                    element.classList.remove('typing');
                    element.classList.add('typing-complete');
                    resolve();
                }
            }
            
            type();
        }, delay);
    });
}

// Start typing animation for mark tags
export async function startTypingAnimation() {
    const markElements = document.querySelectorAll('.content mark');
    const originalTexts = [];
    
    // Store original text content
    markElements.forEach((mark, index) => {
        originalTexts[index] = mark.textContent;
        mark.textContent = '';
    });
    
    // Type each mark element sequentially
    for (let i = 0; i < markElements.length; i++) {
        await typeWriter(markElements[i], originalTexts[i], 60, 0);
        // Shorter pause between lines
        await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    // Show LinkedIn link after all text is typed
    const linkedinLink = document.querySelector('.content h2 a');
    if (linkedinLink) {
        linkedinLink.style.opacity = '1';
    }
}
