document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            
            if (navMenu.classList.contains('show')) {
                gsap.from(navMenu.querySelectorAll('.nav__item'), {
                    opacity: 0,
                    y: 20,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power2.out"
                });
            }
        });
    }

    // GSAP Animations
    if (typeof gsap !== 'undefined') {
        // Overlay Animation
        const overlayTL = gsap.timeline();
        overlayTL
            .to(".first", {duration: 1.5, top: "-100%", ease: "expo.inOut"})
            .to(".second", {duration: 1.5, top: "-100%", ease: "expo.inOut"}, "-=1.2")
            .to(".third", {duration: 1.5, top: "-100%", ease: "expo.inOut"}, "-=1.2");

        // Home Animation
        const homeTL = gsap.timeline({ defaults: { ease: "power3.out" } });
        homeTL
            .from('.home__information', { opacity: 0, y: 30, duration: 1.2, delay: 1.5 })
            .from('.home__pressent', { opacity: 0, y: 20, duration: 0.8, stagger: 0.15 }, "-=0.8")
            .from(".home__title", { 
                x: -150, 
                opacity: 0, 
                duration: 1.5, 
                ease: "elastic.out(1, 0.8)",
                onStart: () => {
                    gsap.to(".home__title", {
                        color: "#2bbff0",
                        duration: 1.8,
                        ease: "sine.inOut"
                    });
                }
            }, "-=0.5")
            .from(".home__skill", {
                x: 150,
                opacity: 0,
                duration: 1.5,
                ease: "back.out(3)",
                onComplete: () => {
                    gsap.to(".home__skill", {
                        color: "#2bbff0",
                        duration: 0.8,
                        yoyo: true,
                        repeat: 1
                    });
                }
            }, "-=1")
            .from('.home__button', { opacity: 0, y: 30, duration: 0.8, ease: "bounce.out" }, "-=0.5")
            .from('.home__img', { x: 100, opacity: 0, duration: 2, ease: "power3.out" }, "-=1.5")
            .from('.nav__logo', { opacity: 0, y: 25, duration: 1.5, ease: "expo.out" }, "-=1.5")
            .from('.home__social-icon', { 
                opacity: 0, 
                y: 25, 
                duration: 1.5, 
                stagger: 0.15, 
                ease: "back.out(2)" 
            }, "-=1.5");

        // Scroll Animations
        gsap.registerPlugin(ScrollTrigger);
        
        const animateOnScroll = (selector, options = {}) => {
            gsap.from(selector, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: selector,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                ...options
            });
        };

        animateOnScroll("#about .section-title");
        animateOnScroll("#services .section-title");
        animateOnScroll("#contact .section-title");
        animateOnScroll(".service-card", { 
            y: 50,
            stagger: {
                each: 0.15,
                from: "random"
            },
            ease: "back.out(1.7)"
        });
        animateOnScroll("#contact .contact-form", { y: 50 });
    }

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }

                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Service Cards Toggle
    window.toggleServiceDetails = (id) => {
        const details = document.getElementById(id);
        const card = details.closest('.service-card');
        const arrow = card.querySelector('.service-arrow');
        
        // Close other cards
        document.querySelectorAll('.service-card').forEach(item => {
            if (item !== card) {
                item.classList.remove('active');
                gsap.to(item.querySelector('.service-details'), { height: 0, duration: 0.4 });
                gsap.to(item.querySelector('.service-arrow'), { rotate: 0, color: "#646d70", duration: 0.3 });
            }
        });
        
        // Toggle current card
        card.classList.toggle('active');
        
        if (card.classList.contains('active')) {
            gsap.to(details, { height: 'auto', duration: 0.4 });
            gsap.to(arrow, { rotate: 180, color: "#2bbff0", duration: 0.3 });
        } else {
            gsap.to(details, { height: 0, duration: 0.4 });
            gsap.to(arrow, { rotate: 0, color: "#646d70", duration: 0.3 });
        }
    };
});
