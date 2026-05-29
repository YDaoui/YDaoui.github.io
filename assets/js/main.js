document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");

 
    function playInitialAnimations() {
        console.log("Playing/Replaying initial animations...");

       
        gsap.set(".first", { top: 0 });
        gsap.set(".second", { top: 0 });
        gsap.set(".third", { top: 0 });

    
        const overlays = gsap.timeline();
        overlays
            .to(".first", { duration: 1.5, top: "-100%", ease: "expo.inOut" })
            .to(".second", { duration: 1.5, top: "-100%", ease: "expo.inOut" }, "-=1.2")
            .to(".third", { duration: 1.5, top: "-100%", ease: "expo.inOut" }, "-=1.2");

    
       
            gsap.from(".home__img-container", {
                duration: 2,
                x: 100,
                opacity: 0,
                rotation: -30,
                ease: "power3.out",
                delay: 1.5
            });
            
            gsap.from(".home__img", {
                duration: 1.5,
                scale: 0.8,
                opacity: 0,
                ease: "elastic.out(1, 0.5)",
                delay: 2
            });
            
            gsap.from(".home__img-border", {
                duration: 2,
                scale: 0,
                opacity: 0,
                ease: "back.out(4)",
                delay: 1.8
            });

      
        const homeTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

        homeTimeline.fromTo('.home__information',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.2, delay: 1.5 }
        );

        homeTimeline.fromTo('.home__pressent',
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15,
                onStart: function() {
                    document.querySelectorAll('.home__pressent').forEach(el => {
                        el.style.color = "#646d70";
                    });
                }
            }, "-=0.8"
        );

        homeTimeline.fromTo(".home__title",
            { x: -150, opacity: 0 },
            {
                x: 0,
                opacity: 1,
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
            }, "-=0.5"
        );

        homeTimeline.fromTo(".home__skill",
            { x: 150, opacity: 0 },
            {
                x: 0,
                opacity: 1,
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
            }, "-=1"
        );

        homeTimeline.fromTo('.home__button',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "bounce.out" }, "-=0.5"
        );

     
        gsap.fromTo('.nav__logo',
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 1.5, delay: 1, ease: "expo.out" }
        );

  
        gsap.fromTo('.home__social-icon',
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 1.5, delay: 2.5, stagger: 0.15, ease: "back.out(2)" }
        );
    }

  
    if (typeof gsap !== 'undefined') {
        playInitialAnimations();
    } else {
        console.error("GSAP not loaded!");
    }

 
    document.getElementById('logo-link').addEventListener('click', function(e) {
        e.preventDefault();

  
        window.scrollTo({ top: 0, behavior: 'smooth' });

     
        gsap.to('body', { opacity: 0, duration: 0.3, onComplete: () => {
       
            gsap.to('body', { opacity: 1, duration: 0.3 });
            playInitialAnimations();
        }});
    });

 
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
              nav = document.getElementById(navId),
              navLinks = document.querySelectorAll('.nav__link');

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                console.log("Menu toggle clicked");
                nav.classList.toggle('show');
                toggle.classList.toggle('active');

                if (nav.classList.contains('show')) {
                    gsap.from(nav.querySelectorAll('.nav__item'), {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: "power2.out",
                        onStart: () => {
                            gsap.to(nav, {
                                backgroundColor: 'rgba(17, 17, 17, 0.98)',
                                duration: 0.3
                            });
                        }
                    });
                } else {
                    gsap.to(nav, {
                        backgroundColor: 'rgba(17, 17, 17, 0)',
                        duration: 0.3
                    });
                }
            });

           
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (nav.classList.contains('show')) {
                        nav.classList.remove('show');
                        toggle.classList.remove('active');
                        gsap.to(nav, {
                            backgroundColor: 'rgba(17, 17, 17, 0)',
                            duration: 0.3
                        });
                    }
                });
            });
        } else {
            console.error("Menu elements not found:", { toggleId, navId });
        }
    };

    showMenu('nav-toggle', 'nav-menu');

    
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
        onStart: function() {
            gsap.from(".service-header ion-icon:first-child", {
                color: "#646d70",
                duration: 1.5,
                ease: "power2.inOut",
                stagger: 0.1
            });
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

   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navMenu = document.getElementById('nav-menu');
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    document.getElementById('nav-toggle').classList.remove('active');
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

  
    window.toggleServiceDetails = function(id) {
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
    };

    document.querySelectorAll('.service-details').forEach(details => {
        details.style.height = '0';
        details.style.opacity = '0';
    });

   
    window.toggleExperienceDetails = function(id) {
        const details = document.getElementById(id);
        if (!details) return;

        const arrow = details.previousElementSibling.querySelector('.experience-arrow');
        const card = details.closest('.experience-card');

        if (details.classList.contains('show')) {
            gsap.to(details, {
                height: 0,
                opacity: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                duration: 0.3,
                ease: "power1.inOut",
                onComplete: () => {
                    details.classList.remove('show');
                    details.style.height = '';
                }
            });
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        } else {
            details.classList.add('show');
            const contentHeight = details.scrollHeight;

            gsap.to(details, {
                height: contentHeight,
                opacity: 1,
                paddingTop: '1rem',
                paddingBottom: '1.5rem',
                marginTop: '1rem',
                duration: 0.3,
                ease: "power1.inOut",
                onStart: () => {
                    details.style.display = 'block';
                }
            });
            if (arrow) arrow.style.transform = 'rotate(180deg)';
        }
    };

   
    document.querySelectorAll('.experience-card-details').forEach(details => {
        details.style.height = '0';
        details.style.opacity = '0';
        details.style.paddingTop = '0';
        details.style.paddingBottom = '0';
        details.style.marginTop = '0';
        details.style.overflow = 'hidden';
    });

   
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

    
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const button = form.querySelector('button[type="submit"]');

            button.disabled = true;
            button.innerHTML = '<span>Envoi en cours...</span>';

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams(new FormData(form))
                });

                if (response.ok) {
                    window.location.href = form.querySelector('input[name="_next"]').value;
                } else {
                    throw new Error('Erreur FormSubmit');
                }
            } catch (error) {
                console.error('Erreur avec FormSubmit:', error);
                const name = encodeURIComponent(form.querySelector('[name="name"]').value);
                const email = encodeURIComponent(form.querySelector('[name="email"]').value);
                const subject = encodeURIComponent(form.querySelector('[name="subject"]').value);
                const message = encodeURIComponent(form.querySelector('[name="message"]').value);

                window.location.href = `mailto:daoui00yassine@gmail.com?subject=${subject}&body=Nom: ${name}%0AEmail: ${email}%0A%0AMessage: ${message}`;

                button.disabled = false;
                button.innerHTML = '<span>Envoyer le message</span><ion-icon name="send-outline" class="button__icon"></ion-icon>';

                alert("Le formulaire a rencontré un problème. Une fenêtre d'email s'est ouverte à la place.");
            }
        });
    }

    initContactForm();

   
    const urlParams = new URLSearchParams(window.location.search);
    const successParam = urlParams.get('success');

    if (successParam === 'true') {
        document.getElementById('successPopup').style.display = 'flex';
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    document.querySelector('.close-popup-btn').addEventListener('click', function() {
        document.getElementById('successPopup').style.display = 'none';
    });


});
