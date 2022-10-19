// own modules
import {logout} from "../services";
import submenu from "./submenu";

function navMenu() {
  const menuElem = document.querySelector("nav.menu");
  const linkElems = menuElem.querySelectorAll("button[data-target-point]");
  const childCompares: Map<Element, NodeList> = new Map();
  const logoutBtn = menuElem.querySelector("button#logout");

  submenu();

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      const response = await logout();
      window.location.reload();
    })
  }

  linkElems.forEach(linkElem => {
    childCompares.set(linkElem, linkElem.querySelectorAll("*"));
  })

  menuElem.addEventListener("click", (event) => {
    const target = event.target as Element;

    if (target && Array.from(linkElems).includes(target)) {
      handler(target);
    }
    else {
      for (const childCompare of childCompares) {
        if (Array.from(childCompare[1]).includes(target)) {
          handler(childCompare[0]);
          return;
        }
      }
    }

    function handler(target: Element) {
      const buttonLinkTarget = target.getAttribute("data-target-point");
      const buttonLinkTargetExtra = target.getAttribute("data-target-point-extra");

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