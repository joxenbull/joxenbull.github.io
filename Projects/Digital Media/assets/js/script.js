'use strict';

/**
 * add event on multiple elements
 */

const addEventOnElement = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
        if (elements[i]) {  // Check if the element exists
            elements[i].addEventListener(eventType, callback);
        }
    }
}

/**
 * navbar toggle for mobile
 */

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector("[data-navbar]");
    const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
    const overlay = document.querySelector("[data-overlay]");

    const toggleNavbar = function () {
        navbar.classList.toggle('active');
        navToggleBtn.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('nav-active');
    }

    // Check if all elements are found before adding event listener
    if (navbar && navToggleBtn && overlay) {
        addEventOnElement([navToggleBtn, overlay], 'click', toggleNavbar);
    } else {
        console.error("One or more elements not found in the DOM.");
    }
});

/**
 * parallax effect
 */

const parallaxElements = document.querySelectorAll("[data-parallax]");

window.addEventListener("mousemove", event => {

    for (let i = 0, len = parallaxElements.length; i < len; i++) {

        const movementX = (event.clientX / window.innerWidth) * Number(parallaxElements[i].dataset.parallaxSpeed);
        const movementY = (event.clientY / window.innerHeight) * Number(parallaxElements[i].dataset.parallaxSpeed);

        parallaxElements[i].animate ({
            transform: `translate(${movementX}px, ${movementY}px)`
        }, { duration: 500, fill: "forwards" });
    }
});