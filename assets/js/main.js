/* MENU SHOW */
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}

showMenu('nav-toggle','nav-menu')

/*----- ANIMATE -----*/
// OVERLAY
gsap.to(".first", 1.5, {delay: .5, top: "-100%", ease: Expo.easeInOut});
gsap.to(".second", 1.5, {delay: .7, top: "-100%", ease: Expo.easeInOut});
gsap.to(".third", 1.5, {delay: .9, top: "-100%", ease: Expo.easeInOut});

// IMG
gsap.from('.home__img', {opacity: 0, duration: 2, delay: 2, x: 60})

// INFORMATION
gsap.from('.home__information', {opacity: 0, duration: 3, delay: 2.3, y: 25})
gsap.from('.anime-text', {opacity: 0, duration: 3, delay: 2.3, y: 25, ease:'expo.out', stagger: .3})

// NAV ITEM
gsap.from('.nav__logo', {opacity:0, duration: 3, delay: 3.2, y: 25, ease:'expo.out'});
gsap.from('.nav__item', {opacity: 0, duration: 3, delay: 3.2, y: 25, ease:'expo.out', stagger: .2})

// SOCIAL
gsap.from('.home__social-icon', {opacity: 0, duration: 3, delay: 4, y: 25, ease:'expo.out', stagger: .2})

// SECTION ANIMATIONS
const sections = document.querySelectorAll('.section');

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      
      // Animate each section differently
      if (entry.target.id === 'about') {
        gsap.from(entry.target.querySelector('.about__img'), {
          opacity: 0,
          x: -50,
          duration: 1,
          delay: 0.3
        });
        gsap.from(entry.target.querySelector('.about__information'), {
          opacity: 0,
          x: 50,
          duration: 1,
          delay: 0.6
        });
      } else if (entry.target.id === 'services') {
        gsap.from(entry.target.querySelectorAll('.services__item'), {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.3
        });
      } else if (entry.target.id === 'contact') {
        gsap.from(entry.target.querySelector('.contact__form'), {
          opacity: 0,
          x: -50,
          duration: 1,
          delay: 0.3
        });
        gsap.from(entry.target.querySelector('.contact__info'), {
          opacity: 0,
          x: 50,
          duration: 1,
          delay: 0.6
        });
      }
    }
  });
}, observerOptions);

sections.forEach(section => {
  observer.observe(section);
});
