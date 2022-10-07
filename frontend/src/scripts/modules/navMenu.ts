function navMenu() {
  const menuElem = document.querySelector("nav.menu");
  const linkElems = menuElem.querySelectorAll("button[data-target-point]");


  menuElem.addEventListener("click", (event) => {
    const target = event.target as Element;

    if (target && Array.from(linkElems).includes(target)) {
      const buttonLinkTarget = target.getAttribute("data-target-point");
      const buttonLinkTargetExtra = target.getAttribute("data-target-point-extra");

      console.log(window.location)
      if(window.location.pathname !== buttonLinkTarget) {
        if (buttonLinkTargetExtra) {
          window.location.href = buttonLinkTarget + buttonLinkTargetExtra;
        }
        else {
          window.location.href = buttonLinkTarget;
        }
      }
      else if (window.location.pathname === buttonLinkTarget && buttonLinkTargetExtra && window.location.search !== buttonLinkTargetExtra) {
        window.history.replaceState({}, "", buttonLinkTarget + buttonLinkTargetExtra);
      }
    }
  })
}

export default navMenu;