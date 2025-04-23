// main.js
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');

  // Quand on survole l'icône hamburger, on ouvre le menu et on applique la rotation
  hamburger.addEventListener('mouseenter', () => {
    navbar.classList.add('active');
    hamburger.classList.add('rotate-icon');
  });

  // Quand on sort du menu latéral, on le referme et on remet l'icône à sa position initiale
  navbar.addEventListener('mouseleave', () => {
    navbar.classList.remove('active');
    hamburger.classList.remove('rotate-icon');
  });
});
