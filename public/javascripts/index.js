const burger = document.querySelector('.hamburger');
const menu = document.querySelector('.mobile-menu');

burger.addEventListener("click", ()=>{
    menu.classList.toggle('active')
})
