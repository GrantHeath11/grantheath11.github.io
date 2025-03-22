/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     events.ts
 *     2025-03-22
 *
 *     Populates the Calendar in events.html using community_events.json for its data file
 *********************/
"use strict";
function initializeEventsPage() {
    console.log("[INFO] Initializing Events Page...");
    /**
     * Current date in ISO format (YYYY-MM-DD)
     */
    const today = new Date().toISOString().split("T")[0];
    /**
     * Fetch and display events based on selected category
     * @param category - The selected category to filter events
     */
    function fetchAndDisplayEvents(category) {
        fetch("data/community_events.json")
            .then((response) => response.json())
            .then((data) => {
            const events = data.opportunities
                .filter((opportunity) => category === "all" || opportunity.category === category)
                .map((opportunity) => {
                // Convert dateTime to ISO 8601 format
                const dateTime = new Date(opportunity.dateTime);
                if (isNaN(dateTime.getTime())) {
                    console.error(`[ERROR] Invalid dateTime: ${opportunity.dateTime}`);
                    return null; // Skip invalid events
                }
                return {
                    title: opportunity.title,
                    start: dateTime.toISOString(), // Convert to ISO format
                    description: opportunity.description,
                    category: opportunity.category,
                };
            })
                .filter((event) => event !== null); // Remove invalid events
            console.log("[DEBUG] Events to be rendered:", events); // Debug log
            const calendarEl = document.getElementById("calendar");
            if (!calendarEl) {
                console.error("[ERROR] Calendar element not found!");
                return;
            }
            // Destroy and reinitialize the calendar
            if (calendarEl._fullCalendarInstance) {
                calendarEl._fullCalendarInstance.destroy();
            }
            const calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: "dayGridMonth",
                headerToolbar: {
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay",
                },
                events: events, // Add the formatted events
                navLinks: true,
                eventTimeFormat: {
                    hour: "2-digit",
                    minute: "2-digit",
                    meridiem: "short",
                },
            });
            calendar.render();
            calendarEl._fullCalendarInstance = calendar;
            console.log("[INFO] Calendar rendered successfully.");
        })
            .catch((error) => {
            console.error("[ERROR] Error fetching events data:", error);
        });
    }
    // Fetch and display all events initially
    fetchAndDisplayEvents("all");
    // Add event listener to the category filter dropdown
    const categoryDropdown = document.getElementById("event-category");
    if (categoryDropdown) {
        categoryDropdown.addEventListener("change", (event) => {
            const selectedCategory = event.target.value;
            fetchAndDisplayEvents(selectedCategory);
        });
    }
    else {
        console.error("[ERROR] Event category dropdown not found!");
    }
}
// Listen for route changes and initialize the events page dynamically
document.addEventListener("routeLoaded", (event) => {
    const customEvent = event;
    if (customEvent.detail === "/events") {
        initializeEventsPage();
    }
});
//# sourceMappingURL=events.js.map