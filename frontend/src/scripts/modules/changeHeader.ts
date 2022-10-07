function changeHeader(userName: string) {
  const profileElem = document.querySelector("nav.menu .menu__item_profile"),
    loginElem = document.querySelector("nav.menu .menu__item_login"),
    userNameElem = profileElem.querySelector(".user-name");

  profileElem.classList.add("active");
  loginElem.classList.remove("active");
  userNameElem.textContent = userName;
}

export default changeHeader;