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
                document.querySelector('.home__title').style.color = "#ffffff";
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
                document.querySelector('.home__skill').style.color = "#ffffff";
            },
            onComplete: function() {
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

        // Animation des cartes de services
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
                gsap.from(".service-header ion-icon:first-child", {
                    color: "#646d70",
                    duration: 1.5,
                    ease: "power2.inOut",
                    stagger: 0.1
                });
            }
        });

        // Animation des cartes d'expérience
        gsap.from(".experience-card", {
            scrollTrigger: {
                trigger: "#blog",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            stagger: {
                each: 0.2,
                from: "random"
            },
            ease: "back.out(1.7)",
            onStart: function() {
                gsap.from(".company-logo", {
                    scale: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.5)",
                    stagger: 0.1
                });
            }
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
        if (!details) return;

        const arrow = details.previousElementSibling?.querySelector('.service-arrow');

        if (details.classList.contains('show')) {
            gsap.to(details, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power1.inOut",
                onComplete: () => details.classList.remove('show')
            });
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        } else {
            details.classList.add('show');
            gsap.to(details, {
                height: 'auto',
                opacity: 1,
                duration: 0.3,
                ease: "power1.inOut"
            });
            if (arrow) arrow.style.transform = 'rotate(180deg)';
        }
    }

    document.querySelectorAll('.service-details').forEach(details => {
        details.style.height = '0';
        details.style.opacity = '0';
    });

    /* ===== EXPERIENCE CARDS TOGGLE ===== */
   /* ===== EXPERIENCE CARDS TOGGLE ===== */
function toggleExperienceDetails(id) {
    const details = document.getElementById(id);
    if (!details) return;

    const card = details.closest('.experience-card');
    const arrow = card.querySelector('.experience-arrow');

    if (details.classList.contains('show')) {
        gsap.to(details, {
            height: 0,
            opacity: 0,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 0,
            duration: 0.3,
            ease: "power1.inOut",
            onComplete: () => details.classList.remove('show')
        });
        gsap.to(arrow, {
            rotation: 0,
            duration: 0.3
        });
    } else {
        details.classList.add('show');
        gsap.to(details, {
            height: 'auto',
            opacity: 1,
            paddingTop: '15px',
            paddingBottom: '15px',
            marginTop: '15px',
            duration: 0.3,
            ease: "power1.inOut"
        });
        gsap.to(arrow, {
            rotation: 180,
            duration: 0.3
        });
    }
}

// Initialisation des cartes
document.querySelectorAll('.experience-card-details').forEach(details => {
    gsap.set(details, {
        height: 0,
        opacity: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0
    });
});

// Animation au survol des cartes d'expérience
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.experience-title h3'), {
            color: "#2bbff0",
            duration: 0.3
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.experience-title h3'), {
            color: "#ffffff",
            duration: 0.3
        });
    });
});

 window.toggleServiceDetails = toggleServiceDetails;
    window.toggleExperienceDetails = toggleExperienceDetails;
});
