// Menu toggle amélioré
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    toggle?.addEventListener('click', () => {
      nav.classList.toggle('show');
      toggle.setAttribute('aria-expanded', nav.classList.contains('show'));
    });
  };

  menuToggle('nav-toggle', 'nav-menu');

  // Animations GSAP regroupées
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  
  tl.to([".first", ".second", ".third"], {
    top: "-100%",
    stagger: 0.2,
    duration: 1.5
  })
  .from('.home__img', { opacity: 0, x: 60 }, 0.5)
  .from('.home__information, .anime-text', { 
    opacity: 0, 
    y: 25,
    stagger: 0.3 
  }, 0.8)
  .from('.nav__logo, .nav__item', {
    opacity: 0,
    y: 25,
    stagger: 0.2
  }, 1.2);
});
