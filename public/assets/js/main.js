/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');
  
    form.addEventListener('submit', async (e) =>  {
      e.preventDefault();
  
      const phone = document.querySelector('.phone').value;
      const pname = document.querySelector('.pname').value;
     
      const person = {name:pname, num: phone}
        console.log('person', person);
      // const emailUrl = `https://mail.google.com/mail/u/0/?fs=1&to=${companyMail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}&tf=cm`
     const res = await addPerson(person)
     console.log('res', res);
      // Clear form inputs
      document.querySelector('.phone').value = '';
      document.querySelector('.pname').value = '';
    });
  });

async function activateSend(personId) {
    console.log('p', personId);
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({personId})
    };

    try {
        const response = await fetch('/api/test', options);
        
        // Check if the response status is OK (200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function addPerson(person) {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(person) // Replace with your actual data
    };

    try {
        const response = await fetch('/api/person', options);
        
        // Check if the response status is OK (200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();
        console.log(data);
        await renderList()
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function getPersons(filterBy = {}) {
    let {name, num} = filterBy
    if(!name) name = ''
    if(!num) num = ''
    const queryParams = new URLSearchParams({ name, num });
    const url = `/api/person?${queryParams}`;

    const options = {
        method: 'GET', // Change the method to GET
        headers: {
            'Content-Type': 'application/json'
        },
    };

    try {
        const response = await fetch(url, options);
        console.log('res', response);
        // Check if the response status is OK (200)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.error('Error:', error.message);
    }
}

//render list
async function renderList(filterBy = {}) {
    const persons = await getPersons(filterBy)
    console.log('peee', persons);
    const strHTMLs = persons.map(p => {
       return `<div class="discover__card swiper-slide" onclick="activateSend('${p._id}')">
        <img
          src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          class="discover__img"
        />
        <div class="discover__data">
          <h2 class="discover__title">${p.name}</h2>
          <span class="discover__description">Click to fill</span>
        </div>
      </div>`
    }).join('')
    document.querySelector('.swiper-wrapper').innerHTML = strHTMLs
    console.log('str', strHTMLs);
}

// Wrap your renderList function in an IIFE (Immediately Invoked Function Expression)
(async function () {
    // Your existing code here...

    // Add the following code to run renderList on body onload
    window.onload = async function () {
        await renderList(); // You can pass filterBy if needed
    };
})();

 
/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 100 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 100) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}

window.addEventListener('scroll', scrollHeader)


/*==================== SWIPER DISCOVER ====================*/
let swiper = new Swiper(".discover__container", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    spaceBetween: 32,
    coverflowEffect: {
        rotate: 0,
    },
})

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        // if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        //     document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        // } else {
        //     document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        // }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    distance: '60px',
    duration: 2800,
    // reset: true,
})


sr.reveal(`.home__data, .home__social-link, .home__info,
           .discover__container,
           .experience__data, .experience__overlay,
           .place__card,
           .sponsor__content,
           .footer__data, .footer__rights`, {
    origin: 'top',
    interval: 100,
})

sr.reveal(`.about__data, 
           .video__description,
           .subscribe__description`, {
    origin: 'left',
})

sr.reveal(`.about__img-overlay, 
           .video__content,
           .subscribe__form`, {
    origin: 'right',
    interval: 100,
})

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})