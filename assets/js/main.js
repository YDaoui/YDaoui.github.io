document.addEventListener('DOMContentLoaded', function() {
    // Menu toggle
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
              nav = document.getElementById(navId);

        if(toggle && nav) {
            toggle.addEventListener('click', () => {
                nav.classList.toggle('show');
            });
        }
    }
    showMenu('nav-toggle','nav-menu');

    // Animations GSAP
    if(typeof gsap !== 'undefined') {
        // Animation overlay
        gsap.to(".first", {duration: 1.5, delay: 0.5, top: "-100%", ease: "expo.inOut"});
        gsap.to(".second", {duration: 1.5, delay: 0.7, top: "-100%", ease: "expo.inOut"});
        gsap.to(".third", {duration: 1.5, delay: 0.9, top: "-100%", ease: "expo.inOut");

        // Animation sections
        gsap.utils.toArray(".content-section").forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1
            });
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
