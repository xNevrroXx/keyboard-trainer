function changeHeader() {
    const profileElem = document.querySelector("nav.menu .menu__item_profile"), loginElem = document.querySelector("nav.menu .menu__item_login");
    profileElem.classList.add("active");
    loginElem.classList.remove("active");
}
export default changeHeader;
