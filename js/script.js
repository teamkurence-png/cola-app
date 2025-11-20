// 3D Carousel Controller for Cyberpunk Theme
class Carousel3DController {
    constructor() {
        this.currentIndex = 2; // Start with center item (Canada)
        this.items = document.querySelectorAll('.carousel-3d-item');
        this.totalItems = this.items.length;
        this.carousel = document.getElementById('carousel3d');
        this.indicators = document.querySelectorAll('.indicator');
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.dragThreshold = 50;
        
        if (this.carousel) {
            this.init();
        }
    }

    init() {
        // Add arrow button handlers
        const leftArrow = document.getElementById('leftArrow');
        const rightArrow = document.getElementById('rightArrow');
        
        if (leftArrow) leftArrow.addEventListener('click', () => this.prev());
        if (rightArrow) rightArrow.addEventListener('click', () => this.next());
        
        // Add indicator click handlers
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });

        // Auto-rotate (optional - can be commented out)
        // this.startAutoRotate();
    }

    updateCarousel() {
        // Calculate positions for all items relative to current center
        this.items.forEach((item, index) => {
            const relativePos = index - this.currentIndex;
            
            // Remove all classes
            item.classList.remove('hidden', 'center');
            
            // Apply positioning based on relative position
            if (relativePos === -2) {
                // Far left
                item.style.cssText = `
                    position: absolute;
                    left: 5%;
                    top: 50%;
                    transform: translateY(-50%) scale(0.6);
                    opacity: 0.5;
                    z-index: 1;
                    display: block;
                    width: 280px;
                `;
            } else if (relativePos === -1) {
                // Left
                item.style.cssText = `
                    position: absolute;
                    left: 20%;
                    top: 50%;
                    transform: translateY(-50%) scale(0.75);
                    opacity: 0.7;
                    z-index: 2;
                    display: block;
                    width: 280px;
                `;
            } else if (relativePos === 0) {
                // Center
                item.classList.add('center');
                item.style.cssText = `
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                    z-index: 10;
                    width: 280px;
                    display: block;
                `;
                
                // Add or update center label
                let label = item.querySelector('.center-label');
                if (!label) {
                    label = document.createElement('div');
                    label.className = 'center-label';
                    label.textContent = 'Boss Flavor';
                    item.appendChild(label);
                }
            } else if (relativePos === 1) {
                // Right
                item.style.cssText = `
                    position: absolute;
                    right: 20%;
                    left: auto;
                    top: 50%;
                    transform: translateY(-50%) scale(0.75);
                    opacity: 0.7;
                    z-index: 2;
                    display: block;
                    width: 280px;
                `;
            } else if (relativePos === 2) {
                // Far right
                item.style.cssText = `
                    position: absolute;
                    right: 5%;
                    left: auto;
                    top: 50%;
                    transform: translateY(-50%) scale(0.6);
                    opacity: 0.5;
                    z-index: 1;
                    display: block;
                    width: 280px;
                `;
            } else {
                // Hide items too far away
                item.classList.add('hidden');
                item.style.cssText = 'display: none;';
            }

            // Remove center labels from non-center items
            if (relativePos !== 0) {
                const oldLabel = item.querySelector('.center-label');
                if (oldLabel) {
                    oldLabel.remove();
                }
            }
        });

        // Update indicators
        this.updateIndicators();
    }

    updateIndicators() {
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    startAutoRotate() {
        setInterval(() => {
            this.next();
        }, 4000);
    }
}

// Original Carousel functionality for light theme pages
class CarouselController {
    constructor() {
        this.currentIndex = 0;
        this.items = document.querySelectorAll('.carousel-item');
        this.totalItems = this.items.length;
        this.carousel = document.getElementById('carousel');
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.dragThreshold = 50;
        
        if (this.carousel) {
            this.init();
        }
    }

    init() {
        // Create navigation dots
        this.createDots();
        
        // Set initial state
        this.updateCarousel();
        
        // Add event listeners for buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
        if (nextBtn) nextBtn.addEventListener('click', () => this.next());
        
        // Add drag/swipe functionality
        this.addDragListeners();
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
    }

    createDots() {
        const dotsContainer = document.getElementById('carouselDots');
        if (!dotsContainer) return;
        
        for (let i = 0; i < this.totalItems; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    updateCarousel() {
        // Remove all classes first
        this.items.forEach(item => {
            item.classList.remove('active', 'prev', 'next');
        });

        // Set active item
        this.items[this.currentIndex].classList.add('active');

        // Set previous item
        const prevIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.items[prevIndex].classList.add('prev');

        // Set next item
        const nextIndex = (this.currentIndex + 1) % this.totalItems;
        this.items[nextIndex].classList.add('next');

        // Update dots
        this.updateDots();
    }

    updateDots() {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    next() {
        this.currentIndex = (this.currentIndex + 1) % this.totalItems;
        this.updateCarousel();
    }

    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.totalItems) % this.totalItems;
        this.updateCarousel();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }

    addDragListeners() {
        // Mouse events
        this.carousel.addEventListener('mousedown', (e) => this.dragStart(e));
        this.carousel.addEventListener('mousemove', (e) => this.drag(e));
        this.carousel.addEventListener('mouseup', (e) => this.dragEnd(e));
        this.carousel.addEventListener('mouseleave', (e) => this.dragEnd(e));

        // Touch events
        this.carousel.addEventListener('touchstart', (e) => this.dragStart(e));
        this.carousel.addEventListener('touchmove', (e) => this.drag(e));
        this.carousel.addEventListener('touchend', (e) => this.dragEnd(e));
    }

    dragStart(e) {
        this.isDragging = true;
        this.startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        this.carousel.style.cursor = 'grabbing';
    }

    drag(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        this.currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    }

    dragEnd(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        this.carousel.style.cursor = 'grab';

        const diff = this.currentX - this.startX;

        if (Math.abs(diff) > this.dragThreshold) {
            if (diff > 0) {
                // Dragged right, go to previous
                this.prev();
            } else {
                // Dragged left, go to next
                this.next();
            }
        }

        this.startX = 0;
        this.currentX = 0;
    }
}

// Contact Form Validation
class ContactFormValidator {
    constructor() {
        this.form = document.getElementById('contactForm');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        // Clear previous errors
        this.clearAllErrors();

        // Get form values
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        let isValid = true;

        // Validate name
        if (!this.validateName(name.value)) {
            this.showError('name', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }

        // Validate email
        if (!this.validateEmail(email.value)) {
            this.showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Validate message
        if (!this.validateMessage(message.value)) {
            this.showError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }

        if (isValid) {
            this.showSuccess();
            this.form.reset();
        }
    }

    validateField(field) {
        const fieldName = field.id;
        const value = field.value;

        switch (fieldName) {
            case 'name':
                if (!this.validateName(value)) {
                    this.showError('name', 'Please enter a valid name (at least 2 characters)');
                    return false;
                }
                break;
            case 'email':
                if (!this.validateEmail(value)) {
                    this.showError('email', 'Please enter a valid email address');
                    return false;
                }
                break;
            case 'message':
                if (!this.validateMessage(value)) {
                    this.showError('message', 'Please enter a message (at least 10 characters)');
                    return false;
                }
                break;
        }
        return true;
    }

    validateName(name) {
        return name.trim().length >= 2;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validateMessage(message) {
        return message.trim().length >= 10;
    }

    showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }

    clearError(field) {
        const fieldId = field.id;
        const errorElement = document.getElementById(`${fieldId}Error`);
        
        if (errorElement) {
            errorElement.classList.remove('show');
        }
        
        field.classList.remove('error');
    }

    clearAllErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorInputs = document.querySelectorAll('.error');
        
        errorMessages.forEach(el => el.classList.remove('show'));
        errorInputs.forEach(el => el.classList.remove('error'));
        
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.remove('show');
        }
    }

    showSuccess() {
        const successMessage = document.getElementById('successMessage');
        if (successMessage) {
            successMessage.classList.add('show');
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D carousel for cyberpunk home page
    const carousel3d = document.getElementById('carousel3d');
    if (carousel3d) {
        new Carousel3DController();
    }
    
    // Initialize standard carousel for other pages
    const carousel = document.getElementById('carousel');
    if (carousel) {
        new CarouselController();
    }
    
    // Initialize contact form validator if on contact page
    new ContactFormValidator();
});

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
