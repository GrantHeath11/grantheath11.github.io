/*********************
 *     Grant Heath
 *     Student ID: 100925634
 *     Date Completed: 2025-03-22
 *
 *     Volunteer Connect Project
 *     authguard.ts
 *
 *     authenticates users login and blocks entry to protected pages,
 *     the protected routes are stored in the router.ts file
 *
 *     heavily inspired by the one we made in the in class assignments
 *********************/
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
//# sourceMappingURL=authguard.js.map