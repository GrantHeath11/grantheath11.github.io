/*********************
 *     Grant Heath
 *     Student ID: 100925634
 *     Date Completed: 2025-02-19
 *
 *     Volunteer Connect Project
 *     app.js
 *
 *     Main js file Volunteer Connect site
 *********************/
"use strict";

(function () {

    /**
     * Define the handleLogin function
     */
    function handleLogin() {
        const userName = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const messageArea = document.getElementById('messageArea');

        console.log('Entered UserName:', userName); // Debug: log entered userName
        console.log('Entered Password:', password); // Debug: log entered password

        const user = users.find(user => user.userName === userName && user._password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user.toJSON()));
            console.log('User logged in:', user.toJSON()); // Debug: log user logged in
            messageArea.innerHTML = `<div class="alert alert-success">Welcome, ${user.displayName}!</div>`;
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000); // Redirect after 2 seconds
        } else {
            messageArea.innerHTML = '<div class="alert alert-danger">Invalid username or password</div>';
        }
    }

    /**
     * Defines the handleLogout function
     */
    function handleLogout() {
        localStorage.removeItem('loggedInUser');
        console.log('User logged out'); // Debug: log user logged out
        updateLoginLogoutButton();
        window.location.href = 'index.html';
    }

    /**
     * Defines the updateLoginLogoutButton function
     */
    function updateLoginLogoutButton() {
        const loginButton = document.getElementById('login');
        const loggedInUser = localStorage.getItem('loggedInUser');

        console.log('Logged in user:', loggedInUser); // Debug: log loggedInUser
        console.log('Login Button before update:', loginButton.innerHTML); // Debug: log button state before update

        if (loggedInUser) {
            console.log('Setting login button to Logout'); // Debug: log changing button to Logout
            loginButton.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Logout';
            loginButton.href = '#';
            loginButton.removeEventListener('click', handleLogin);
            loginButton.addEventListener('click', handleLogout);
        } else {
            console.log('Setting login button to Login'); // Debug: log changing button to Login
            loginButton.innerHTML = '<i class="fa-solid fa-sign-in-alt"></i> Login';
            loginButton.href = 'login.html';
        }

        console.log('Login Button after update:', loginButton.innerHTML); // Debug: log button state after update
    }

    /**
     * Dynamically loads the header
     * @returns {Promise<void>}
     */
    async function loadHeader() {
        console.log("[INFO] Loading header...");
        try {
            const response = await fetch("header.html");
            document.querySelector("header").innerHTML = await response.text();
            addDynamicNavbarFeatures();
            highlightActivePage();
            updateLoginLogoutButton(); // Call after the header is loaded
            console.log("Header loaded");
        } catch (error) {
            console.error("[Error] issue loading header", error);
        }
    }

    /**
     * Dynamically adding features to navbar, donate button and changing opportunities text
     */
    function addDynamicNavbarFeatures() {
        if (document.title !== "Donate") {
            const donateLink = '<li class="nav-item donate-link"><a class="nav-link" href="donate.html"><i class="fa-solid fa-donate"></i> Donate</a></li>';
            const navbarNav = $('#mainNavbar .navbar-nav');
            navbarNav.append(donateLink);
        }
        $('#opportunitiesLink').text('Volunteer Now');
    }

    /**
     * Highlights the active tab in the nav bar
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
        });
    }

    /**
     * Smoothly scrolls back to the top of the page
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Creates a back to top button if a user scrolls down a certain amount
     */
    function createBackToTopButton() {
        const button = $('<button id="backToTopBtn" title="Back to Top"><i class="fas fa-chevron-up"></i> Back to Top</button>');
        $('body').append(button);
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

        $(window).scroll(function () {
            if ($(window).scrollTop() > 200) {
                button.fadeIn();
            } else {
                button.fadeOut();
            }
        });

        button.click(function () {
            scrollToTop();
        });
    }

    /**
     * The Main Function that runs on startup
     * Its purpose is to load startup features like header and back to top button
     * @constructor
     */
    function Start() {
        loadHeader();
        createBackToTopButton();


        // Redirect to opportunities.html when search bar is focused
        document.getElementById('searchBar').addEventListener('focus', function() {
            window.location.href = 'opportunities.html';
        });

    }

    window.addEventListener("load", Start);
})();
