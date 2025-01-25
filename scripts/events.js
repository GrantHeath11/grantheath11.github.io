/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     events.js
 *     2025-01-24
 *********************/

$(document).ready(function()
{

    /**
     * saves variable today to the current date
     * @type {string}
     */
    const today = new Date().toISOString().split('T')[0];

    // initializes .full calender onto #calender variable
    $('#calendar').fullCalendar({
        //nav buttons and view options formatting
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        //  Sets the default date to today
        defaultDate: today,
        // Enables navigation links for day/week/month views
        navLinks: true,
        events: [
            {
                title: 'Tree Planting Event',
                start: '2025-02-20T10:00:00'
            },
            {
                title: 'Soup Kitchen Help',
                start: '2025-02-22T17:00:00'
            },
            {
                title: 'Beach Cleanup',
                start: '2025-01-25T08:00:00'
            },
            {
                title: 'Charity Fundraiser',
                start: '2025-10-31T20:00:00'
            }
        ]
    });
});
