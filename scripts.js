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

        leftButton.disabled = scrollContainer.scrollLeft === 0;
        rightButton.disabled = scrollContainer.scrollLeft >= maxScrollLeft;
    }

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
    // Calculate the width of one card (or adjust if cards have margins/paddings)
    return scrollContainer.querySelector(".project-card").offsetWidth; // Added 20px for margin/padding if necessary
}