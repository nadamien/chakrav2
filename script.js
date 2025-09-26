// ================================
// Chakra Ella - Main JavaScript
// ================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Navigation ==========
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // ========== Experiences Carousel ==========
    const experienceData = [
        {
            title: 'Wildlife Safari',
            image: 'safari.jpg',
            description: 'Embark on an unforgettable journey through our private reserve, home to elephants, leopards, and over 200 bird species. Our expert naturalists will guide you through morning and evening safaris.',
            highlights: ['4x4 safari vehicles', 'Expert naturalist guides', 'Morning & evening drives', 'Photography opportunities']
        },
        {
            title: 'Nature Walks',
            image: 'nature-walk.jpg',
            description: 'Explore hidden trails through ancient forests and discover the rich biodiversity of our ecosystem. Learn about medicinal plants, spot exotic birds, and connect with nature.',
            highlights: ['Guided forest trails', 'Bird watching', 'Medicinal plant discovery', 'Waterfall visits']
        },
        {
            title: 'Bird Watching',
            image: 'birds.jpg',
            description: 'Paradise for bird enthusiasts with over 200 species including endemic and migratory birds. Early morning sessions with expert ornithologists.',
            highlights: ['200+ bird species', 'Professional binoculars provided', 'Expert ornithologist guides', 'Photography hides']
        },
        {
            title: 'Cultural Tours',
            image: 'cultural.jpg',
            description: 'Immerse yourself in local culture with visits to nearby villages, tea plantations, and ancient temples. Experience traditional crafts and authentic Sri Lankan hospitality.',
            highlights: ['Village visits', 'Tea plantation tours', 'Temple ceremonies', 'Traditional craft workshops']
        },
        {
            title: 'Adventure Sports',
            image: 'adventure.jpg',
            description: 'Get your adrenaline pumping with rock climbing, zip-lining, and white water rafting. All activities are conducted with certified instructors and safety equipment.',
            highlights: ['Rock climbing', 'Zip-lining', 'White water rafting', 'Mountain biking']
        }
    ];
    
    const expNavBtns = document.querySelectorAll('.exp-nav-btn');
    const experienceContainer = document.querySelector('.experiences-carousel');
    
    expNavBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const expIndex = parseInt(this.getAttribute('data-exp'));
            updateExperience(expIndex);
            
            expNavBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    function updateExperience(index) {
        const experience = experienceData[index];
        const experienceItem = document.querySelector('.experience-item');
        
        if (experienceItem && experience) {
            const imageElement = experienceItem.querySelector('.experience-image img');
            const titleElement = experienceItem.querySelector('.experience-content h3');
            const descElement = experienceItem.querySelector('.experience-content p');
            const highlightsList = experienceItem.querySelector('.experience-highlights');
            
            if (imageElement) imageElement.src = experience.image;
            if (titleElement) titleElement.textContent = experience.title;
            if (descElement) descElement.textContent = experience.description;
            
            if (highlightsList) {
                highlightsList.innerHTML = experience.highlights
                    .map(highlight => `<li>${highlight}</li>`)
                    .join('');
            }
        }
    }
    
    // ========== Gallery Filter ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Gallery lightbox effect
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption');
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                    <div class="lightbox-caption">${caption ? caption.textContent : ''}</div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Add styles for lightbox
            const style = document.createElement('style');
            style.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                    animation: fadeIn 0.3s;
                }
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                .lightbox-content img {
                    max-width: 100%;
                    max-height: 80vh;
                    border-radius: 10px;
                }
                .lightbox-close {
                    position: absolute;
                    top: -40px;
                    right: 0;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .lightbox-close:hover {
                    color: var(--clay-terracotta);
                }
                .lightbox-caption {
                    text-align: center;
                    color: white;
                    margin-top: 1rem;
                    font-size: 1.1rem;
                }
            `;
            document.head.appendChild(style);
            
            // Close lightbox
            lightbox.addEventListener('click', function() {
                lightbox.remove();
                style.remove();
            });
        });
    });
    
    // ========== Testimonials Slider ==========
    const testimonials = [
        {
            text: "An absolutely magical experience! The perfect blend of luxury and nature. The staff went above and beyond to make our anniversary celebration unforgettable. We'll definitely be returning.",
            author: "Sarah Williams",
            location: "United Kingdom",
            rating: 5
        },
        {
            text: "Chakra Ella exceeded all our expectations. The tents are luxurious beyond belief, the food is exceptional, and the wildlife experiences are once in a lifetime. This is glamping at its finest!",
            author: "Michael Chen",
            location: "Singapore",
            rating: 5
        },
        {
            text: "The most peaceful and rejuvenating vacation we've ever had. The spa treatments, yoga sessions, and the natural beauty of the surroundings created the perfect wellness retreat.",
            author: "Emma Thompson",
            location: "Australia",
            rating: 5
        },
        {
            text: "From the moment we arrived, we felt like royalty. The attention to detail, the sustainable practices, and the incredible hospitality make this place truly special. Can't wait to come back!",
            author: "Roberto Martinez",
            location: "Spain",
            rating: 5
        }
    ];
    
    let currentTestimonial = 0;
    const testimonialContainer = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.test-prev');
    const nextBtn = document.querySelector('.test-next');
    
    function updateTestimonial(index) {
        const testimonial = testimonials[index];
        const testimonialItem = document.querySelector('.testimonial-item');
        
        if (testimonialItem && testimonial) {
            testimonialItem.style.opacity = '0';
            
            setTimeout(() => {
                const textElement = testimonialItem.querySelector('.testimonial-text');
                const authorName = testimonialItem.querySelector('.author-info h4');
                const authorLocation = testimonialItem.querySelector('.author-info span');
                const stars = testimonialItem.querySelector('.stars');
                
                if (textElement) textElement.textContent = `"${testimonial.text}"`;
                if (authorName) authorName.textContent = testimonial.author;
                if (authorLocation) authorLocation.textContent = testimonial.location;
                if (stars) stars.textContent = '★'.repeat(testimonial.rating);
                
                testimonialItem.style.opacity = '1';
            }, 300);
        }
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            updateTestimonial(currentTestimonial);
        });
        
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
        });
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // ========== Booking Form ==========
    const bookingForm = document.querySelector('.booking-form');
    
    if (bookingForm) {
        // Set minimum date to today
        const checkInInput = document.getElementById('check-in');
        const checkOutInput = document.getElementById('check-out');
        const today = new Date().toISOString().split('T')[0];
        
        if (checkInInput) {
            checkInInput.min = today;
            
            checkInInput.addEventListener('change', function() {
                const checkInDate = new Date(this.value);
                const minCheckOut = new Date(checkInDate);
                minCheckOut.setDate(minCheckOut.getDate() + 1);
                checkOutInput.min = minCheckOut.toISOString().split('T')[0];
                
                if (checkOutInput.value && new Date(checkOutInput.value) <= checkInDate) {
                    checkOutInput.value = '';
                }
            });
        }
        
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const bookingData = {};
            
            formData.forEach((value, key) => {
                bookingData[key] = value;
            });
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Show success message
                alert('Thank you for your booking inquiry! We will contact you within 24 hours to confirm availability and finalize your reservation.');
                
                // Reset form
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // ========== Newsletter Form ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('.btn-subscribe');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter! You will receive a confirmation email shortly.');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ========== Back to Top Button ==========
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ========== Parallax Effect ==========
    const parallaxElements = document.querySelectorAll('.parallax-image');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // ========== Intersection Observer for Animations ==========
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.section-header, .accommodation-card, .wellness-card, .dining-option, .gallery-item');
    animateElements.forEach(el => observer.observe(el));
    
    // ========== Preloader ==========
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    });
    
    // ========== Lazy Loading Images ==========
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support Intersection Observer
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
    
    // ========== Date Picker Enhancement ==========
    const dateInputs = document.querySelectorAll('input[type="date"]');
    dateInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.showPicker && this.showPicker();
        });
    });
    
    // ========== Smooth Page Transitions ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== Dynamic Year in Footer ==========
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });
});

// ========== Performance Optimization ==========
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

// Apply optimizations
window.addEventListener('scroll', debounce(() => {
    // Scroll-based animations
}, 100));

window.addEventListener('resize', throttle(() => {
    // Resize-based adjustments
}, 250));

console.log('Chakra Ella website loaded successfully!');