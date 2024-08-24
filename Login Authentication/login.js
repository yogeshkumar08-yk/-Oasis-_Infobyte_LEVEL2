let loginContainerEl = document.getElementById("loginContainer");
let loginEmailEl = document.getElementById("loginEmail");
let loginPasswordEl = document.getElementById("loginPassword");
let loginErrorMessageEl = document.getElementById("loginErrorMessage");
let loginPasswordErrorMessageEl = document.getElementById("loginPasswordErrorMessage");
let alreadyExistErrorMessageEl = document.getElementById("alreadyExistErrorMessage");

let registerContainerEl = document.getElementById("registerContainer");
let registerEmailEl = document.getElementById("registerEmail");
let registerPasswordEl = document.getElementById("registerPassword");
let registerErrorMessageEl = document.getElementById("registerErrorMessage");
let registerPasswordErrorMessageEl = document.getElementById("registerPasswordErrorMessage");
let registrationMessageEl = document.getElementById("registrationMessage");

let successDashboardEl = document.getElementById("successDashboard");
let loggedInUserEl = document.getElementById("loggedInUser");

function showRegisterForm() {
    console.log("showRegisterForm clicked");
    loginContainerEl.classList.add("d-none");
    registerContainerEl.classList.remove("d-none");
    registrationMessageEl.classList.add("d-none");
}

function showLoginForm() {
    console.log("showLoginForm clicked");
    loginContainerEl.classList.remove("d-none");
    registerContainerEl.classList.add("d-none");
}

function isValidPassword(password) {
    return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password);
}

function isUsernameAvailable(username) {
    return !localStorage.getItem(username);
}

function register() {
    let username = registerEmailEl.value;
    let password = registerPasswordEl.value;
    let registrationMessage = registrationMessageEl;
    let registerErrorMessage = registerErrorMessageEl;
    let registerPasswordErrorMessage = registerPasswordErrorMessageEl;

    registrationMessage.classList.add("d-none"); 
    registerErrorMessage.textContent = ''; 
    registerPasswordErrorMessage.textContent = '';

    if (!username) {
        registerErrorMessage.textContent = 'Please enter a username.';
    } else if (!isValidPassword(password)) {
        registerPasswordErrorMessage.textContent = 'Please enter an alphanumeric password of at least 8 characters.';
    } else if (!isUsernameAvailable(username)) {
        registerErrorMessage.textContent = 'Username already exists. Please choose a different username.';
    } else {
        localStorage.setItem(username, password);
        registrationMessage.textContent = 'Registration successful! You can now log in.';
        registrationMessage.classList.remove("d-none");;
        registerEmailEl.value = '';
        registerPasswordEl.value = '';
    }
}

function login() {
    let username = loginEmailEl.value;
    let password = loginPasswordEl.value;

    loginErrorMessageEl.textContent = ''; 
    loginPasswordErrorMessageEl.textContent = '';
    
    if (localStorage.getItem(username) === password) {
        loginContainerEl.classList.add("d-none");
        successDashboardEl.classList.remove("d-none");
        loggedInUserEl.textContent = username;
    } else if (!username) {
        alreadyExistErrorMessageEl.textContent = '';
        loginErrorMessageEl.textContent = 'Please enter a username.';  
    } else if (!isValidPassword(password)) {
        loginPasswordErrorMessageEl.textContent = 'Please enter an alphanumeric password of at least 8 characters.';
        alreadyExistErrorMessageEl.textContent = '';
    } else {
        alreadyExistErrorMessageEl.textContent = 'Invalid username or password.';
    }
    
}

function logout() {
    successDashboardEl.classList.add("d-none");
    loginContainerEl.classList.remove("d-none");
    loginEmailEl.value = '';
    loginPasswordEl.value = '';
}