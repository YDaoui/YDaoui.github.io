document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");

    /* MENU SHOW */
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
              nav = document.getElementById(navId);

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                console.log("Menu toggle clicked");
                nav.classList.toggle('show');
                // Animation du menu
                if (nav.classList.contains('show')) {
                    gsap.from(nav.querySelectorAll('.nav__item'), {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out"
                    });
                }
            });
        } else {
            console.error("Menu elements not found:", {toggleId, navId});
        }
    };

    showMenu('nav-toggle', 'nav-menu');

    // Vérifier si GSAP est chargé
    if (typeof gsap !== 'undefined') {
        /* ANIMATIONS */
        // OVERLAY - Animation unique sans répétition
        const overlays = gsap.timeline();
        overlays
            .to(".first", {duration: 1.5, top: "-100%", ease: "expo.inOut"})
            .to(".second", {duration: 1.5, top: "-100%", ease: "expo.inOut"}, "-=1.2")
            .to(".third", {duration: 1.5, top: "-100%", ease: "expo.inOut"}, "-=1.2");

        // IMAGE - Animation unique
        gsap.from(".home__img", {
            duration: 2,
            x: 100,
            opacity: 0,
            ease: "power3.out",
            delay: 1.5
        });

        // INFORMATION
        const infoAnimation = gsap.timeline();
        infoAnimation
            .from('.home__information', {opacity: 0, duration: 2, y: 25, delay: 1.8})
            .from('.anime-text', {
                opacity: 0,
                y: 25,
                duration: 1.5,
                ease: "expo.out",
                stagger: 0.2
            }, "-=1.5");

        // NAV ITEM
        gsap.from('.nav__logo', {
            opacity: 0,
            duration: 2,
            delay: 2.5,
            y: 25,
            ease: "expo.out"
        });

        // SOCIAL
        gsap.from('.home__social-icon', {
            opacity: 0,
            duration: 2,
            delay: 3,
            y: 25,
            ease: "expo.out",
            stagger: 0.2
        });

        // Animation du titre
        gsap.from(".home__title", {
            x: -200,
            opacity: 0,
            duration: 2,
            delay: 1.5,
            ease: "power3.out"
        });

        // Animation du sous-titre
        gsap.from(".home__skill", {
            x: 200,
            opacity: 0,
            duration: 2,
            delay: 2,
            ease: "power3.out",
            onStart: function() {
                document.querySelector('.home__skill').style.color = "#2bbff0";
            }
        });

        /* SCROLL ANIMATIONS */
        // Animation sur le titre de la section "About"
        gsap.from("#about .section-title", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });

        // Animation des cartes de service
        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: "#services",
                start: "top 80%"
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 1
        });

    } else {
        console.error("GSAP not loaded!");
    }

    /* SMOOTH SCROLLING */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Fermer le menu mobile si ouvert
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }

                // Scroll vers la cible
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });

                // Mise à jour de l'état actif
                document.querySelectorAll('.nav__link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    // Activation des liens de navigation au scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - sectionHeight / 3)) {
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
});
