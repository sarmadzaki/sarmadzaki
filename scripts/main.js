/**
 * Sarmad Zaki - Resume Website
 * Modern JavaScript for enhanced interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavbar();
    initScrollAnimations();
    initMobileMenu();
    initSmoothScroll();
    initTypewriter();
});

/**
 * Navbar scroll behavior
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    };

    // Throttle scroll event
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial check
    handleScroll();
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-header, .highlight-card, .job-card, .skill-category, .education-card, .contact-card');

    if (!animatedElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add CSS for animate-in class
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navActions = document.querySelector('.nav-actions');

    if (!menuToggle) return;

    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <nav class="mobile-nav">
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="Resume.pdf" target="_blank" class="btn btn-primary">Download Resume</a></li>
            </ul>
        </nav>
    `;

    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(10, 10, 15, 0.98);
            backdrop-filter: blur(20px);
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .mobile-menu.active {
            opacity: 1;
            visibility: visible;
        }
        
        .mobile-nav ul {
            list-style: none;
            padding: 0;
            margin: 0;
            text-align: center;
        }
        
        .mobile-nav li {
            margin-bottom: 1.5rem;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .mobile-menu.active .mobile-nav li {
            opacity: 1;
            transform: translateY(0);
        }
        
        .mobile-menu.active .mobile-nav li:nth-child(1) { transition-delay: 0.1s; }
        .mobile-menu.active .mobile-nav li:nth-child(2) { transition-delay: 0.2s; }
        .mobile-menu.active .mobile-nav li:nth-child(3) { transition-delay: 0.3s; }
        .mobile-menu.active .mobile-nav li:nth-child(4) { transition-delay: 0.4s; }
        .mobile-menu.active .mobile-nav li:nth-child(5) { transition-delay: 0.5s; }
        
        .mobile-nav a {
            font-size: 1.5rem;
            font-weight: 500;
            color: var(--color-text-primary, #f5f5f7);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .mobile-nav a:hover {
            color: var(--color-accent-primary, #d4a853);
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(mobileMenu);

    // Toggle menu
    let isMenuOpen = false;

    menuToggle.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        menuToggle.classList.toggle('active', isMenuOpen);
        mobileMenu.classList.toggle('active', isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            isMenuOpen = false;
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbar = document.querySelector('.navbar');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Typewriter effect for hero (optional enhancement)
 */
function initTypewriter() {
    const element = document.querySelector('.hero-subtitle');
    if (!element) return;

    const text = element.textContent;
    const originalText = text;
    
    // Only run typewriter on larger screens
    if (window.innerWidth < 768) return;

    // Subtle typing cursor effect
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .hero-subtitle::after {
            content: '|';
            animation: blink 1s infinite;
            color: var(--color-accent-primary, #d4a853);
            margin-left: 2px;
            font-weight: 300;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(cursorStyle);

    // Remove cursor after 4 seconds
    setTimeout(() => {
        cursorStyle.remove();
    }, 4000);
}

/**
 * Parallax effect for floating shapes (optional)
 */
function initParallax() {
    const shapes = document.querySelectorAll('.shape');
    if (!shapes.length || window.innerWidth < 768) return;

    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.02;
            const x = (clientX - centerX) * speed;
            const y = (clientY - centerY) * speed;

            shape.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Initialize parallax if needed (can be performance heavy)
// initParallax();

/**
 * Form submission handling
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Visual feedback
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Let form submit naturally to Formspree
        // The page will redirect after submission
    });
});

/**
 * Add active state to nav links based on scroll position
 */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px -50% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

// Initialize active nav links
document.addEventListener('DOMContentLoaded', initActiveNavLinks);

/**
 * Add loading animation
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
