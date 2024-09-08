document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains("projects-page")) {
        initProjects();
    }
    init();
});

const sfx = { 'btnHover': null };
let allowSound = true;

function init() {
    let buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseover', playHover);
    });
}

function playHover(ev) {
    let currBtn = ev.currentTarget;
    ev.preventDefault();

    let fn = currBtn.getAttribute('data-file');
    let src = 'audio/' + fn + '.mp3';

    let audio = document.createElement('audio');
    audio.src = src;
    audio.volume = 0.1;
    if (allowSound) {
        sfx[fn] = audio;
        audio.setAttribute('data-file', fn);
        audio.play();
    }
}

function initProjects() {
    const scrollContainer = document.querySelector(".projects-container");
    const leftButton = document.querySelector(".scroll-button.left");
    const rightButton = document.querySelector(".scroll-button.right");

    if (!leftButton || !rightButton || !scrollContainer) {
        console.error("Scroll buttons or container not found");
        return;
    }

    let scrollAmount = calculateScrollAmount();

    function handleScroll(direction) {
        leftButton.disabled = true;
        rightButton.disabled = true;

        const scrollValue = direction === 'right' ? scrollAmount : -scrollAmount;

        scrollContainer.scrollBy({
            left: scrollValue,
            behavior: "smooth"
        });

        // Wait for scrolling to complete before re-enabling buttons
        scrollContainer.addEventListener('scroll', debounce(enableButtonsAfterScroll, 300));
    }

    function enableButtonsAfterScroll() {
        updateButtonVisibility();
        scrollContainer.removeEventListener('scroll', enableButtonsAfterScroll);
    }

    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    rightButton.addEventListener("click", function () {
        handleScroll('right');
    });

    leftButton.addEventListener("click", function () {
        handleScroll('left');
    });

    function updateButtonVisibility() {
        const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const tolerance = 2; // Small tolerance to account for scroll precision issues

        // Update button states based on scroll position
        leftButton.disabled = scrollContainer.scrollLeft <= 0;
        rightButton.disabled = scrollContainer.scrollLeft >= (maxScrollLeft - tolerance);
    }

    // Ensure buttons are enabled/disabled properly after scrolling
    scrollContainer.addEventListener("scroll", debounce(updateButtonVisibility, 50));

    // Ensure only one project card is visible after resizing
    function ensureSingleCardVisible() {
        const cardWidth = scrollContainer.querySelector(".project-card").offsetWidth;
        const scrollLeft = scrollContainer.scrollLeft;
        const cardIndex = Math.round(scrollLeft / cardWidth);
        scrollContainer.scrollTo({
            left: cardWidth * cardIndex,
            behavior: 'smooth'
        });
    }

    // Initial call to set up button visibility
    updateButtonVisibility();

    // Add resize event listener to handle window resizing
    window.addEventListener('resize', function () {
        scrollAmount = calculateScrollAmount();
        ensureSingleCardVisible();
        updateButtonVisibility();
    });
}

function calculateScrollAmount() {
    const scrollContainer = document.querySelector(".projects-container");
    if (!scrollContainer) return 0;
    
    // Calculate the width of one card (consider margins/padding if necessary)
    const cardWidth = scrollContainer.querySelector(".project-card").offsetWidth;

    // Use the container's width or the card width for scroll amount, depending on screen size
    const containerWidth = scrollContainer.clientWidth;

    return Math.min(cardWidth, containerWidth); // Ensure we scroll by at least one card
}

document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const form = event.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData,
        mode: "no-cors"
    }).then(() => {
        // Display success message
        document.getElementById("form-status").innerText = "Thank you! Your message has been sent.";
        document.getElementById("form-status").style.color = "hsl(162, 92%, 50%)";

        // Optionally clear the form
        form.reset();
    }).catch(error => {
        // Display error message
        document.getElementById("form-status").innerText = "Oops! There was a problem sending your message.";
        document.getElementById("form-status").style.color = "hsl(0, 100%, 60%)";
    });
});