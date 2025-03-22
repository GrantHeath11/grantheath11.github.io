/*********************
 *     Grant Heath
 *     Student ID: 100925634
 *     Date Completed: 2025-03-22
 *
 *     Volunteer Connect Project
 *     router.ts
 *
 *     SPA router based off the router used in the in class assignments
 *     based off the routes in the routing table it will add the content of a page to index.html.
 *
 *********************/
"use strict";
import { loadHeader } from "./app.js";
import { authGuard } from "./authguard.js";
// Routes Configuration
export const routes = {
    "/": "views/content/home.html",
    "/404": "views/content/404.html",
    "/about": "views/content/about.html",
    "/contact": "views/content/contact.html",
    "/donate": "views/content/donate.html",
    "/gallery": "views/content/gallery.html",
    "/login": "views/content/login.html",
    "/events": "views/content/events.html",
    "/opportunities": "views/content/opportunities.html",
    "/register": "views/content/register.html",
    "/statistics": "views/content/statistics.html",
    "/event-planning": "views/content/event-planning.html"
};
// List of protected routes that AuthGuard will affect
const protectedRoutes = ["/statistics", "/event-planning"];
export class Router {
    routes;
    constructor(routes) {
        this.routes = routes;
        this.init();
    }
    init() {
        // Ensure the app starts with the correct route or defaults to the home route
        if (!location.hash) {
            location.hash = "/"; // Default to home route
        }
        this.loadRoute(location.hash.slice(1)); // Load the initial route
        // Handle browser back/forward navigation
        window.addEventListener("popstate", () => {
            console.log("[INFO] Navigating to ...");
            this.loadRoute(location.hash.slice(1));
        });
    }
    navigate(path) {
        console.log(`[INFO] Navigating to: ${path}`);
        location.hash = path; // Update the browser URL
    }
    loadRoute(path) {
        console.log(`[INFO] Loading route: ${path}`);
        // Extract a base path (e.g., /edit#contact_123 -> edit)
        const basePath = path.split("#")[0] || "/";
        if (protectedRoutes.includes(basePath)) {
            if (!authGuard()) {
                console.log("[AUTHGUARD] Blocking route load. Redirecting...");
                return; // Prevent further execution if authGuard blocks access
            }
        }
        // Check if the route exists
        if (!this.routes[basePath]) {
            console.warn(`[WARNING] Route not found: ${basePath}, redirecting to 404...`);
            this.navigate("/404");
            path = "/404";
        }
        // Fetch and load the HTML content for the route
        fetch(this.routes[basePath])
            .then((response) => {
            if (!response.ok) {
                throw new Error(`[ERROR] Failed to load: ${this.routes[basePath]}`);
            }
            return response.text();
        })
            .then((html) => {
            // Inject the HTML content into the <main> element
            const mainElement = document.querySelector("main");
            if (mainElement) {
                mainElement.innerHTML = html;
                // Reload shared components like the header
                loadHeader().then(() => {
                    // Dispatch a custom event after loading the route
                    document.dispatchEvent(new CustomEvent("routeLoaded", { detail: basePath }));
                });
            }
            else {
                console.error("[ERROR] <main> element not found.");
            }
        })
            .catch((error) => {
            console.error("[ERROR] Error loading route:", error);
        });
    }
}
//# sourceMappingURL=router.js.map