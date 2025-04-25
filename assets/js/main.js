// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    /* MENU SHOW */
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
              nav = document.getElementById(navId);

        if(toggle && nav){
            toggle.addEventListener('click', () => {
                console.log("Menu toggle clicked");
                nav.classList.toggle('show');
            });
        } else {
            console.error("Menu elements not found:", {toggleId, navId});
        }
    }

    showMenu('nav-toggle','nav-menu');

    // Vérifier si GSAP est chargé
    if(typeof gsap !== 'undefined') {
        /* ANIMATIONS */
        gsap.registerPlugin(Expo);
        
        // OVERLAY
        gsap.to(".first", {duration: 1.5, delay: 0.5, top: "-100%", ease: "expo.inOut"});
        gsap.to(".second", {duration: 1.5, delay: 0.7, top: "-100%", ease: "expo.inOut"});
        gsap.to(".third", {duration: 1.5, delay: 0.9, top: "-100%", ease: "expo.inOut"});

        // IMG
        gsap.from('.home__img', {opacity: 0, duration: 2, delay: 2, x: 60});

        // INFORMATION
        gsap.from('.home__information', {opacity: 0, duration: 3, delay: 2.3, y: 25});
        gsap.from('.anime-text', {
            opacity: 0,
            duration: 3,
            delay: 2.3,
            y: 25,
            ease: "expo.out",
            stagger: 0.3
        });

        // NAV ITEM
        gsap.from('.nav__logo', {opacity:0, duration: 3, delay: 3.2, y: 25, ease:"expo.out"});
        gsap.from('.nav__item', {
            opacity: 0,
            duration: 3,
            delay: 3.2,
            y: 25,
            ease: "expo.out",
            stagger: 0.2
        });

        // SOCIAL
        gsap.from('.home__social-icon', {
            opacity: 0,
            duration: 3,
            delay: 4,
            y: 25,
            ease: "expo.out",
            stagger: 0.2
        });
    } else {
        console.error("GSAP not loaded!");
    }

    /* SMOOTH SCROLLING */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                const navMenu = document.getElementById('nav-menu');
                if(navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });
});
