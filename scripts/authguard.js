"use strict";

export function authGuard() {
    const user = localStorage.getItem("loggedInUser");
    console.log("[AUTHGUARD] Checking user:", user); // Debug log

    if (!user) {
        console.log("[AUTHGUARD] Unauthorized access. Redirecting to login.");
        location.hash = "/login";
        return false; // Block access
    }
    console.log("[AUTHGUARD] Access granted.");
    return true; // Allow access
}