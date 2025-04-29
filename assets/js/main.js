document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");

    /* ===== MENU TOGGLE ===== */
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
              nav = document.getElementById(navId);

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                console.log("Menu toggle clicked");
                nav.classList.toggle('show');
                
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

    /* ===== GSAP ANIMATIONS ===== */
    if (typeof gsap !== 'undefined') {
        // 1. ANIMATION DES OVERLAYS
        const overlays = gsap.timeline();
        overlays
            .to(".first", {duration: 1.5, top: "-100%", ease: "expo.inOut"})
            .to(".second", {duration: 1.5, top: "-100%", ease: "expo.inOut"}, "-=1.2")
            .to(".third", {duration: 1.5, top: "-100%", ease: "expo.inOut"}, "-=1.2");

        // 2. ANIMATION DE L'IMAGE
        gsap.from(".home__img", {
            duration: 2,
            x: 100,
            opacity: 0,
            ease: "power3.out",
            delay: 1.5
        });

        // 3. ANIMATION PRINCIPALE DE LA SECTION HOME
        const homeTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
        
        // Animation du conteneur
        homeTimeline.from('.home__information', {
            opacity: 0,
            y: 30,
            duration: 1.2,
            delay: 1.5
        });

        // Animation du texte d'introduction en #646d70 (gris)
        homeTimeline.from('.home__pressent', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.15,
            onStart: function() {
                // Définit la couleur en gris (#646d70)
                document.querySelectorAll('.home__pressent').forEach(el => {
                    el.style.color = "#646d70";
                });
            }
        }, "-=0.8");

        // Animation spéciale pour le nom "Yassine Daoui" (blanc -> bleu)
        homeTimeline.from(".home__title", {
            x: -150,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.8)",
            onStart: function() {
                // Définit la couleur initiale en blanc
                document.querySelector('.home__title').style.color = "#ffffff";
                // Animation vers #2bbff0 (bleu)
                gsap.to(".home__title", {
                    color: "#2bbff0",
                    duration: 1.8,
                    ease: "sine.inOut"
                });
            }
        }, "-=0.5");

        // Animation spéciale pour "Consultant Data" (blanc -> bleu)
        homeTimeline.from(".home__skill", {
            x: 150,
            opacity: 0,
            duration: 1.5,
            ease: "back.out(3)",
            onStart: function() {
                // Définit la couleur initiale en blanc
                document.querySelector('.home__skill').style.color = "#ffffff";
            },
            onComplete: function() {
                // Animation vers #2bbff0 avec effet de pulsation
                gsap.to(".home__skill", {
                    color: "#2bbff0",
                    duration: 0.8,
                    yoyo: true,
                    repeat: 1,
                    ease: "power1.inOut"
                });
            }
        }, "-=1");

        // Animation du bouton CV
        homeTimeline.from('.home__button', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "bounce.out"
        }, "-=0.5");

        // 4. ANIMATION DU LOGO ET ICÔNES SOCIALES
        gsap.from('.nav__logo', {
            opacity: 0,
            duration: 1.5,
            delay: 1,
            y: 25,
            ease: "expo.out"
        });

        gsap.from('.home__social-icon', {
            opacity: 0,
            duration: 1.5,
            delay: 2.5,
            y: 25,
            stagger: 0.15,
            ease: "back.out(2)"
        });
        // Dans votre fonction d'initialisation des animations
            animateOnScroll("#contact .contact__container", { 
            y: 50,
            stagger: {
                each: 0.1,
                from: "left"
            }
        });

        /* ===== SCROLL ANIMATIONS ===== */
        gsap.from("#about .section-title", {
            scrollTrigger: {
                trigger: "#about",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out"
        });

        // Ajoutez cette partie dans la section GSAP Animations
gsap.from(".service-card", {
    scrollTrigger: {
        trigger: "#services",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: {
        each: 0.2,
        from: "random"
    },
    ease: "back.out(1.7)",
    onStart: function() {
        // Animation de couleur pour les icônes
        gsap.from(".service-header ion-icon:first-child", {
            color: "#646d70",
            duration: 1.5,
            ease: "power2.inOut",
            stagger: 0.1
        });
    }
});
        // Smooth scrolling avec effet d'inertie
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

            // Animation GSAP pour le scroll avec effet d'inertie
            gsap.to(window, {
                duration: 1.5,
                ease: "expo.out",  // Cette courbe d'animation crée l'effet de ralentissement
                scrollTo: {
                    y: targetElement,
                    offsetY: 80,  // Ajustez ce décalage si nécessaire
                    autoKill: true
                }
            });

            // Mise à jour des liens actifs
            document.querySelectorAll('.nav__link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Animation au survol des cartes
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.service-header h3'), {
            color: "#2bbff0",
            duration: 0.3
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.service-header h3'), {
            color: "#ffffff",
            duration: 0.3
        });
    });
});

        gsap.from("#contact .section-title, #contact .contact-form", {
            scrollTrigger: {
                trigger: "#contact",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });

    } else {
        console.error("GSAP not loaded!");
    }

    /* ===== SMOOTH SCROLLING ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                document.querySelectorAll('.nav__link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });

    /* ===== ACTIVE NAV LINK ON SCROLL ===== */
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

    /* ===== SERVICE CARDS TOGGLE ===== */
    function toggleServiceDetails(id) {
        const details = document.getElementById(id);
        const arrow = details.previousElementSibling.querySelector('.service-arrow');
        
        gsap.to(details, {
            height: details.style.height === '0px' ? 'auto' : 0,
            opacity: details.style.opacity === '0' ? 1 : 0,
            duration: 0.3,
            ease: "power1.inOut",
            onStart: () => {
                arrow.style.transform = details.style.height === '0px' 
                    ? 'rotate(180deg)' 
                    : 'rotate(0deg)';
            }
        });
    }

    window.toggleServiceDetails = toggleServiceDetails;
});

