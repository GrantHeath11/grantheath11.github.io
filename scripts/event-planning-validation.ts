/*********************
 *     Grant Heath
 *     Student ID: 100925634
 *     Date Completed: 2025-03-22
 *
 *     Volunteer Connect Project
 *     event-planning-validation.ts
 *
 *    validation page for the event-planning form
 *
 *********************/

interface Event {
    title: string;
    dateTime: string;
    address: string;
    category: string;
    description: string;
}

export function validateEventForm(event: Event): boolean {
    const { title, dateTime, address, category, description } = event;

    const currentDateTime = new Date(); // Current date and time

    // Validate Title: Must not exceed 100 characters
    if (!title || title.length === 0 || title.length > 100) {
        alert("Event Title is required and must be under 100 characters.");
        return false;
    }

    // Validate Date & Time: Must not be in the past
    const eventDate = new Date(dateTime);
    if (isNaN(eventDate.getTime())) {
        alert("Please enter a valid date and time.");
        return false;
    } else if (eventDate < currentDateTime) {
        alert("The event date and time must be in the future.");
        return false;
    }

    // Validate Address: Must not be empty
    if (!address || address.length === 0) {
        alert("Event Address is required.");
        return false;
    }

    // Validate Category: Must be selected
    if (!category || category.length === 0) {
        alert("Event Category is required.");
        return false;
    }

    // Validate Description: Must not be empty
    if (!description || description.length === 0) {
        alert("Event Description is required.");
        return false;
    }

    return true;
}