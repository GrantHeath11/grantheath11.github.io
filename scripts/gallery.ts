/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     gallery.ts
 *     2025-03-20
 *
 *     Populates the Gallery page using event_photos.json using a lightbox.
 *********************/

"use strict";

interface Photo {
    url: string;
    title: string;
}

function initializeGalleryPage(): void {
    console.log("[INFO] Initializing Gallery Page...");

    /**
     * Fetches gallery images from the JSON file and displays them in the gallery section.
     */
    fetch("data/event_photos.json")
        .then((response) => response.json())
        .then((data: { photos: Photo[] }) => {
            const gallery = document.getElementById("gallery") as HTMLElement;
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

// Extend DocumentEventMap to support custom events
interface DocumentEventMap {
    routeLoaded: CustomEvent<string>;
}

// Listen for route changes to initialize the gallery page dynamically
document.addEventListener("routeLoaded", (event: CustomEvent<string>) => {
    if (event.detail === "/gallery") {
        initializeGalleryPage();
    }
});