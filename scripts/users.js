/*********************
 *     Grant Heath
 *     Volunteer Connect Project
 *     users.js
 *     2025-02-19
 *
 *     users.js defines the user class, using the users.json file to store its users.
 *********************/
"use strict";

// Define the User class directly in the users.js file
class User {
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

    const loginButton = document.getElementById('loginButton');
    const cancelButton = document.getElementById('cancelButton');

    loginButton.addEventListener('click', handleLogin);
    cancelButton.addEventListener('click', handleCancel);
});

/**
 * Function to let the user log in using their username and password
 */
function handleLogin() {
    const userName = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageArea = document.getElementById('messageArea');

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

function handleCancel() {
    // Clear form fields
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    // Clear message area
    document.getElementById('messageArea').innerHTML = '';
}
