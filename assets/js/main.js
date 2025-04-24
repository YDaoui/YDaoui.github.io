 /* MENU SHOW */ 
const showMenu = (toggleId, navId) =>{
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
gsap.from('.home__social-icon', {opacity: 0, duration: 3, delay: 4, y: 25, ease:'expo.out', stagger: .2})== et j ai enfin sopus le dossier sass un fichier nommé styles.scss avec ce code == /* ----- SERVICES SECTION ----- */
#services {
  padding: 5rem 2rem;
  background-color: var(--black-color);
  color: var(--white-color);
  text-align: center;
}

.services-container h2 {
  font-size: 2rem;
  margin-bottom: 3rem;
}

.services-carousel {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.service-item {
  background-color: var(--first-color);
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
}

.service-item img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.service-item h3 {
  font-size: 1.5rem;
  margin-top: 1rem;
}

.service-item p {
  font-size: 1rem;
  margin-top: 0.5rem;
}

/* ----- CONTACT SECTION ----- */
#contact {
  padding: 5rem 2rem;
  background-color: var(--black-color);
  color: var(--white-color);
  text-align: center;
}

.contact-container h2 {
  font-size: 2rem;
  margin-bottom: 3rem;
}

#contact-form {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

#contact-form label {
  font-size: 1rem;
  text-align: left;
}

#contact-form input,
#contact-form textarea {
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid var(--white-color);
  background-color: var(--black-color);
  color: var(--white-color);
  border-radius: 5px;
}

#contact-form button {
  padding: 1rem;
  background-color: var(--first-color);
  color: var(--white-color);
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

#contact-form button:hover {
  background-color: var(--black-color);
  color: var(--first-color);
}
