// 999 Coffee - Advanced Interactive Script

// GSAP Initialization
gsap.registerPlugin(ScrollTrigger);

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const cursorGlow = document.getElementById('cursor-glow');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileCloseBtn = document.getElementById('mobile-close-btn');
const themeToggle = document.getElementById('theme-toggle');

// Loading Screen Animation
window.addEventListener('load', () => {
    // Animate loading progress
    gsap.to('.loading-progress', {
        width: '100%',
        duration: 3,
        ease: "power2.out"
    });

    // Hide loading screen
    setTimeout(() => {
        gsap.to(loadingScreen, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                loadingScreen.style.display = 'none';
                initializeAnimations();
            }
        });
    }, 3500);
});

// Initialize All Animations
function initializeAnimations() {
    // Hero Section Animations
    const heroTl = gsap.timeline();
    
    heroTl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
    })
    .from('.hero-subtitle', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    }, "-=1")
    .from('.cta-primary, .cta-secondary', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    }, "-=0.8")
    .from('.scroll-indicator', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5");

    // Floating Elements Animation
    gsap.to('.coffee-bean', {
        y: -20,
        rotation: 360,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 2
    });

    // Section Scroll Animations
    gsap.utils.toArray('section').forEach((section, i) => {
        gsap.from(section.children, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Stats Counter Animation
    animateCounters();

    // Menu Filter Animation
    initMenuFilter();

    // Product Slider
    initProductSlider();

    // Testimonials Slider
    initTestimonialsSlider();

    // Parallax Effects
    initParallaxEffects();

    // Create Floating Particles
    createFloatingParticles();
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: target,
                ease: "power3.inOut"
            });
        }
    });
});

// Mobile Menu Functionality
mobileMenuBtn.addEventListener('click', () => {
    gsap.to(mobileMenu, {
        x: 0,
        duration: 0.5,
        ease: "power3.out"
    });
});

mobileCloseBtn.addEventListener('click', () => {
    gsap.to(mobileMenu, {
        x: '100%',
        duration: 0.5,
        ease: "power3.out"
    });
});

// Close mobile menu on link click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        gsap.to(mobileMenu, {
            x: '100%',
            duration: 0.5,
            ease: "power3.out"
        });
    });
});

// Cursor Glow Effect
document.addEventListener('mousemove', (e) => {
    gsap.to(cursorGlow, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.3,
        ease: "power3.out"
    });
});

// Interactive Elements Hover Effects
document.querySelectorAll('.menu-item, .product-card, .testimonial-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    
    if (document.body.classList.contains('light-mode')) {
        icon.className = 'fas fa-sun';
        gsap.to('body', { backgroundColor: '#F7F3E9', duration: 0.5 });
    } else {
        icon.className = 'fas fa-moon';
        gsap.to('body', { backgroundColor: '#0D0D0D', duration: 0.5 });
    }
});

// Animated Counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 80%",
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    ease: "power2.out",
                    snap: { innerHTML: 1 },
                    onUpdate: function() {
                        counter.innerHTML = Math.ceil(counter.innerHTML);
                        if (target >= 1000) {
                            counter.innerHTML = Math.ceil(counter.innerHTML).toLocaleString() + '+';
                        }
                    }
                });
            }
        });
    });
}

// Menu Filter Functionality
function initMenuFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            // Animate menu items
            menuItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    gsap.to(item, {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                    item.style.display = 'block';
                } else {
                    gsap.to(item, {
                        scale: 0.8,
                        opacity: 0,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Product Slider
function initProductSlider() {
    const productTrack = document.querySelector('.product-track');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentIndex = 0;
    const slideWidth = 400; // Width including gap

    if (productTrack && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                gsap.to(productTrack, {
                    x: -currentIndex * slideWidth,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });

        nextBtn.addEventListener('click', () => {
            const maxIndex = productTrack.children.length - 1;
            if (currentIndex < maxIndex) {
                currentIndex++;
                gsap.to(productTrack, {
                    x: -currentIndex * slideWidth,
                    duration: 0.5,
                    ease: "power2.out"
                });
            }
        });
    }
}

// Testimonials Auto-Slider
function initTestimonialsSlider() {
    const testimonials = [
        {
            text: "The most exquisite coffee experience I've ever had. Every sip is perfection.",
            author: "James Mitchell",
            role: "Coffee Enthusiast",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        {
            text: "999 Coffee has redefined my understanding of premium coffee. Absolutely magnificent.",
            author: "Sarah Chen",
            role: "Food Critic",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
        },
        {
            text: "From ambiance to taste, everything about 999 Coffee screams luxury and excellence.",
            author: "David Rodriguez",
            role: "Business Executive",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
    ];

    const testimonialCard = document.querySelector('.testimonial-card');
    let currentTestimonial = 0;

    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        
        gsap.to(testimonialCard, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                testimonialCard.innerHTML = `
                    <div class="flex justify-center mb-6">
                        <img src="${testimonial.image}" alt="Customer" class="w-16 h-16 rounded-full object-cover">
                    </div>
                    <p class="text-coffee-cream/80 text-lg mb-6 italic">"${testimonial.text}"</p>
                    <div class="text-coffee-gold font-semibold">${testimonial.author}</div>
                    <div class="text-coffee-cream/60">${testimonial.role}</div>
                `;
                
                gsap.to(testimonialCard, {
                    opacity: 1,
                    duration: 0.3
                });
            }
        });

        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }

    // Auto-rotate testimonials
    setInterval(updateTestimonial, 5000);
}

// Parallax Effects
function initParallaxEffects() {
    // Hero background parallax
    gsap.to('.hero-section video', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: "#home",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    // Floating elements parallax
    gsap.to('.floating-elements .coffee-bean', {
        y: -100,
        ease: "none",
        scrollTrigger: {
            trigger: "#home",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Create Floating Particles
function createFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Add to Cart Animation
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '30px';
        ripple.style.height = '30px';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.left = (e.offsetX - 15) + 'px';
        ripple.style.top = (e.offsetY - 15) + 'px';
        ripple.style.pointerEvents = 'none';
        
        this.style.position = 'relative';
        this.appendChild(ripple);
        
        gsap.to(ripple, {
            scale: 4,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                ripple.remove();
            }
        });

        // Success feedback
        gsap.to(this, {
            scale: 1.1,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
        });
    });
});

// Form Submission Animations
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Loading animation
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
            submitBtn.style.background = '#10B981';
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                form.reset();
            }, 2000);
        }, 2000);
    });
});

// Gallery Image Modal
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="max-w-4xl max-h-full relative">
                <img src="${img.src}" alt="${img.alt}" class="max-w-full max-h-full object-contain rounded-2xl">
                <button class="absolute top-4 right-4 w-10 h-10 bg-coffee-gold/20 backdrop-blur-sm rounded-full flex items-center justify-center text-coffee-gold hover:bg-coffee-gold/30 transition-colors duration-300">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        gsap.from(modal, {
            opacity: 0,
            duration: 0.3
        });
        
        gsap.from(modal.querySelector('img'), {
            scale: 0.8,
            duration: 0.5,
            ease: "power3.out"
        });
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal || e.target.closest('button')) {
                gsap.to(modal, {
                    opacity: 0,
                    duration: 0.3,
                    onComplete: () => modal.remove()
                });
            }
        });
    });
});

// Newsletter Success Animation
document.querySelector('.newsletter-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    gsap.to(this, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
            this.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            this.style.background = '#10B981';
            
            setTimeout(() => {
                this.innerHTML = 'Subscribe';
                this.style.background = '';
            }, 3000);
        }
    });
});

// Intersection Observer for Section Visibility
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Update active navigation
            const id = entry.target.getAttribute('id');
            if (id) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Enhanced Scroll Effects
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Navbar hide/show on scroll
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        gsap.to(navbar, { y: -100, duration: 0.3 });
    } else {
        gsap.to(navbar, { y: 0, duration: 0.3 });
    }
    
    lastScrollTop = scrollTop;
});

// Console Welcome Message
console.log(`
🌟 Welcome to 999 Coffee 🌟
Built with passion and precision
Premium coffee experience awaits...
`);
