document.addEventListener('DOMContentLoaded', function () {
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
                    const items = nav.querySelectorAll('.nav__item');
                    if (items.length > 0) {
                        gsap.from(items, {
                            opacity: 0,
                            y: 20,
                            duration: 0.5,
                            stagger: 0.1,
                            ease: "power2.out"
                        });
                    }
                }
            });
        } else {
            console.error("Menu elements not found:", { toggleId, navId });
        }
    };

    showMenu('nav-toggle', 'nav-menu');

    /* ===== GSAP ANIMATIONS ===== */
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        const overlays = gsap.timeline();
        overlays
            .to(".first", { duration: 1.5, top: "-100%", ease: "expo.inOut" })
            .to(".second", { duration: 1.5, top: "-100%", ease: "expo.inOut" }, "-=1.2")
            .to(".third", { duration: 1.5, top: "-100%", ease: "expo.inOut" }, "-=1.2");

        gsap.from(".home__img", {
            duration: 2,
            x: 100,
            opacity: 0,
            ease: "power3.out",
            delay: 1.5
        });

        const homeTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        homeTimeline.from('.home__information', {
            opacity: 0,
            y: 30,
            duration: 1.2,
            delay: 1.5
        });

        homeTimeline.from('.home__pressent', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.15,
            onStart: function () {
                document.querySelectorAll('.home__pressent').forEach(el => {
                    el.style.color = "#646d70";
                });
            }
        }, "-=0.8");

        const homeTitle = document.querySelector(".home__title");
        homeTimeline.from(homeTitle, {
            x: -150,
            opacity: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.8)",
            onStart: function () {
                if (homeTitle) {
                    homeTitle.style.color = "#ffffff";
                    gsap.to(homeTitle, {
                        color: "#2bbff0",
                        duration: 1.8,
                        ease: "sine.inOut"
                    });
                }
            }
        }, "-=0.5");

        const homeSkill = document.querySelector(".home__skill");
        homeTimeline.from(homeSkill, {
            x: 150,
            opacity: 0,
            duration: 1.5,
            ease: "back.out(3)",
            onStart: function () {
                if (homeSkill) homeSkill.style.color = "#ffffff";
            },
            onComplete: function () {
                if (homeSkill) {
                    gsap.to(homeSkill, {
                        color: "#2bbff0",
                        duration: 0.8,
                        yoyo: true,
                        repeat: 1,
                        ease: "power1.inOut"
                    });
                }
            }
        }, "-=1");

        homeTimeline.from('.home__button', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: "bounce.out"
        }, "-=0.5");

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
            onStart: function () {
                const icons = document.querySelectorAll(".service-header ion-icon:first-child");
                if (icons.length > 0) {
                    gsap.from(icons, {
                        color: "#646d70",
                        duration: 1.5,
                        ease: "power2.inOut",
                        stagger: 0.1
                    });
                }
            }
        });

        gsap.from(".experience-card", {
            scrollTrigger: {
                trigger: "#blog",
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
            ease: "back.out(1.7)"
        });

        document.querySelectorAll('.service-card').forEach(card => {
            const title = card.querySelector('.service-header h3');
            if (title) {
                card.addEventListener('mouseenter', () => {
                    gsap.to(title, { color: "#2bbff0", duration: 0.3 });
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(title, { color: "#ffffff", duration: 0.3 });
                });
            }
        });

        document.querySelectorAll('.experience-card').forEach(card => {
            const title = card.querySelector('.experience-title h3');
            if (title) {
                card.addEventListener('mouseenter', () => {
                    gsap.to(title, { color: "#2bbff0", duration: 0.3 });
                });
                card.addEventListener('mouseleave', () => {
                    gsap.to(title, { color: "#ffffff", duration: 0.3 });
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
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navMenu = document.getElementById('nav-menu');
                if (navMenu?.classList.contains('show')) {
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

    /* ===== EXPERIENCE CARDS TOGGLE ===== */
    function toggleExperienceDetails(id) {
        const details = document.getElementById(id);
        if (!details) return;

        const card = details.closest('.experience-card');
        if (!card) return;

        document.querySelectorAll('.experience-card').forEach(item => {
            if (item !== card && item.classList.contains('active')) {
                item.classList.remove('active');
                const detailEl = item.querySelector('.experience-card-details');
                if (detailEl) {
                    detailEl.style.maxHeight = '0';
                    detailEl.style.padding = '0 20px';
                }
            }
        });

        card.classList.toggle('active');

        if (card.classList.contains('active')) {
            details.style.maxHeight = details.scrollHeight + 'px';
            details.style.padding = '20px';
        } else {
            details.style.maxHeight = '0';
            details.style.padding = '0 20px';
        }
    }

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
            gsap.set(details, { height: 'auto' });
            gsap.from(details, {
                height: 0,
                opacity: 0,
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

    document.querySelectorAll('.experience-card-details').forEach(details => {
        details.style.maxHeight = '0';
        details.style.padding = '0 20px';
    });

    window.toggleServiceDetails = toggleServiceDetails;
    window.toggleExperienceDetails = toggleExperienceDetails;
});
