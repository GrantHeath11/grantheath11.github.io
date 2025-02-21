/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     events.js
 *     2025-02-19
 *
 *     Populates the Calendar in events.html using community_events.json for its data file
 *********************/

$(document).ready(function() {

    /**
     * Saves variable today to the current date, using ISO format for the calendar (YYYY-MM-DD)
     * @type {string}
     */
    const today = new Date().toISOString().split('T')[0];

    /**
     * Function to fetch and display events based on selected category
     * @param {string} category - The selected category to filter events
     */
    function fetchAndDisplayEvents(category) {
        // Fetch data from community_events.json
        fetch('data/community_events.json')
            .then(response => response.json())
            .then(data => {
                // Format the opportunities so they fit into the FullCalendar calendar.
                const events = data.opportunities
                    .filter(opportunity => category === 'all' || opportunity.category === category)
                    .map(opportunity => {
                        const dateTime = new Date(opportunity.dateTime);
                        // Convert the dateTime to ISO 8601 format using Moment.js
                        const ISO_FormattedDate = moment(dateTime).format('YYYY-MM-DDTHH:mm:ss');
                        // Create an event object for each opportunity
                        return {
                            title: opportunity.title,
                            start: ISO_FormattedDate,
                            description: opportunity.description,
                            category: opportunity.category
                        };
                    });

                // Destroy the existing calendar and initialize the fullCalendar with the fetched events
                $('#calendar').fullCalendar('destroy'); // Destroy the existing calendar

                $('#calendar').fullCalendar({
                    // Nav buttons and view options formatting
                    header: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'month,agendaWeek,agendaDay'
                    },
                    // Sets the default date to today
                    defaultDate: today,
                    // Enables navigation links for day/week/month views
                    navLinks: true,
                    events: events, // Use the fetched events here
                    // Was displaying just time then the first letter for either AM or PM,
                    // so I specified formatting here:
                    timeFormat: "h:mm A"
                });
            })
            .catch(error => console.error('Error fetching opportunities:', error));
    }

    // Initial fetch and display of events with category 'all'
    fetchAndDisplayEvents('all');

    // Add event listener to the category filter dropdown
    $('#event-category').change(function() {
        const selectedCategory = $(this).val();
        fetchAndDisplayEvents(selectedCategory);
    });
});
