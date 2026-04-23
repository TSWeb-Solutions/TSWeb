// ==================== DARK MODE TOGGLE ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        body.classList.add('dark-mode');
        updateDarkModeIcon();
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        updateDarkModeIcon();
    });
    
    function updateDarkModeIcon() {
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
});

// ==================== HEADER SCROLL TRANSPARENCY ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScrollPos = 0;
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        
        // Add scrolled class for transparency effect
        if (scrollPos > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollPos = scrollPos;
    });
});

// ==================== SMOOTH SCROLLING & NAVIGATION ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const sections = document.querySelectorAll('section');

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                navMenu.classList.remove('active');
                updateActiveNav(link);
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navMenu.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });

    // Update active nav based on scroll
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    function updateActiveNav(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
});

// ==================== ACCORDION ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.closest('.accordion-item');
            const isActive = accordionItem.classList.contains('active');

            // Close all accordion items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
});

// ==================== IMAGE SLIDER ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.getAttribute('data-index'));
            showSlide(currentSlide);
        });
    });

    // Auto slide
    setInterval(nextSlide, 5000);
});

// ==================== MODAL ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const modalCloses = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = trigger.closest('.demo-card').querySelector('.modal');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const modal = closeBtn.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    modals.forEach(modal => {
        const overlay = modal.querySelector('.modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.classList.remove('active');
            });
            document.body.style.overflow = 'auto';
        }
    });
});

// ==================== TABS ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
            }
        });
    });
});

// ==================== CONTACT FORM ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                return;
            }

            const formData = new FormData(contactForm);
            const statusDiv = contactForm.querySelector('.form-status');

            try {
                const response = await fetch('contact.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    statusDiv.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                    statusDiv.classList.remove('error');
                    statusDiv.classList.add('success');
                    contactForm.reset();
                } else {
                    statusDiv.textContent = result.message || 'An error occurred. Please try again.';
                    statusDiv.classList.remove('success');
                    statusDiv.classList.add('error');
                }
            } catch (error) {
                statusDiv.textContent = 'An error occurred. Please try again later.';
                statusDiv.classList.remove('success');
                statusDiv.classList.add('error');
                console.error('Error:', error);
            }

            // Hide status message after 5 seconds
            setTimeout(() => {
                statusDiv.classList.remove('success', 'error');
            }, 5000);
        });
    }

    function validateForm() {
        const inputs = contactForm.querySelectorAll('[required]');
        let isValid = true;

        inputs.forEach(input => {
            const errorMsg = input.closest('.form-group').querySelector('.error-message');
            
            if (!input.value.trim()) {
                errorMsg.textContent = 'This field is required';
                errorMsg.classList.add('show');
                input.style.borderColor = 'var(--accent-color)';
                isValid = false;
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                errorMsg.textContent = 'Please enter a valid email';
                errorMsg.classList.add('show');
                input.style.borderColor = 'var(--accent-color)';
                isValid = false;
            } else {
                errorMsg.classList.remove('show');
                input.style.borderColor = '';
            }
        });

        return isValid;
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const errorMsg = input.closest('.form-group').querySelector('.error-message');
            
            if (input.hasAttribute('required') && !input.value.trim()) {
                errorMsg.textContent = 'This field is required';
                errorMsg.classList.add('show');
                input.style.borderColor = 'var(--accent-color)';
            } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
                errorMsg.textContent = 'Please enter a valid email';
                errorMsg.classList.add('show');
                input.style.borderColor = 'var(--accent-color)';
            } else {
                errorMsg.classList.remove('show');
                input.style.borderColor = '';
            }
        });

        input.addEventListener('focus', () => {
            const errorMsg = input.closest('.form-group').querySelector('.error-message');
            errorMsg.classList.remove('show');
            input.style.borderColor = '';
        });
    });
});

// ==================== SCROLL ANIMATIONS ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe portfolio items
    document.querySelectorAll('.portfolio-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Observe demo cards
    document.querySelectorAll('.demo-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// ==================== FLOATING STARS ANIMATION ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const starsContainer = document.querySelector('.stars');
    
    if (starsContainer) {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.style.position = 'absolute';
            star.style.width = '2px';
            star.style.height = '2px';
            star.style.background = 'white';
            star.style.borderRadius = '50%';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.opacity = Math.random() * 0.5 + 0.3;
            star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
            starsContainer.appendChild(star);
        }
    }
});

// ==================== PARALLAX EFFECT ==================== //
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `0px ${window.scrollY * 0.5}px`;
    }
});

// ==================== UTILITY FUNCTIONS ==================== //
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

// ==================== RESPONSIVE ADJUSTMENTS ==================== //
const debouncedResize = debounce(() => {
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
}, 250);

window.addEventListener('resize', debouncedResize);

// ==================== LOADING ANIMATION ==================== //
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// ==================== PRELOAD IMAGES ==================== //
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const newImg = new Image();
            newImg.src = src;
        }
    });
}

// ==================== MOBILE MENU CLOSE ON LINK CLICK ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navMenu = document.querySelector('.nav-menu');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// ==================== FORM FOCUS ANIMATIONS ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const formInputs = document.querySelectorAll('.form-input, .contact-form input, .contact-form select, .contact-form textarea');

    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement?.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement?.classList.remove('focused');
            }
        });
    });
});

// ==================== LAZY LOADING ==================== //
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

console.log('TSWeb Solutions - Professional Web Development');
console.log('Built with pure HTML, CSS, JavaScript & PHP');
