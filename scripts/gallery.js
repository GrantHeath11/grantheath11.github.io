/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     gallery.js
 *     2025-03-20
 *
 *     Populates the Gallery page using event_photos.json using a lightbox.
 *********************/

function initializeGalleryPage() {
    console.log("[INFO] Initializing Gallery Page...");

    /**
     * Fetches gallery images from the JSON file and displays them in the gallery section.
     */
    fetch("data/event_photos.json")
        .then((response) => response.json())
        .then((data) => {
            const gallery = document.getElementById("gallery");
            if (!gallery) {
                console.error("[ERROR] Gallery element not found!");
                return;
            }

            gallery.innerHTML = ""; // Clear existing content in case of re-initialization
            data.photos.forEach((photo) => {
                const photoElement = document.createElement("div");
                photoElement.className = "col-md-4 mb-4";
                photoElement.innerHTML = `
                    <a href="${photo.url}" data-lightbox="gallery" data-title="${photo.title}">
                        <img src="${photo.url}" class="img-fluid" alt="${photo.title}">
                    </a>
                `;
                gallery.appendChild(photoElement);
            });

            console.log("[INFO] Gallery populated successfully.");
        })
        .catch((error) => console.error("[ERROR] Issue fetching photos:", error));
}

// Listen for route changes to initialize the gallery page dynamically
document.addEventListener("routeLoaded", (event) => {
    if (event.detail === "/gallery") {
        initializeGalleryPage();
    }
});
