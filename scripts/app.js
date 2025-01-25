/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     app.js
 *     2025-01-24
 *********************/
"use strict";

// IIFE - Immediately Invoked Functional Expression
(function () {

    /**
     * Function to add the dynamic changes to nav bar
     * this function adds donate link, and changes opportunities tab to volunteer now
     */
    function addDynamicNavbarFeatures() {
        // Creates donation tab unless your currently on donate, this prevents it from duplicating
        if (document.title !== "Donate") {
            const donateLink = '<li class="nav-item donate-link"><a class="nav-link" href="donate.html"><i class="fa-solid fa-donate"></i> Donate</a></li>';
            const navbarNav = $('#mainNavbar .navbar-nav');
            navbarNav.append(donateLink);
        }

        // Change "Opportunities" tab to "Volunteer Now."
        $('#opportunitiesLink').text('Volunteer Now.');
    }

    /**
     * highlights the active page with a grey background
     */
    function highlightActivePage() {
        const currentPath = window.location.pathname.split("/").pop();
        $('#mainNavbar .navbar-nav .nav-link').each(function () {
            const href = $(this).attr('href');
            if (href === currentPath) {
                $(this).addClass('active');
            } else {
                $(this).removeClass('active');
            }
            //when class is set to active, style.css turns tab background to grey and text to white
        });
    }

    /**
     * Function to handle contact form submissions
     */
    function displayContactPage() {
        let sendButton = document.getElementById("sendButton");
        sendButton.addEventListener("click", function () {
            let contact = new Contact(fullName.value, contactNumber.value, emailAddress.value);
            if (contact.serialize()) {
                const key = `contact_${Date.now()}`;
                localStorage.setItem(key, contact.serialize());
            }
        });
    }

    /**
     * Function to scroll to the top of the screen, behavior is smooth
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     *Function to create the back to top button
     */
    function createBackToTopButton() {

        // Creates the actual button
        const button = $('<button id="backToTopBtn" title="Back to Top"><i class="fas fa-chevron-up"></i> Back to Top</button>');

        // Appends button
        $('body').append(button);

        //  CSS styling for button properties, there's also styling in style.css
        button.css({
            display: 'none',
            position: 'fixed',
            bottom: '20px',
            right: '30px',
            zIndex: '99',
            fontSize: '18px',
            border: 'none',
            outline: 'none',
            backgroundColor: 'grey',
            color: 'white',
            cursor: 'pointer',
            padding: '15px',
            borderRadius: '4px'
        });

        // show/hides button depending on how scrolled user is.
        // option to scroll to top is only given if they are not at the top
        $(window).scroll(function () {
            if ($(window).scrollTop() > 200) {
                button.fadeIn();
            } else {
                button.fadeOut();
            }
        });

        //  when the button is actually clicked, scrollToTop() is ran
        button.click(function () {
            scrollToTop();
        });
    }

    /**
     * on startup function calls all dynamic functions
     * @constructor
     */
    function Start() {
        addDynamicNavbarFeatures();
        highlightActivePage();
        createBackToTopButton();

        if (document.title === "Contact") {
            displayContactPage();
        }
    }

    window.addEventListener("load", Start);
})();
