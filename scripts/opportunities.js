/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     opportunities.ts
 *     2025-03-22
 *
 *     Populates and animates the opportunities.html page using data from community_events.json and animations from anime.js.
 *********************/
"use strict";
let opportunities = [];
/**
 * Initialize the Opportunities Page
 * This function runs dynamically after the route is loaded.
 */
function initializeOpportunitiesPage() {
    console.log("[INFO] Initializing Opportunities Page...");
    // Inject the location modal (if needed)
    if (!document.getElementById("locationModal")) {
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
    }
    // Get the opportunities list container
    const opportunitiesList = document.getElementById("opportunities-list");
    if (!opportunitiesList) {
        console.error("[ERROR] Element with ID 'opportunities-list' not found!");
        return;
    }
    // Fetch data from community_events.json and display it
    fetch('data/community_events.json')
        .then((response) => response.json())
        .then((data) => {
        opportunities = data.opportunities;
        displayOpportunities(opportunities);
    })
        .catch((error) => {
        console.error("[ERROR] Error fetching opportunities:", error);
    });
    // Attach search function to the search bar
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("input", searchFunction);
    }
    else {
        console.error("[ERROR] Search bar with ID 'searchBar' not found!");
    }
    // Attach event listener to the sign-up form
    const signUpForm = document.getElementById("signUpForm");
    if (signUpForm) {
        signUpForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const userName = document.getElementById("userName")?.value;
            const userEmail = document.getElementById("userEmail")?.value;
            const userRole = document.getElementById("userRole")?.value;
            if (userName && userEmail && userRole) {
                const popupBody = document.querySelector("#signUpPopup .modal-body");
                if (popupBody) {
                    popupBody.innerHTML = `<p>Thank you for signing up! You will be redirected to the home page shortly.</p>`;
                }
                setTimeout(() => {
                    console.log("[INFO] Redirecting to home...");
                }, 5000);
                signUpForm.reset();
            }
            else {
                alert("Please fill out all fields.");
            }
        });
    }
    else {
        console.error("[ERROR] Sign-up form not found!");
    }
}
/**
 * Display Opportunities Function
 * @param filteredOpportunities - List of filtered opportunities
 */
function displayOpportunities(filteredOpportunities) {
    const opportunitiesList = document.getElementById("opportunities-list");
    if (!opportunitiesList) {
        console.error("[ERROR] Opportunities list container not found!");
        return;
    }
    opportunitiesList.innerHTML = ''; // Clear previous results
    filteredOpportunities.forEach((opportunity) => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4 opportunity-card";
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
        opportunitiesList.appendChild(card);
    });
    // Animate the opportunity cards using Anime.js
    anime({
        targets: '.opportunity-card',
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1000,
        easing: 'easeOutQuad',
        delay: anime.stagger(100),
    });
}
/**
 * Search Function
 */
function searchFunction() {
    const searchBar = document.getElementById("searchBar");
    if (!searchBar) {
        console.error("[ERROR] Search bar not found!");
        return;
    }
    const input = searchBar.value.toUpperCase();
    const filteredOpportunities = opportunities.filter((opportunity) => opportunity.title.toUpperCase().includes(input));
    displayOpportunities(filteredOpportunities);
}
/**
 * Set Popup Data Function
 * @param title - The title of the opportunity
 */
function setPopupData(title) {
    const popupTitle = document.getElementById("signUpPopupLabel");
    if (popupTitle) {
        popupTitle.textContent = `Sign Up for ${title}`;
    }
    else {
        console.error("[ERROR] Popup title element not found!");
    }
}
/**
 * View Location Function
 * Gets coordinates from OpenCage Geocoder API using the apiKey located in OpenCageGeoCodingAPIKEY.txt file
 * @param address
 */
function viewLocation(address) {
    console.log("[INFO] Fetching coordinates for address:", address);
    fetch('data/OpenCageGeoCodingAPIKEY')
        .then((response) => response.text())
        .then((apiKey) => {
        return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${apiKey}`);
    })
        .then((response) => response.json())
        .then((data) => {
        if (data.results && data.results[0]?.geometry) {
            const { lat, lng } = data.results[0].geometry;
            const coordinates = `Latitude: ${lat}, Longitude: ${lng}`;
            const modalBody = document.getElementById('locationModalBody');
            if (modalBody) {
                modalBody.innerHTML = `<p>Address: ${address}</p><p>Coordinates: ${coordinates}</p>`;
            }
            const locationModal = new bootstrap.Modal(document.getElementById('locationModal'));
            locationModal.show();
        }
        else {
            alert('Error fetching coordinates. Please try again later.');
        }
    })
        .catch((error) => {
        console.error('[ERROR] Error fetching coordinates:', error);
        alert('Error fetching coordinates. Please try again later.');
    });
}
// Listen for route changes to initialize the opportunity page
document.addEventListener("routeLoaded", (event) => {
    const customEvent = event;
    if (customEvent.detail === "/opportunities") {
        initializeOpportunitiesPage();
    }
});
//# sourceMappingURL=opportunities.js.map