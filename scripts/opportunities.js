/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     opportunities.js
 *     2025-02-19
 *
 *     Populates and animates the opportunities.html page using data from community_events.json and anime.js.
 *********************/

// Load opportunities from JSON file
let opportunities = [];

/**
 * function that is executed when the dom is loaded
 */
document.addEventListener("DOMContentLoaded", function() {
    document.body.innerHTML += `
        <!-- Modal -->
        <div class="modal fade" id="locationModal" tabindex="-1" aria-labelledby="locationModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
              <!-- location popup -->
                <h5 class="modal-title" id="locationModalLabel">Location Details</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body" id="locationModalBody">
                <!-- Location details will be populated here -->
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
    `;

    // Get the HTML element where the opportunities will be displayed
    const opportunitiesList = document.getElementById("opportunities-list");

    // Fetch data from community_events.json
    fetch('data/community_events.json')
        .then(response => response.json())
        .then(data => {
            opportunities = data.opportunities;
            displayOpportunities(opportunities);

            // Perform search if there's a query in the URL
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('query');
            if (query) {
                document.getElementById('searchBar').value = query;
                searchFunction();
            }
        })
        .catch(error => console.error('Error fetching opportunities:', error));

    // Attach search function to the search bar
    document.getElementById('searchBar').addEventListener('input', searchFunction);

});


/**
 * Defines the viewLocation function
 * Gets coordinates from OpenCage Geocoder API using the apiKey which is located in OpenCageGeoCodingAPIKEY.txt file
 * @param address
 */
function viewLocation(address) {
    console.log("Function triggered with address:", address);
    // Fetch the API key from OpenCageGeoCodingAPIKEY.txt file
    fetch('data/OpenCageGeoCodingAPIKEY')
        .then(response => response.text())
        .then(apiKey => {
            console.log("API Key:", apiKey);
            // Fetch coordinates using OpenCage Geocoder API
            fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.results && data.results[0] && data.results[0].geometry) {
                        const {lat, lng} = data.results[0].geometry;
                        const coordinates = `Latitude: ${lat}, Longitude: ${lng}`;
                        // Populate the modal body with address and coordinates
                        const modalBody = document.getElementById('locationModalBody');
                        modalBody.innerHTML = `<p>Address: ${address}</p><p>Coordinates: ${coordinates}</p>`;
                        // Show the modal
                        const locationModal = new bootstrap.Modal(document.getElementById('locationModal'));
                        locationModal.show();
                    } else {
                        console.error('Error: Invalid data received from OpenCage API', data);
                        alert('Error fetching coordinates. Please try again later.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching coordinates:', error);
                    alert('Error fetching coordinates. Please try again later.');
                });
        })
        .catch(error => {
            console.error('Error fetching API key:', error);
            alert('Error fetching API key. Please try again later.');
        });
}

/**
 * Function to display opportunities on the page
 * @param {Array} filteredOpportunities - List of filtered opportunities
 */
function displayOpportunities(filteredOpportunities) {
    const opportunitiesList = document.getElementById("opportunities-list");
    opportunitiesList.innerHTML = ''; // Clear previous results

    filteredOpportunities.forEach(opportunity => {
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
                    <button class="btn btn-secondary" onclick="viewLocation('${opportunity.address}')">View Location</button>
                </div>
            </div>
        `;
        // Append the card to the opportunity list
        opportunitiesList.appendChild(card);
    });

    // Animate the opportunity cards when loaded using Anime.js
    anime({
        targets: '.opportunity-card',
        opacity: [0, 1], // Fade in effect
        translateY: [-50, 0], // Slide up effect
        duration: 1000, // Animation duration in milliseconds
        easing: 'easeOutQuad', // Easing function
        delay: anime.stagger(100) // Stagger the animation for each card
    });
}

/**
 * Search function to filter opportunities based on user input
 */
function searchFunction() {
    const input = document.getElementById('searchBar').value.toUpperCase();
    const filteredOpportunities = opportunities.filter(opportunity =>
        opportunity.title.toUpperCase().includes(input)
    );
    displayOpportunities(filteredOpportunities);
}

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
        // Display a thank-you message directly in the form
        const popupBody = document.querySelector("#signUpPopup .modal-body");
        popupBody.innerHTML = `<p>Thank you for signing up! You will be redirected to the home page shortly.</p>`;

        // Redirect to the home page after 5 seconds
        setTimeout(function() {
            window.location.href = "index.html"; // Redirect to home page
        }, 5000); // 5000 milliseconds = 5 seconds

        // Hide the form
        signUpForm.reset(); // Reset the form fields
    } else {
        alert("Please fill out all fields."); // Alert if any fields are empty
    }
});
