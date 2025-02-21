/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     gallery.js
 *     2025-02-19
 *
 *     Populates the Gallery page using event_photos.json using a lightbox.
 *********************/

$(document).ready(function() {
    /**
     * Fetches gallery images from the JSON file and displays them in the gallery section
     */

        fetch('data/event_photos.json')
            .then(response => response.json())
            .then(data => {
                const gallery = $('#gallery');
                data.photos.forEach(photo => {
                    const photoElement = `
                        <div class="col-md-4 mb-4">
                            <a href="${photo.url}" data-lightbox="gallery" data-title="${photo.title}">
                                <img src="${photo.url}" class="img-fluid" alt="${photo.title}">
                            </a>
                        </div>
                    `;
                    gallery.append(photoElement);
                });
            })
            .catch(error => console.error('[ERROR] issue fetching photos', error));

});
