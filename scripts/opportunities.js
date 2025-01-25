/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     opportunities.js
 *     2025-01-24
 *********************/

document.addEventListener("DOMContentLoaded", function() {

    /**
     * Array of volunteer opportunities
     * @type {[{title: string, description: string, dateTime: string},{title: string, description: string, dateTime: string},{title: string, description: string, dateTime: string}]}
     */
    const opportunities = [
        {
            title: "Tree Planting Event",
            description: "Join us planting trees in the park!",
            dateTime: "March 1st, 2025, 10:30 AM",
        },
        {
            title: "Soup Kitchen Help",
            description: "Help prep, cook, and clean up for dinner.",
            dateTime: "March 22, 2025, 5:00 PM",
        },
        {
            title: "Beach Cleanup",
            description: "Help clean up the beach.",
            dateTime: "March 25, 2025, 9:00 AM",
        },
        {
            title: "Halloween Charity Event in the Park",
            description: "We are running a charity event in the park to raise donations for Ronald McDonald House. \
                          All volunteers are encouraged to come in costume. \
                          We are looking for Cooks, Actors, Greeters, and anyone willing to help with cleanup after.",
            dateTime: "October 31, 2025, 8:00 PM"
        }
    ];

    /**
     * Get the HTML element where the opportunities will be displayed
     * @type {HTMLElement}
     */
    const opportunitiesList = document.getElementById("opportunities-list");

    // Creates a card for each opportunity in the array
    opportunities.forEach(opportunity => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4 opportunity-card"; // Bootstrap classes for layout and margin
        // HTML for card layout
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${opportunity.title}</h5>
                    <p class="card-text">${opportunity.description}</p>
                    <p class="card-text"><small class="text-muted">${opportunity.dateTime}</small></p>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signUpPopup" onclick="setPopupData('${opportunity.title}')">Sign Up</button>
                </div>
            </div>
        `;
        // Append the card to the opportunity list
        opportunitiesList.appendChild(card);
    });

    // Animate the opportunity cards when loaded using Anime.js
    // I used Copilot to figure this out
    anime({
        targets: '.opportunity-card',
        opacity: [0, 1], // Fade in effect
        translateY: [-50, 0], // Slide up effect
        duration: 1000, // Animation duration in milliseconds
        easing: 'easeOutQuad', // Easing function
        delay: anime.stagger(100) // Stagger the animation for each card
    });
});

/**
 * Function to set the title of the sign-up popup with the opportunity title
 * @param {string} title - The title of the opportunity
 */
function setPopupData(title) {
    const popupTitle = document.getElementById("signUpPopupLabel");
    popupTitle.textContent = `Sign Up for ${title}`;
}

/**
 * Sign up form submission validation
 * @type {HTMLElement}
 */
const signUpForm = document.getElementById("signUpForm");
signUpForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get form values
    const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("userEmail").value;
    const userRole = document.getElementById("userRole").value;

    // Simple form validation
    if (userName && userEmail && userRole) {
        // Display a thank you message directly in the form
        const popupBody = document.querySelector("#signUpPopup .modal-body");
        popupBody.innerHTML = `<p>Thank you for signing up! You will be redirected to the home page shortly.</p>`;

        // Redirect to home page after 5 seconds
        setTimeout(function() {
            window.location.href = "index.html"; // Redirect to home page
        }, 5000); // 5000 milliseconds = 5 seconds

        // Hide the form
        signUpForm.reset(); // Reset the form fields
    } else {
        alert("Please fill out all fields."); // Alert if any fields are empty
    }
});
