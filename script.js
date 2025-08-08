// --- Logic for Landing Page (index.html) ---
const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        // Prevents the form from actually submitting
        event.preventDefault();
        // Redirects the user to the browse page
        window.location.href = 'browse.html';
    });
}

// --- Logic for Browse Page Navigation (browse.html) ---
document.addEventListener('DOMContentLoaded', () => {
    // This code will only run on the browse page where these elements exist
    const navLinks = document.querySelectorAll('.nav-link');
    const carousels = document.querySelectorAll('.movie-carousel');

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault(); // Stop the link from trying to navigate

                // Update the active class on nav links
                navLinks.forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');

                const category = link.dataset.category;

                // Filter the carousels
                carousels.forEach(carousel => {
                    const carouselCategory = carousel.dataset.category;
                    // Show the carousel if the category is 'all' or if it matches the link's category
                    if (category === 'all' || category === carouselCategory) {
                        carousel.style.display = 'block';
                    } else {
                        // Otherwise, hide it
                        carousel.style.display = 'none';
                    }
                });
            });
        });
    }

    // --- Hero Slideshow Logic ---
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 1) { // Only run if there's more than one slide
        let currentSlide = 0;

        setInterval(() => {
            // Hide current slide
            heroSlides[currentSlide].classList.remove('active');

            // Move to the next slide, looping back to the start if necessary
            currentSlide = (currentSlide + 1) % heroSlides.length;

            // Show next slide
            heroSlides[currentSlide].classList.add('active');
        }, 5000); // Change every 5 seconds
    }
});


// --- Logic for Browse Page (browse.html) ---

// A more organized way to store movie titles and their plots
const stories = {
    // Malayalam Action - Corrected
    action1: { title: "Big B", plot: "A silent, brooding guardian angel returns to his family, communicating only through stylish glares and perfectly aimed bullets." },
    action2: { title: "Beeshma Parvam", plot: "An epic tale of a family dynasty where every dinner is a potential power play and every secret has a sequel." },
    action3: { title: "Velyettan", plot: "The respected elder brother of a chaotic family spends his days solving their problems, which range from minor scuffles to full-blown village feuds." },
    action4: { title: "The Fight Club", plot: "An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more." },

    // Horror & Mystery
    horror1: { title: "A Classic Horror Story", plot: "In this grim fairy tale, five strangers traveling in a camper van crash in the woods and find themselves in a never-ending nightmare." },
    horror2: { title: "Curtains", plot: "A group of actresses are lured to a remote mansion for an audition, only to be picked off one by one by a masked killer." },
    horror3: { title: "Hidden", plot: "A family takes refuge in a fallout shelter to escape a dangerous outbreak, but soon realize the true horror may be inside with them." },
    horror4: { title: "Noseferatu", plot: "An ancient vampire brings the plague to a new town, driven by his obsession with an innocent woman." },
    horror5: { title: "Mirror", plot: "A malevolent entity uses a haunted mirror to terrorize a family, turning their reflections against them." },
    horror6: { title: "Shutter Island", plot: "A U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane. But nothing on the island is what it seems." },
    // Malayalam Drama & Romance - Corrected
    romance1: { title: "96", plot: "A nostalgic photographer meets his childhood sweetheart years later, only to discover their love story is stuck on 'rewind'." },
    romance2: { title: "Mathilukal", plot: "A political prisoner starts a romance with an unseen woman on the other side of a wall, proving that love knows no barriers, only bad acoustics." },
    romance3: { title: "Thattathin Marayathu", plot: "A boy falls for a girl from a different community and must win over her family, his friends, and the entire town with his charm and a trusty guitar." },
    // Critically Acclaimed Dramas
    drama4: { title: "The Green Mile", plot: "A gentle giant on death row possesses a miraculous gift, turning a prison guard's life upside down in this tale of compassion and consequence." },
    drama5: { title: "The Shawshank Redemption", plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency. Hope is a good thing." }
};

function showStory(movieKey) {
    const movieData = stories[movieKey];
    if (!movieData) {
        console.error("No story found for key:", movieKey);
        return;
    }

    document.getElementById("story-title").textContent = movieData.title;
    document.getElementById("story-text").textContent = movieData.plot;

    const popup = document.getElementById("story-popup");
    popup.classList.add("show");
    popup.style.display = "flex";
}

function closePopup() {
    const popup = document.getElementById("story-popup");
    popup.classList.remove("show");
    // We use a timeout to wait for the fade-out animation to finish before hiding the element
    setTimeout(() => {
        popup.style.display = "none";
    }, 300);
}

function showVideoPopup() {
    const popup = document.getElementById("video-popup");
    const video = document.getElementById("rick-video");
    if (popup && video) {
        popup.style.display = "flex";
        popup.classList.add("show");
        video.currentTime = 0; // Rewind to start
        video.play();
    }
}

function closeVideoPopup() {
    const popup = document.getElementById("video-popup");
    const video = document.getElementById("rick-video");
    if (popup && video) {
        popup.classList.remove("show");
        video.pause();
        // We use a timeout to wait for the fade-out animation to finish before hiding the element
        setTimeout(() => {
            popup.style.display = "none";
        }, 300);
    }
}