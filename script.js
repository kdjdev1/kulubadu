// Magnetic Button Effect
document.querySelectorAll('.magnetic-btn').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 100;
        
        if (distance < maxDistance) {
            const pullX = (x / distance) * 15;
            const pullY = (y / distance) * 15;
            this.style.transform = `translate(${pullX}px, ${pullY}px)`;
        }
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// Add to Cart Functionality
document.querySelectorAll('.add-to-cart-btn, .mini-cart-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const productCard = this.closest('.product-card') || this.closest('.product-card-mini');
        const productName = productCard.querySelector('h3') ? productCard.querySelector('h3').textContent : productCard.querySelector('h4').textContent;
        const priceElement = productCard.querySelector('.price');
        const price = priceElement ? priceElement.textContent : 'Price available';
        
        showNotification(`✨ ${productName} added to cart! ${price}`, 'success');
        
        // Add animation
        this.innerHTML = '✓ Added!';
        this.disabled = true;
        setTimeout(() => {
            this.innerHTML = 'Add to Cart';
            this.disabled = false;
        }, 2000);
    });
});

// Heat Level Visualizer
const heatSlider = document.getElementById('heatSlider');
const heatValue = document.getElementById('heatValue');
const heatText = document.getElementById('heatText');
const colorPreview = document.getElementById('colorPreview');

const heatDescriptions = {
    1: 'Mild',
    2: 'Gentle',
    3: 'Subtle',
    4: 'Light',
    5: 'Balanced',
    6: 'Warm',
    7: 'Hot',
    8: 'Fiery',
    9: 'Intense',
    10: 'Extreme'
};

const heatColors = {
    1: '#f4a261',
    2: '#f4a261',
    3: '#f4a261',
    4: '#FF9D52',
    5: '#FF8A3D',
    6: '#FF7548',
    7: '#FF6347',
    8: '#FF4500',
    9: '#FF2400',
    10: '#CC0000'
};

if (heatSlider) {
    heatSlider.addEventListener('input', function() {
        const value = this.value;
        heatValue.textContent = value;
        heatText.textContent = heatDescriptions[value];
        colorPreview.style.backgroundColor = heatColors[value];
        
        document.querySelectorAll('.product-card').forEach(card => {
            const heatLevel = parseInt(card.dataset.heat);
            const heatBar = card.querySelector('.heat-bar');
            if (heatBar) {
                heatBar.style.backgroundColor = heatColors[value];
            }
        });
    });
}

// Product Card Hover Effect with Glow
document.querySelectorAll('.product-card, .product-card-mini').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 20px 60px rgba(244, 162, 97, 0.4)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const image = this.querySelector('.product-image') || this.querySelector('.mini-image');
        if (image) {
            const lightX = (x / rect.width) * 100;
            const lightY = (y / rect.height) * 100;
            image.style.backgroundPosition = `${lightX}% ${lightY}%`;
        }
    });
});

// Map Region Interactions
document.querySelectorAll('.region-marker').forEach(marker => {
    marker.addEventListener('click', function() {
        const region = this.getAttribute('data-region');
        showNotification(`🗺️ ${region} - Premium quality spices from this region`, 'success');
    });
});

document.querySelectorAll('.legend-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('.legend-title').textContent;
        const desc = this.querySelector('.legend-desc').textContent;
        showNotification(`📍 ${title} - ${desc}`, 'success');
    });
});

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Form Validation and Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        showNotification('🎉 Message sent successfully! We\'ll be in touch soon.', 'success');
        contactForm.reset();
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? 'linear-gradient(135deg, #F4A261, #FF8A3D)' : '#FF6B6B'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.story-card, .product-card, .glass-card, .product-card-mini').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax Effect on Hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        console.log('Escape key pressed');
    }
});

// Lazy Load Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// Log page load
console.log('%c🌶️ Welcome to The Spice Collective 🌶️', 'font-size: 20px; color: #F4A261; font-weight: bold;');
console.log('%cසැබෑ රසයේ අභිමානය - Heritage in Every Grain', 'font-size: 14px; color: #D4AF37;');

// ==========================================
// Hero Carousel Functionality
// ==========================================
const carousel = document.querySelector('.hero-carousel');
if (carousel) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentSlide = 0;
    let carouselTimer;
    
    function showSlide(n) {
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.style.opacity = '0.5');
        
        slides[currentSlide].classList.add('active');
        
        // Set the dot to active state
        const activeDot = dots[currentSlide];
        activeDot.style.opacity = '1';
        activeDot.style.background = 'var(--saffron-glow)';
        activeDot.style.boxShadow = '0 0 10px var(--saffron-glow)';
        
        // Reset other dots
        dots.forEach((dot, index) => {
            if (index !== currentSlide) {
                dot.style.background = 'rgba(255, 255, 255, 0.5)';
                dot.style.boxShadow = 'none';
            }
        });
    }
    
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    function startAutoPlay() {
        carouselTimer = setInterval(nextSlide, 4000);
    }
    
    function stopAutoPlay() {
        clearInterval(carouselTimer);
    }
    
    // Dot click navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // Pause on hover, resume on leave
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (carousel && carousel.getBoundingClientRect().top < window.innerHeight) {
            if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            }
        }
    });
    
    // Initialize carousel
    showSlide(currentSlide);
    startAutoPlay();
}
