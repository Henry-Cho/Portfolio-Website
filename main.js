'use strict'

// upload items from json file by using fetch

function uploadItems() {
    return fetch('data/data.json')
    .catch(console.log("error"))
    .then(response => response.json())
    .then(json => json.items);
}

// make a default view without clicking buttons

uploadItems()
.then((items) => {
    displayItems(items);
    setEventListener(items);
})

function createHTMLString(item) {
    return `
    <a href="#" class="project" target='blank' data-key="${item.kind}" data-value="${item.value}">
        <img class="project_img" src="${item.url}">
        <div class="project_description">
            <h3>${item.title}</h3>
            <span>${item.description}</span>
        </div>
    </a>
    `;
}

// set event listeners and make the event happen according to the settings

function setEventListener(items) {
    // set event listening point
    const workBtns = document.querySelector('.work_display');

    workBtns.addEventListener('click', (event) => {
        const target = event.target.dataset;
        const key = target.key;
        const value = target.value;
        const active_button = document.querySelector('.work_btn.active');

        active_button.classList.remove('active');
        const active_target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
        active_target.classList.add('active');
        console.log(active_target.parentNode);

        if (key == null || value == null) {
            return;
        }
        else {
            /* My work button state */
            active_target.classList.add('active');

            if (value == 'all') {
                displayItems(items);
            }
            else {
                const filtered = items.filter(item => item[key] === value);
                displayItems(filtered);
            }
        }
        }
    )
}

function displayItems(items) {
    // diplay location
    const display = document.querySelector('.work_projects');
    
    // copying items with map function
    display.innerHTML = items.map(item => createHTMLString(item)).join('');
}

const toggle_Btn = document.querySelector('.navbar_toogle-Btn');
const menu = document.querySelector('.nav_menu');
const navbar = document.querySelector('#navbars');
const navbarHeight = navbar.getBoundingClientRect().height;
// nav_bar toggle Btn activate
toggle_Btn.addEventListener('click', ()=> {
    menu.classList.toggle('active');
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
    // toggle 'active' on navbar_menu when scrolling into view
    navbar_menu.classList.toggle('active');
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

/* Arrow Up Button & go to the top */

const arrowUp = document.querySelector('.arrowUp');
const aboutMe = document.querySelector('#about_content');
const aboutMeHeight = aboutMe.getBoundingClientRect().height;
const skill = document.querySelector('#skills_content');
const skillHeight = skill.getBoundingClientRect().height;
const work = document.querySelector('#work_content');
const workHeight = work.getBoundingClientRect().height;
const testimonial = document.querySelector('#testimonial_content');
const testimonialHeight = testimonial.getBoundingClientRect().height;
const contact = document.querySelector('#contact');
const contactHeight = contact.getBoundingClientRect().height;

document.getElementById('arrowUp').onclick = function() {
    document.getElementById('home_content').scrollIntoView({behavior: "smooth"});
}

document.addEventListener('scroll', ()=> {
    arrowUp.style.opacity = window.scrollY / (homeHeight + aboutMeHeight * 0.25);
})

// navbar menu spying on scroll

const home_start = 0;
const about_start = homeHeight;
const skill_start = about_start + aboutMeHeight;
const work_start = skill_start + skillHeight;
const testimonial_start = work_start + workHeight; 
const contact_start = testimonial_start + testimonialHeight;

document.addEventListener('scroll', ()=> {
    
    if ((window.scrollY >= home_start) && (window.scrollY < homeHeight)) {
        const currActive = document.querySelector(".nav_menu_item.active");
        currActive.classList.remove('active');
        const navActive = document.querySelector("#home_id");
        navActive.classList.add('active');
    }

    else if ((window.scrollY >= about_start) && (window.scrollY < skill_start)) {
        const currActive = document.querySelector(".nav_menu_item.active");
        currActive.classList.remove('active');
        const navActive = document.querySelector("#about_id");
        navActive.classList.add('active');
    }

    else if ((window.scrollY >= skill_start) && (window.scrollY < work_start)) {
        const currActive = document.querySelector(".nav_menu_item.active");
        currActive.classList.remove('active');
        const navActive = document.querySelector("#skill_id");
        navActive.classList.add('active');
    }

    else if ((window.scrollY >= work_start) && (window.scrollY < testimonial_start)) {
        const currActive = document.querySelector(".nav_menu_item.active");
        currActive.classList.remove('active');
        const navActive = document.querySelector("#work_id");
        navActive.classList.add('active');
    }

    else if ((window.scrollY >= testimonial_start) && (window.scrollY < contact_start)) {
        const currActive = document.querySelector(".nav_menu_item.active");
        currActive.classList.remove('active');
        const navActive = document.querySelector("#testimonial_id");
        navActive.classList.add('active');
    }

    else {
        const currActive = document.querySelector(".nav_menu_item.active");
        currActive.classList.remove('active');
        const navActive = document.querySelector("#contact_id");
        navActive.classList.add('active');
    }
})