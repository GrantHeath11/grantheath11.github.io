/*********************
 *     Grant Heath
 *     Student ID: 100925634
 *     Date Completed: 2025-03-22
 *
 *     Volunteer Connect Project
 *     event-planning.ts
 *
 *     page for adding events to the events list
 *     validation is not working fully, and the page doesn't add to the JSON file
 *
 *********************/
// Function to initialize the event planning logic
import { validateEventForm } from "./event-planning-validation.js";
export function initializeEventPlanning() {
    document.addEventListener("DOMContentLoaded", () => {
        const eventForm = document.getElementById("eventForm");
        if (!eventForm) {
            console.error("[ERROR] Form not found! Please ensure 'eventForm' exists in the DOM.");
            return;
        }
        // Add submit event listener to the form
        eventForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent default form submission behavior
            // Retrieve data from the form fields
            const eventTitle = document.getElementById("eventTitle")?.value.trim();
            const eventDateTime = document.getElementById("eventDateTime")?.value.trim();
            const eventAddress = document.getElementById("eventAddress")?.value.trim();
            const eventCategory = document.getElementById("eventCategory")?.value.trim();
            const eventDescription = document.getElementById("eventDescription")?.value.trim();
            const eventData = {
                title: eventTitle,
                dateTime: eventDateTime,
                address: eventAddress,
                category: eventCategory,
                description: eventDescription,
            };
            // Validate the data using the validation function
            const isValid = validateEventForm(eventData);
            if (!isValid) {
                console.warn("[WARN] Validation failed. Form submission blocked.");
                return; // Block submission if validation fails
            }
            // If validation passes, allow the form submission logic
            console.log("[INFO] Validation passed. Proceeding with form submission...");
            eventForm.reset();
            alert("Your event has been submitted successfully!");
            //add data to JSON which I cannot figure out how to do with ts or js
        });
    });
}
//# sourceMappingURL=event-planning.js.map