/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     users.js
 *     2025-02-20
 *********************/
"use strict";


import { routes } from "./router.js";
import { Router } from "./router.js";

const router = new Router(routes);

// Define the User class directly in the users.js file
export class User {
    constructor(displayName = "", emailAddress = "", userName = "", password = "") {
        this._displayName = displayName;
        this._emailAddress = emailAddress;
        this._userName = userName;
        this._password = password;
    }

    // Getters and Setters
    get displayName() { return this._displayName; }
    get emailAddress() { return this._emailAddress; }
    get userName() { return this._userName; }
    set displayName(displayName) { this._displayName = displayName; }
    set emailAddress(emailAddress) { this._emailAddress = emailAddress; }
    set userName(userName) { this._userName = userName; }

    // Methods
    toString() {
        return `Display Name: ${this.displayName}\nEmail Address: ${this._emailAddress}\nUserName: ${this._userName}`;
    }
    toJSON() {
        return {
            DisplayName: this._displayName,
            EmailAddress: this._emailAddress,
            UserName: this._userName,
            Password: this._password
        };
    }
    fromJSON(data) {
        this._displayName = data.DisplayName;
        this._emailAddress = data.EmailAddress;
        this._userName = data.UserName;
        this._password = data.Password;
    }
    serialize() {
        if (this._displayName && this._emailAddress && this._userName) {
            return `${this._displayName}, ${this._emailAddress}, ${this._userName}`;
        }
        console.error("[ERROR] failed to serialize, one or more properties are missing");
        return null;
    }
    deserialize(data) {
        let propertyArray = data.split(",");
        this._displayName = propertyArray[0];
        this._emailAddress = propertyArray[1];
        this._userName = propertyArray[2];
    }
}

// User initialization
let users = [];

document.addEventListener("DOMContentLoaded", function () {
    fetch('data/users.json')
        .then(response => response.json())
        .then(data => {
            users = data.users.map(user => {
                let userObj = new User();
                userObj.fromJSON(user);
                return userObj;
            });
            console.log('Users:', users); // Debug: log users array
        })
        .catch(error => console.error('Error fetching users:', error));
});