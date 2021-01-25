'use strict'
const toggle_Btn = document.querySelector('.navbar_toogle-Btn');
const menu = document.querySelector('.nav_menu');
const navbar_size = document.querySelector('.navbars');
const navbar = document.querySelector('#navbars');
const navbarHeight = navbar.getBoundingClientRect().height;
// nav_bar toggle Btn activate
toggle_Btn.addEventListener('click', ()=> {
    menu.classList.toggle('active');
    navbar_size.classList.toggle('active');
})

// keyword 로 검색하기 Javascript scroll height
// javascript element size
document.addEventListener('scroll', ()=> {
    //console.log(window.scrollY);
    //console.log(`navbar height: ${navbarHeight}`);
    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    }

    else {
        navbar.classList.remove('navbar--dark');
    }
})

// scroll into view 만들기 (navbar)

function scrollIntoView(event) {
    const target = event.target.dataset;
    const real_target = target.link;
    if (real_target == null) {
        return;
    }
    else {
        document.getElementById(`${real_target}`).scrollIntoView({behavior: "smooth"});
    }
}

const navbar_menu = document.querySelector('.nav_menu');

navbar_menu.addEventListener('click', (event)=> {
    scrollIntoView(event);
})

/* Scroll into View (Contact Me Button) */
document.getElementById('home_contact_Btn').onclick = function() {
    // Do whatever now that the user has clicked the link.
    document.getElementById('contact').scrollIntoView({behavior: "smooth"});
};

/* Fade the home view on scroll */

const home = document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {
    home.style.opacity = 1 - window.scrollY / homeHeight;
})