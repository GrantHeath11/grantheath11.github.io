/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     users.ts
 *     2025-02-20
 *********************/
"use strict";

import { routes } from "./router.js";
import { Router } from "./router.js";


// Initialize the router
const router = new Router(routes);

// Define the User class with TypeScript
export class User {
    private _displayName: string;
    private _emailAddress: string;
    private _userName: string;
    private _password: string;

    constructor(
        displayName: string = "",
        emailAddress: string = "",
        userName: string = "",
        password: string = ""
    ) {
        this._displayName = displayName;
        this._emailAddress = emailAddress;
        this._userName = userName;
        this._password = password;
    }

    // Getters and Setters
    get displayName(): string { return this._displayName; }
    get emailAddress(): string { return this._emailAddress; }
    get userName(): string { return this._userName; }
    set displayName(displayName: string) { this._displayName = displayName; }
    set emailAddress(emailAddress: string) { this._emailAddress = emailAddress; }
    set userName(userName: string) { this._userName = userName; }

    // Methods
    toString(): string {
        return `Display Name: ${this.displayName}\nEmail Address: ${this._emailAddress}\nUserName: ${this._userName}`;
    }

    toJSON(): Record<string, string> {
        return {
            DisplayName: this._displayName,
            EmailAddress: this._emailAddress,
            UserName: this._userName,
            Password: this._password
        };
    }

    fromJSON(data: { DisplayName: string; EmailAddress: string; UserName: string; Password: string }): void {
        this._displayName = data.DisplayName;
        this._emailAddress = data.EmailAddress;
        this._userName = data.UserName;
        this._password = data.Password;
    }

    serialize(): string | null {
        if (this._displayName && this._emailAddress && this._userName) {
            return `${this._displayName}, ${this._emailAddress}, ${this._userName}`;
        }
        console.error("[ERROR] failed to serialize, one or more properties are missing");
        return null;
    }

    deserialize(data: string): void {
        const propertyArray = data.split(",");
        this._displayName = propertyArray[0];
        this._emailAddress = propertyArray[1];
        this._userName = propertyArray[2];
    }
}

// User initialization
let users: User[] = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch('data/users.json')
        .then((response) => response.json())
        .then((data: { users: { DisplayName: string; EmailAddress: string; UserName: string; Password: string }[] }) => {
            users = data.users.map((user) => {
                const userObj = new User();
                userObj.fromJSON(user);
                return userObj;
            });
            console.log('Users:', users); // Debug: log users array
        })
        .catch((error) => console.error('Error fetching users:', error));
});