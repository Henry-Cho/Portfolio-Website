const toggle_Btn = document.querySelector('.navbar_toogle-Btn');
const menu = document.querySelector('.nav_menu');
const navbar_size = document.querySelector('.navbars');
// nav_bar toggle Btn activate
toggle_Btn.addEventListener('click', ()=> {
    menu.classList.toggle('active');
    console.log("menu active");
    navbar_size.classList.toggle('active');
    console.log("navbar size");
})