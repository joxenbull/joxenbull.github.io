// preloader
const preloader = document.querySelector("[data-preloader]");

window.addEventListener("load", () => {
    preloader.classList.add("remove");
});

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        elements[i].addEventListener(eventType, callback);
    }
}

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNav = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNav);

// Close the navbar when a link is clicked
const navbarLinks = document.querySelectorAll(".navbar-link");
addEventOnElements(navbarLinks, "click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
});

// header
const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {

    header.classList[window.scrollY > 100 ? "add" : "remove"]("active");
});