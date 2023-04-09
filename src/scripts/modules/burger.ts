function burger () {
    const navbar = document.querySelector(".main-navbar");
    const burgerEl = document.querySelector(".burger");

    burgerEl.addEventListener("click", function () {
        navbar.classList.toggle("main-navbar_active");
        this.classList.toggle("burger_active");
    })
}

export default burger;