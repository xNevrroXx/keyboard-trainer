function submenu() {
    const menuElem = document.querySelector("nav.menu");
    const profileMenuLinkBtn = menuElem.querySelector(".menu__profile.user-link");
    const profileSubmenuElem = menuElem.querySelector(".profile-submenu");
    if (profileMenuLinkBtn) {
        profileMenuLinkBtn.addEventListener("focus", () => {
            window.addEventListener("keydown", throwFocusToSubmenu);
        });
        profileMenuLinkBtn.addEventListener("blur", () => {
            window.removeEventListener("keydown", throwFocusToSubmenu);
        });
        if (profileSubmenuElem) {
            profileSubmenuElem.querySelectorAll("button").forEach(button => {
                button.addEventListener("focus", () => {
                });
            });
        }
    }
    function throwFocusToSubmenu(event) {
        event.preventDefault();
        console.log("event");
        console.log(event.code, event.key);
        if (event.code === "Tab") {
            console.log(true);
            console.log(profileSubmenuElem.querySelector("button"));
            profileSubmenuElem.querySelector("button").focus();
            profileSubmenuElem.classList.add("active");
        }
    }
}
export default submenu;
