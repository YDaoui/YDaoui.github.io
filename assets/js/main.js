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
            });
        } else {
            console.error("Menu elements not found:", {toggleId, navId});
        }
    };

    showMenu('nav-toggle', 'nav-menu');

    // Vérifier si GSAP est chargé
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(Expo);

        /* ANIMATIONS */
        // OVERLAY
        gsap.to(".first", {duration: 2, delay: 0.5, top: "-100%", ease: "expo.inOut"});
        gsap.to(".second", {duration: 2, delay: 0.7, top: "-100%", ease: "expo.inOut"});
        gsap.to(".third", {duration: 2, delay: 0.9, top: "-100%", ease: "expo.inOut"});

        // IMG
        gsap.from('.home__img', {opacity: 0, duration: 2.5, delay: 2, x: 60});

        // INFORMATION
        gsap.from('.home__information', {opacity: 0, duration: 3, delay: 2.3, y: 25});
        gsap.from('.anime-text', {opacity: 0, duration: 3, delay: 2.3, y: 25, ease: "expo.out", stagger: 0.3});

        // NAV ITEM
        gsap.from('.nav__logo', {opacity: 0, duration: 3, delay: 3.2, y: 25, ease: "expo.out"});
        gsap.from('.nav__item', {opacity: 0, duration: 3, delay: 3.2, y: 25, ease: "expo.out", stagger: 0.2});

        // SOCIAL
        gsap.from('.home__social-icon', {opacity: 0, duration: 3, delay: 4, y: 25, ease: "expo.out", stagger: 0.2});

        // Animation du nom "Yassine Daoui"
        gsap.from(".name-title", {x: -200, opacity: 0, duration: 2.5, delay: 1.5, ease: "power3.out"});

        // Animation du titre "Consultant Data" avec couleur
        gsap.from(".job-title", {
            x: 200,
            opacity: 0,
            duration: 2.5,
            delay: 2,
            ease: "power3.out",
            onStart: function() {
                document.querySelector('.job-title').style.color = "#2bbff0";
            }
        });

    } else {
        console.error("GSAP not loaded!");
    }

    /* SMOOTH SCROLLING */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({top: targetElement.offsetTop - 100, behavior: 'smooth'});
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });

    // Activation des liens de navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = "";
        
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === "#" + current) {
                link.classList.add('active');
            }
        });
    });

    // Animation sur le titre de la section "About"
    gsap.from("#about .section-title", {
        scrollTrigger: {trigger: "#about", start: "top 80%"},
        opacity: 0, y: 50, duration: 1
    });

    // Animation des cartes de service
    gsap.from(".service-card", {
        scrollTrigger: {trigger: "#services", start: "top 80%"},
        opacity: 0, y: 50, stagger: 0.2, duration: 1
    });
});

// Ajustement des animations globales
gsap.from(".home__title", {x: -200, opacity: 0, duration: 3, delay: 2, ease: "power3.out"});
gsap.from(".home__skill", {
    x: 200, opacity: 0, duration: 3, delay: 2, ease: "power3.out",
    onStart: function() {document.querySelector('.home__skill').style.color = "#2bbff0";}
});
