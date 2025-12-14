document.addEventListener('DOMContentLoaded', function() {
    init();

    if (document.body.classList.contains("projects-page")) {
        fetchGitHubProjects();
    }
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
    // Only prevent default if it's not a link we actually want to click
    // ev.preventDefault(); 

    let fn = currBtn.getAttribute('data-file');
    if (!fn) return; 

    let src = 'audio/' + fn + '.mp3';

    let audio = document.createElement('audio');
    audio.src = src;
    audio.volume = 0.1;
    if (allowSound) {
        sfx[fn] = audio;
        audio.setAttribute('data-file', fn);
        audio.play().catch(e => console.log("Audio autoplay blocked"));
    }
}

async function fetchGitHubProjects() {
    const username = 'ChristianGleitzman';
    const container = document.getElementById('github-projects');
    

    const excludedRepos = [
        'ChristianGleitzman.github.io', 
        'ChristianGleitzman',
        'House-Price-Predictor',
        'TaskScheduler',
        'Sorting-Visualiser',
        'Weather-App'
    ];

    if (!container) return;

    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        if (!response.ok) throw new Error('Failed to load projects');
        
        const repos = await response.json();

        container.innerHTML = '';

        repos.forEach(repo => {
            if (repo.fork) return; 

            if (excludedRepos.includes(repo.name)) return;
            
            //if (!repo.topics.includes('portfolio')) return;

            const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/preview.png`;

            const card = document.createElement('div');
            card.classList.add('project-card');

            card.innerHTML = `
                <h3 class="project-title">${repo.name}</h3>
                
                <div class="project-images">
                    <img src="${imageUrl}" 
                         alt="${repo.name} preview" 
                         onerror="if (this.src.endsWith('.png')) { this.src = this.src.replace('.png', '.PNG'); } else { this.parentElement.style.display='none'; }"
                         style="width: 100%; height: auto; border-radius: 5px; margin-bottom: 10px; display: block;">
                </div>

                <p class="project-description">${repo.description || "No description provided."}</p>
                
                <div class="project-links">
                    <a href="${repo.html_url}" class="btn" target="_blank">View Code</a>
                    ${repo.homepage ? `<a href="${repo.homepage}" class="btn" target="_blank">Live Demo</a>` : ''}
                </div>
            `;

            container.appendChild(card);
        });
        
        initProjects(); 

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p class="section-text">Could not load projects from GitHub.</p>';
    }
}

function initProjects() {
    const scrollContainer = document.querySelector(".projects-container");
    const leftButton = document.querySelector(".scroll-button.left");
    const rightButton = document.querySelector(".scroll-button.right");
    const firstCard = scrollContainer ? scrollContainer.querySelector(".project-card") : null;

    if (!leftButton || !rightButton || !scrollContainer || !firstCard) {
        console.warn("Scroll elements or project cards not found. Scroll logic skipped.");
        return;
    }

    let scrollAmount = calculateScrollAmount();

    function handleScroll(direction) {
        // Temporarily disable buttons
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

    const newRight = rightButton.cloneNode(true);
    const newLeft = leftButton.cloneNode(true);
    rightButton.parentNode.replaceChild(newRight, rightButton);
    leftButton.parentNode.replaceChild(newLeft, leftButton);

    newRight.addEventListener("click", function () {
        handleScroll('right');
    });

    newLeft.addEventListener("click", function () {
        handleScroll('left');
    });

    function updateButtonVisibility() {
        const maxScrollLeft = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const tolerance = 5; 

        // Update button states based on scroll position
        newLeft.disabled = scrollContainer.scrollLeft <= 0;
        newRight.disabled = scrollContainer.scrollLeft >= (maxScrollLeft - tolerance);
    }

    scrollContainer.addEventListener("scroll", debounce(updateButtonVisibility, 50));

    function ensureSingleCardVisible() {
        if (!scrollContainer.querySelector(".project-card")) return;
        const cardWidth = scrollContainer.querySelector(".project-card").offsetWidth;
        const scrollLeft = scrollContainer.scrollLeft;
        const cardIndex = Math.round(scrollLeft / cardWidth);
        scrollContainer.scrollTo({
            left: cardWidth * cardIndex,
            behavior: 'smooth'
        });
    }

    updateButtonVisibility();

    window.addEventListener('resize', function () {
        scrollAmount = calculateScrollAmount();
        ensureSingleCardVisible();
        updateButtonVisibility();
    });
}

function calculateScrollAmount() {
    const scrollContainer = document.querySelector(".projects-container");
    if (!scrollContainer) return 0;
    
    const card = scrollContainer.querySelector(".project-card");
    if (!card) return 0;

    const cardWidth = card.offsetWidth;
    const containerWidth = scrollContainer.clientWidth;

    return Math.min(cardWidth, containerWidth); 
}

const contactForm = document.getElementById("contact-form");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); 
        const form = event.target;
        const formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
            mode: "no-cors"
        }).then(() => {
            document.getElementById("form-status").innerText = "Thank you! Your message has been sent.";
            document.getElementById("form-status").style.color = "hsl(162, 92%, 50%)";
            form.reset();
        }).catch(error => {
            document.getElementById("form-status").innerText = "Oops! There was a problem sending your message.";
            document.getElementById("form-status").style.color = "hsl(0, 100%, 60%)";
        });
    });
}