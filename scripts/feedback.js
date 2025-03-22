/*********************
 *     Grant Heath
 *     Student ID: 100925634
 *     Date Completed: 2025-03-22
 *
 *     Volunteer Connect Project
 *     feedback.ts
 *
 *     Handles feedback form submission and stores data in local storage as an array
 *
 *     It creates one array called feedbackFile, which adds form data to it each time a form is submitted
 *********************/
"use strict";
document.addEventListener("DOMContentLoaded", () => {
    // Reference feedback form
    const feedbackForm = document.getElementById("feedbackForm");
    if (!feedbackForm) {
        console.warn("[WARN] Feedback form not found in the DOM.");
        return; // Stop execution if the form isn't found
    }
    // Key for local storage
    const feedbackFile = "feedbackData";
    // Event listener for submit button
    feedbackForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // Get form data (name, email, and feedback)
        const formData = new FormData(feedbackForm);
        const name = formData.get("name");
        const email = formData.get("email");
        const feedback = formData.get("feedback");
        if (!name || !email || !feedback) {
            console.error("[ERROR] Missing form data: name, email, or feedback.");
            alert("Please fill out all fields.");
            return;
        }
        // Append data to the array which gets added to local storage
        const feedbackData = {
            name,
            email,
            feedback,
        };
        // Load existing feedback data from localStorage or initialize an empty array
        let feedbackList = [];
        if (localStorage.getItem(feedbackFile)) {
            try {
                feedbackList = JSON.parse(localStorage.getItem(feedbackFile) || "[]");
            }
            catch (error) {
                console.error("[ERROR] Invalid JSON in localStorage:", error);
                feedbackList = [];
            }
        }
        feedbackList.push(feedbackData); // Add the new feedback data to the array
        // Save the updated array to localStorage
        localStorage.setItem(feedbackFile, JSON.stringify(feedbackList));
        console.log("Feedback Data Array:", feedbackList); // Debug: log feedback data array
        // Display confirmation modal with submitted details
        const modalName = document.getElementById("modalName");
        const modalEmail = document.getElementById("modalEmail");
        const modalFeedback = document.getElementById("modalFeedback");
        const confirmationModalElement = document.getElementById("confirmationModal");
        if (!modalName || !modalEmail || !modalFeedback || !confirmationModalElement) {
            console.error("[ERROR] Modal elements not found in the DOM.");
            alert("An error occurred while displaying the confirmation.");
            return;
        }
        modalName.innerText = name;
        modalEmail.innerText = email;
        modalFeedback.innerText = feedback;
        const confirmationModal = new bootstrap.Modal(confirmationModalElement);
        confirmationModal.show();
        // Clear the form
        feedbackForm.reset();
    });
});
//# sourceMappingURL=feedback.js.map