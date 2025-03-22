export function initializeEventPlanning() {
    console.log("[DEBUG] event-planning.js is starting...");

    const eventForm = document.getElementById("eventForm");
    if (eventForm) {
        console.log("[DEBUG] eventForm found.");
        eventForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("[INFO] Form submitted.");

            const eventTitle = document.getElementById("eventTitle").value.trim();
            const eventDateTime = document.getElementById("eventDateTime").value.trim();
            const eventAddress = document.getElementById("eventAddress").value.trim();
            const eventCategory = document.getElementById("eventCategory").value.trim();
            const eventDescription = document.getElementById("eventDescription").value.trim();

            const newEvent = {
                title: eventTitle,
                dateTime: eventDateTime,
                address: eventAddress,
                category: eventCategory,
                description: eventDescription,
            };

            console.log("[INFO] New Event Data from User:", newEvent);

            await addEventToJson(newEvent);
            e.target.reset();
            alert("Your event has been added successfully!");
            loadEvents();
        });
    } else {
        console.error("[ERROR] eventForm not found in the DOM.");
    }

    const eventList = document.getElementById("eventList");
    if (eventList) {
        console.log("[DEBUG] eventList found.");
        loadEvents();
    } else {
        console.error("[ERROR] eventList not found in the DOM.");
    }
}

async function addEventToJson(event) {
    try {
        const response = await fetch("/add-event", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            throw new Error("Failed to add the event.");
        }

        console.log("[INFO] Event successfully sent to the server.");
    } catch (error) {
        console.error("[ERROR] Could not send the event:", error);
    }
}

async function loadEvents() {
    try {
        const response = await fetch("data/community_events.json");
        if (!response.ok) {
            throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const data = await response.json();
        const eventList = document.getElementById("eventList");

        if (!eventList) {
            console.error("[ERROR] eventList not found in the DOM.");
            return;
        }

        eventList.innerHTML = "";

        data.opportunities.forEach((event) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${event.title}</strong> <br>
                ${event.dateTime} <br>
                Location: ${event.address} <br>
                Category: ${event.category} <br>
                <p>${event.description}</p>
            `;
            eventList.appendChild(listItem);
        });

        console.log("[INFO] Events loaded successfully.");
    } catch (error) {
        console.error("[ERROR] Could not load events:", error);
    }
}