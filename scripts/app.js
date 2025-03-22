"use strict";

import { Router } from "./router.js";
import { User } from "./users.js";
import { routes } from "./router.js";
import {statisticsLogic} from "./statistics.js";
import {initializeEventPlanning} from "./event-planning.js";



// Instantiate the Router
const router = new Router(routes);

// Global `users` Array
let users = [];

/**
 * Fetch users from the JSON file and initialize the `users` array.
 */
async function loadUsers() {
    try {
        console.log("[INFO] Fetching users...");
        const response = await fetch("data/users.json");
        if (!response.ok) {
            throw new Error(`[ERROR] Failed to fetch users: ${response.status}`);
        }
        const data = await response.json();
        users = data.users.map(userData => {
            const user = new User();
            user.fromJSON(userData);
            return user;
        });
        console.log("[INFO] Users loaded:", users); // Debug: Log users
    } catch (error) {
        console.error("[ERROR] Issue loading users:", error);
    }
}

/**
 * Dynamically loads the header.
 */
export async function loadHeader() {
    console.log("[INFO] Loading header...");
    try {
        const response = await fetch("views/components/header.html");
        if (!response.ok) {
            throw new Error(`[ERROR] Failed to fetch header: ${response.status}`);
        }
        document.querySelector("header").innerHTML = await response.text();
        updateLoginLogoutButton();
        console.log("[INFO] Header loaded successfully.");
    } catch (error) {
        console.error("[ERROR] Issue loading header:", error);
    }
}

/**
 * Function to handle user login.
 */
function handleLogin() {
    const userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const messageArea = document.getElementById("messageArea");

    const user = users.find(user => user.userName === userName && user._password === password);

    if (user) {
        console.log("[INFO] User found!");
        localStorage.setItem("loggedInUser", JSON.stringify(user.toJSON()));
        messageArea.innerHTML = `<div class="alert alert-success">Welcome, ${user.displayName}!</div>`;
        setTimeout(() => {
            router.navigate("/");
        }, 2000); // Redirect after 2 seconds
    } else {
        messageArea.innerHTML = `<div class="alert alert-danger">Invalid username or password</div>`;
    }
}

/**
 * Function to handle cancel button click.
 */
function handleCancel() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("messageArea").innerHTML = "";
}

/**
 * Setup event listeners for the login page.
 */
function setupEventListeners() {
    const loginButton = document.getElementById("loginButton");
    const cancelButton = document.getElementById("cancelButton");

    console.log("[DEBUG] Checking for login and cancel buttons in DOM...");
    if (!loginButton) {
        console.warn("[WARN] Login button is not found");
        return;
    }
    if (!cancelButton) {
        console.warn("[WARN] Cancel button is not found");
        return;
    }

    loginButton.addEventListener("click", () => {
        console.log("[INFO] Login Button was clicked");
        handleLogin();
    });

    cancelButton.addEventListener("click", () => {
        console.log("[INFO] Cancel Button was clicked");
        handleCancel();
    });
    console.log("[INFO] Event listeners attached for login page.");
}

/**
 * Update the login/logout button dynamically.
 */
function updateLoginLogoutButton() {
    const loginButton = document.getElementById("login");
    const loggedInUser = localStorage.getItem("loggedInUser");
    console.log(`Logged in user = ${loggedInUser}`);

    if (loginButton) {
        if (loggedInUser) {
            loginButton.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Logout';
            loginButton.href = "#";
            loginButton.addEventListener("click", handleLogout);
        } else {
            loginButton.innerHTML = '<i class="fa-solid fa-sign-in-alt"></i> Login';
            loginButton.href = "#/login";
            loginButton.addEventListener("click", () => {
                router.navigate("/login");
            });
        }
    } else {
        console.error("[ERROR] Login button not found in header.");
    }
}

/**
 * Handle user logout.
 */
function handleLogout() {
    localStorage.removeItem("loggedInUser");

    console.log("[INFO] User logged out. local storage cleared.");

    updateLoginLogoutButton();
    // Redirect to login page
    location.hash = "/login";
}


/**
 * Highlights the active page in the navbar.
 */
function highlightActivePage() {
    const currentPath = location.hash.slice(1) || "/";
    document.querySelectorAll("#mainNavbar .nav-link").forEach(link => {
        const href = link.getAttribute("href");
        if (href === `#${currentPath}`) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

/**
 * The main initialization function.
 */
async function Start() {
    console.log("[INFO] Application Starting...");

    // Load the users
    await loadUsers();

    // Load the header
    await loadHeader();

    // Load the initial route content
    const currentPath = location.hash.slice(1) || "/";
    router.loadRoute(currentPath);

    // Highlight the active page in the navbar
    highlightActivePage();

    // Listen for hash changes to dynamically load new routes
    window.addEventListener("hashchange", () => {
        const newPath = location.hash.slice(1) || "/";
        router.loadRoute(newPath);
        highlightActivePage();

        console.log(`[INFO] Current route: ${newPath}`);

        if (newPath === "/login") {
            console.log("[DEBUG] Initializing login page from app.js");
            setTimeout(() => {
                setupEventListeners();
            }, 100); // Add delay to ensure content is fully loaded
        }

        if (newPath === "/statistics") {
            console.log("[INFO] Initializing statistics page from app.js...");

            setTimeout(() => {
                const canvas = document.getElementById("chart");
                if (!canvas) {
                    console.error("[ERROR] Canvas element not found in DOM. Retrying...");
                    return;
                }
                console.log("[INFO] Canvas element found. Initializing statistics logic...");
                statisticsLogic();
            }, 100);
        }

        if (newPath === "/event-planning") {
            console.log("[INFO] Initializing event planning page from app.js...");
            initializeEventPlanning(); // Delegates to event-planning.js
        }
    });
    // Update the login/logout button state
    updateLoginLogoutButton();
}

// Initialize the app when DOM is fully loaded
window.addEventListener("DOMContentLoaded", Start);