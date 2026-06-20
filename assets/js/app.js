document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       SCROLL REVEAL (FADE IN EFFECTS ON SCROLL & LOAD)
       ========================================================================== */
    const revealOnScroll = () => {
        const fadeElements = document.querySelectorAll('.fade-in-up');
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Stop observing once the element is revealed
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            rootMargin: '0px 0px -40px 0px' // Offset to trigger slightly before it reaches the viewport edge
        });
        
        fadeElements.forEach((el) => {
            observer.observe(el);
        });
    };
    
    revealOnScroll();

    /* ==========================================================================
       STICKY / GLASSMORPHIC HEADER ON SCROLL
       ========================================================================== */
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Call once initially to set state in case user starts refreshed/scrolled
    handleScroll();

    /* ==========================================================================
       MOBILE RESPONSIVE HAMBURGER MENU
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        menuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
        // Prevent body scrolling when menu is open on mobile
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Active link status visual updating
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (navMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    /* ==========================================================================
       SMOOTH SCROLL INDICATOR INTERACTION
       ========================================================================== */
    const scrollTrigger = document.getElementById('scroll-trigger');
    if (scrollTrigger) {
        scrollTrigger.addEventListener('click', () => {
            // Scroll down exactly 1 viewport height (100vh)
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    /* ==========================================================================
       SCROLL SPY (NAV LINK ACTIVE STATE ON SCROLL)
       ========================================================================== */
    const scrollSpy = () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        const options = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver((entries) => {
            // If we are at the bottom of the page, let the scroll listener handle it
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20) {
                return;
            }
            
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, options);
        
        sections.forEach(section => {
            observer.observe(section);
        });
        
        // Handle bottom of page scroll manually to activate the last section
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === '#contact') {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    };
    
    scrollSpy();
});
