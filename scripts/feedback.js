/*********************
 *     Grant Heath
 *     Student ID: 100925634
 *     Date Completed: 2025-02-19
 *
 *     Volunteer Connect Project
 *     feedback.js
 *
 *     Handles feedback form submission and stores data in local storage as an array
 *
 *     It creates one array called feedbackFile, which adds form data to it each time a form is submitted
 *********************/

document.addEventListener("DOMContentLoaded", function() {

    // references feedback form
    const feedbackForm = document.getElementById('feedbackForm');

    // key for local storage
    const feedbackFile = 'feedbackData';

    // event listener for submit button
    feedbackForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form data (name, email, and feedback)
        const formData = new FormData(feedbackForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const feedback = formData.get('feedback');

        // Append data to the array which gets added to local storage
        const feedbackData = {
            name: name,
            email: email,
            feedback: feedback,
        };

        // Load existing feedback data from localStorage or initialize an empty array
        let feedbackList = [];
        if (localStorage.getItem(feedbackFile)) {
            feedbackList = JSON.parse(localStorage.getItem(feedbackFile));
        }
        feedbackList.push(feedbackData);    // adds the new feedback data to the feedback array

        // Save the updated array to localStorage
        localStorage.setItem(feedbackFile, JSON.stringify(feedbackList));

        console.log('Feedback Data Array:', feedbackList); // Debug: log feedback data array

        // Display confirmation modal with submitted details
        document.getElementById('modalName').innerText = name;
        document.getElementById('modalEmail').innerText = email;
        document.getElementById('modalFeedback').innerText = feedback;

        const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        confirmationModal.show();

        // Clear the form
        feedbackForm.reset();
    });
});
