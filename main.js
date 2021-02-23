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
        //console.log(active_target.parentNode);

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
        document.querySelector(`${real_target}`).scrollIntoView({behavior: "smooth"});
    }
}

const navbar_menu = document.querySelector('.nav_menu');

navbar_menu.addEventListener('click', (event)=> {
    scrollIntoView(event);
    selectNavItem(event.target);
    // toggle 'active' on navbar_menu when scrolling into view
    navbar_menu.classList.toggle('active');

})

/* Scroll into View (Contact Me Button) */
document.getElementById('home_contact_Btn').onclick = function() {
    // Do whatever now that the user has clicked the link.
    document.getElementById('contact_content').scrollIntoView({behavior: "smooth"});
    selectNavItem(navItems[navItems.length - 1]);
};

/* Fade the home view on scroll */

const home = document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;
const about = document.querySelector('#about_content');
const aboutMeHeight = about.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {
    home.style.opacity = 1 - window.scrollY / homeHeight;
})

/* Arrow Up Button & go to the top */

const arrowUp = document.querySelector('.arrowUp');

document.getElementById('arrowUp').onclick = function() {
    document.getElementById('home_content').scrollIntoView({behavior: "smooth"});
    selectNavItem(navItems[0]);
}

document.addEventListener('scroll', ()=> {
    arrowUp.style.opacity = window.scrollY / (homeHeight + aboutMeHeight * 0.25);
})


// 1. 모든 섹션 요소들과 메뉴 아이템들을 가지고 온다
// 2. IntersectionObserver를 이요앻서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.

const sectionIDs = [
    '#home_content',
    '#about_content',
    '#skills_content',
    '#work_content',
    '#testimonial_content',
    '#contact_content'
];

const sections = sectionIDs.map(id => document.querySelector(id));
const navItems = sectionIDs.map(id => document.querySelector(`[data-link= "${id}"]`));

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
}

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        //console.error(entry);
        if (!entry.isIntersecting && entry.intersectionRatio > 0) {
            //console.error(entry.target);
            const index = sectionIDs.indexOf(`#${entry.target.id}`);
            
            // 스크롤링 아래로, 페이지 위로
            if (entry.boundingClientRect.y < 0) {
                selectedNavIndex = index + 1;
            }
            else {
                selectedNavIndex = index - 1;
            }
        }
        //console.log(entry.target.getBoundingClientRect());
    });
}
const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', ()=> {
    /** 
    console.log("window scroll Y: " + window.scrollY);
    console.log('--------------------');
    console.log("window innerHeight: " + window.innerHeight);
    console.log('--------------------');
    console.log('total: ' + Math.round(window.scrollY + window.innerHeight));
    console.log('--------------------');
    console.log("document body innerHeight: " + document.body.clientHeight);
    */
    if (window.scrollY === 0) {
        selectedNavIndex = 0;
        //console.log("나는 처음이다");
    }
    else if (Math.round(window.scrollY + window.innerHeight) === document.body.clientHeight) {
        //console.log("나는 마지막이다!");
        selectedNavIndex = navItems.length - 1;
    }
    else if (Math.round(window.scrollY + window.innerHeight) === document.body.clientHeight - 1) {
        //console.log("나는 마지막이다!");
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
})


// navbar menu spying on scroll

/** 
const sections = document.querySelectorAll('.section');
//console.log(sections);
//const nav_menu_items = document.querySelectorAll('.nav_menu_item');

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(entry);
            let currActive = document.querySelector('.nav_menu_item.active');
            currActive.classList.remove('active');
            navbar_menu.querySelector(`#${entry.target.id.split('_')[0]}`).classList.add('active')
            //console.log(nav_menu.querySelector(idName))
            //navbar_menu.querySelector(idName).classList.add('active');
            
        }
        else {
           // navbar_menu.querySelector(idName).classList.remove('active');
           console.error(entry);
           //navbar_menu.querySelector(`#${entry.target.id.split('_')[0]}`).classList.remove('active')
        }
    })
});

sections.forEach(section => observer.observe(section));
*/
/** 
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
*/