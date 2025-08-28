// Mindmap Animation Controller
class MindmapAnimation {
    constructor() {
        this.isAnimating = false;
        this.isVisible = false;
        this.hasAnimated = false; // Track if animation has already run
        this.init();
    }

    init() {
        this.createMindmap();
        this.bindEvents();
        this.startAnimation();
    }

    createMindmap() {
        const container = document.querySelector('.mindmap-animation');
        if (!container) return;

                 const mindmapData = [
             {
                 category: 'Sheets',
                 icon: '📊',
                 items: [
                     { text: '2025 - High priority officials', color: 'sheets-blue' },
                     { text: '2025 - Legislative Outreach', color: 'sheets-green' },
                     { text: '2024 - PMC contributions', color: 'sheets-orange' },
                     { text: '2024 - Team tasks', color: 'sheets-purple' }
                 ]
             },
             {
                 category: 'Dashboards',
                 icon: '📈',
                 items: [
                     { text: '2024 - Compliance Overview', color: 'dashboards-yellow' },
                     { text: '2025 - Policy Engagement Metrics', color: 'dashboards-blue-purple' }
                 ]
             },
             {
                 category: 'Brief builder',
                 icon: '🎯',
                 items: [
                     { text: '2024 - FEC Yearly Summary', color: 'briefs-pink' },
                     { text: '2025 - FEC Yearly Summary', color: 'briefs-cyan' },
                     { text: '2025 - Legislative Impact', color: 'briefs-red' }
                 ]
             }
         ];

                          container.innerHTML = `
             <div class="feature-driven">
                 ${mindmapData.map((category, index) => `
                     <div class="mindmap-item" data-category="${index}">
                         <div class="mindmap-category">
                             <h4 class="mindmap-title">${category.category}</h4>
                         </div>
                         <div class="mindmap-items">
                             ${category.items.map((item, itemIndex) => `
                                 <div class="mindmap-tag ${item.color}" data-item="${itemIndex}">
                                     ${category.category === 'Sheets' ? '<i class="fas fa-table mindmap-icon-small"></i>' : 
                                       category.category === 'Dashboards' ? '<i class="fas fa-chart-line mindmap-icon-small"></i>' : 
                                       category.category === 'Brief builder' ? '<i class="fas fa-file-lines mindmap-icon-small"></i>' :
                                       '<div class="mindmap-checkbox"></div>'}
                                     ${item.text}
                                 </div>
                             `).join('')}
                         </div>
                     </div>
                 `).join('')}
             </div>
             <div class="user-driven">
                 <div class="mindmap-category">
                     <h4 class="mindmap-title user-driven-title">2025 Team X reports</h4>
                 </div>
             </div>
         `;

        
    }

         bindEvents() {
         // Auto-play when element comes into view
         this.setupIntersectionObserver();
     }

    setupIntersectionObserver() {
        const container = document.querySelector('.mindmap-container');
        if (!container) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isVisible && !this.hasAnimated) {
                    this.isVisible = true;
                    this.hasAnimated = true; // Mark as animated to prevent re-running
                    // Auto-start animation after a short delay
                    setTimeout(() => {
                        if (!this.isAnimating) {
                            this.startAnimation();
                        }
                    }, 500);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(container);
    }

         startAnimation() {
         if (this.isAnimating) return;
         
         this.isAnimating = true;

         // Reset first
         this.resetAnimation();

         // Animate categories
         const categories = document.querySelectorAll('.mindmap-item');
         categories.forEach((category, index) => {
             setTimeout(() => {
                 category.classList.add('visible');
                 
                 // Animate items within this category
                 const items = category.querySelectorAll('.mindmap-tag');
                 items.forEach((item, itemIndex) => {
                     setTimeout(() => {
                         item.classList.add('visible');
                     }, (itemIndex + 1) * 200);
                 });
             }, index * 400);
         });

         // Animation complete
         setTimeout(() => {
             this.isAnimating = false;
             
             // After animation completes, highlight 2025 items in blue
             setTimeout(() => {
                 this.highlight2025Items();
             }, 500);
         }, categories.length * 400 + 1000);
     }

         resetAnimation() {
         const categories = document.querySelectorAll('.mindmap-item');
         const items = document.querySelectorAll('.mindmap-tag');
         
         categories.forEach(category => {
             category.classList.remove('visible');
         });
         
         items.forEach(item => {
             item.classList.remove('visible');
             item.classList.remove('blue-highlight');
             item.classList.remove('orange-highlight');
         });
     }

     highlight2025Items() {
         const items = document.querySelectorAll('.mindmap-tag');
         const userDrivenSection = document.querySelector('.user-driven');
         let itemIndex = 0;
         
         items.forEach((item, index) => {
             if (item.textContent.includes('2025')) {
                 setTimeout(() => {
                     item.classList.add('blue-highlight');
                     
                     // After highlighting, create clone and animate to user-driven section
                     setTimeout(() => {
                         this.moveToUserDriven(item, userDrivenSection, itemIndex);
                         itemIndex++;
                     }, 300);
                 }, index * 200);
             }
         });
         
         // After 2025 items are done, start 2024 items animation
         setTimeout(() => {
             this.highlight2024Items();
         }, (items.length * 200) + 2000);
     }

     highlight2024Items() {
         const items = document.querySelectorAll('.mindmap-tag');
         const userDrivenSection = document.querySelector('.user-driven');
         let itemIndex = 0; // Track index for vertical positioning in 2024 section
         
         items.forEach((item, index) => {
             if (item.textContent.includes('2024')) {
                 setTimeout(() => {
                     item.classList.add('orange-highlight');
                     
                     // After highlighting, create clone and animate to 2024 section
                     setTimeout(() => {
                         this.moveTo2024Section(item, userDrivenSection, itemIndex);
                         itemIndex++; // Increment for next item
                     }, 300);
                 }, index * 200);
             }
         });
     }

     moveToUserDriven(originalItem, userDrivenSection, itemIndex) {
         // Create clone of the item
         const clone = originalItem.cloneNode(true);
         clone.classList.add('moving-to-user');
         
         // Get original position
         const originalRect = originalItem.getBoundingClientRect();
         const containerRect = document.querySelector('.mindmap-container').getBoundingClientRect();
         
         // Position clone at original location
         clone.style.position = 'absolute';
         clone.style.left = (originalRect.left - containerRect.left) + 'px';
         clone.style.top = (originalRect.top - containerRect.top) + 'px';
         clone.style.zIndex = '1000';
         clone.style.opacity = '1';
         clone.style.transform = 'scale(1)';
         
         // Add clone to container
         document.querySelector('.mindmap-container').appendChild(clone);
         
         // Get target position in user-driven section
         const userDrivenRect = userDrivenSection.getBoundingClientRect();
         const targetLeft = (userDrivenRect.left - containerRect.left) + 20;
         const targetTop = (userDrivenRect.top - containerRect.top) + 50 + (itemIndex * 40); // 40px spacing between items
         
         // Animate to user-driven section
         setTimeout(() => {
             clone.style.transition = 'all 0.8s ease-in-out';
             clone.style.left = targetLeft + 'px';
             clone.style.top = targetTop + 'px';
             clone.style.transform = 'scale(0.8)';
             
             // Remove clone after animation
             setTimeout(() => {
                 clone.remove();
                 this.addToUserDriven(originalItem.textContent, itemIndex);
             }, 800);
         }, 100);
     }

     addToUserDriven(text, itemIndex) {
         const userDrivenSection = document.querySelector('.user-driven');
         const newItem = document.createElement('div');
         newItem.className = 'mindmap-tag user-driven-item';
         newItem.innerHTML = `
             <i class="fas fa-file-lines mindmap-icon-small"></i>
             ${text}
         `;
         newItem.style.opacity = '0';
         newItem.style.transform = 'scale(0.8)';
         
         userDrivenSection.appendChild(newItem);
         
         // Animate in
         setTimeout(() => {
             newItem.style.transition = 'all 0.4s ease-out';
             newItem.style.opacity = '1';
             newItem.style.transform = 'scale(1)';
         }, 50);
         
         // Add 2024 title after the last 2025 item
         if (itemIndex === 4) { // Last 2025 item
             setTimeout(() => {
                 this.add2024Title(userDrivenSection);
             }, 1000);
         }
     }

     moveTo2024Section(originalItem, userDrivenSection, itemIndex) {
         // Create clone of the item
         const clone = originalItem.cloneNode(true);
         clone.classList.add('moving-to-user');
         
         // Get original position
         const originalRect = originalItem.getBoundingClientRect();
         const containerRect = document.querySelector('.mindmap-container').getBoundingClientRect();
         
         // Position clone at original location
         clone.style.position = 'absolute';
         clone.style.left = (originalRect.left - containerRect.left) + 'px';
         clone.style.top = (originalRect.top - containerRect.top) + 'px';
         clone.style.zIndex = '1000';
         clone.style.opacity = '1';
         clone.style.transform = 'scale(1)';
         
         // Add clone to container
         document.querySelector('.mindmap-container').appendChild(clone);
         
         // Get target position in 2024 section (below the 2024 title)
         const title2024 = document.querySelector('.user-driven-title-2024');
         const titleRect = title2024.getBoundingClientRect();
         const targetLeft = (titleRect.left - containerRect.left) + 20;
         const targetTop = (titleRect.top - containerRect.top) + 50 + (itemIndex * 40); // 40px spacing between items
         
         // Animate to 2024 section
         setTimeout(() => {
             clone.style.transition = 'all 0.8s ease-in-out';
             clone.style.left = targetLeft + 'px';
             clone.style.top = targetTop + 'px';
             clone.style.transform = 'scale(0.8)';
             
             // Remove clone after animation
             setTimeout(() => {
                 clone.remove();
                 this.addTo2024Section(originalItem.textContent, itemIndex);
             }, 800);
         }, 100);
     }

     addTo2024Section(text, itemIndex) {
         const userDrivenSection = document.querySelector('.user-driven');
         const newItem = document.createElement('div');
         newItem.className = 'mindmap-tag user-driven-item-2024';
         newItem.innerHTML = `
             <i class="fas fa-file-lines mindmap-icon-small"></i>
             ${text}
         `;
         newItem.style.opacity = '0';
         newItem.style.transform = 'scale(0.8)';
         
         userDrivenSection.appendChild(newItem);
         
         // Animate in
         setTimeout(() => {
             newItem.style.transition = 'all 0.4s ease-out';
             newItem.style.opacity = '1';
             newItem.style.transform = 'scale(1)';
         }, 50);
     }

     add2024Title(userDrivenSection) {
         const categoryDiv = document.createElement('div');
         categoryDiv.className = 'mindmap-category';
         
         const title2024 = document.createElement('h4');
         title2024.className = 'mindmap-title user-driven-title-2024';
         title2024.textContent = '2024 Team X reports';
         title2024.style.opacity = '0';
         title2024.style.transform = 'translateY(20px)';
         
         categoryDiv.appendChild(title2024);
         userDrivenSection.appendChild(categoryDiv);
         
         // Animate in
         setTimeout(() => {
             title2024.style.transition = 'all 0.6s ease-out';
             title2024.style.opacity = '1';
             title2024.style.transform = 'translateY(0)';
         }, 100);
     }
}

// Initialize animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MindmapAnimation();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MindmapAnimation;
}
