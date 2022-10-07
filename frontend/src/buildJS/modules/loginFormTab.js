function loginFormTab() {
    const signUpButton = document.getElementById('signUp');
    const signUpButtonMenu = document.querySelector(`.menu__item.menu__item_login > button[data-target-point="/pages/login.html"][data-target-point-extra="?register"]`);
    const signInButton = document.getElementById('signIn');
    const signInButtonMenu = document.querySelector(`.menu__item.menu__item_login > button[data-target-point="/pages/login.html"][data-target-point-extra="?sign-in"]`);
    const container = document.getElementById('container');
    if (window.location.search === "?register") {
        container.classList.add("active-right");
    }
    if (window.location.search === "?sign-in") {
        container.classList.remove("active-right");
    }
    signUpButton.addEventListener('click', () => {
        container.classList.add("active-right");
        window.history.replaceState({}, "", "/pages/login.html?register");
    });
    signUpButtonMenu.addEventListener('click', () => {
        container.classList.add("active-right");
        window.history.replaceState({}, "", "/pages/login.html?register");
    });
    signInButton.addEventListener('click', () => {
        container.classList.remove("active-right");
        window.history.replaceState({}, "", "/pages/login.html?sign-in");
    });
    signInButtonMenu.addEventListener('click', () => {
        container.classList.remove("active-right");
        window.history.replaceState({}, "", "/pages/login.html?sign-in");
    });
}
export default loginFormTab;
