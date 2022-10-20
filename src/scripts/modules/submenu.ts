import {Element} from "chart.js";

function submenu() {
  const menuElem = document.querySelector("nav.menu");
  const linksWithSubmenu: NodeList = menuElem.querySelectorAll(".menu__main-link.menu__main-link_with-submenu");
  const submenuMatches: Map<Element, {submenu: HTMLElement, beforeElementOnShiftTab: HTMLElement}> = new Map();

  linksWithSubmenu.forEach((linkWithSubmenu) => {
    submenuMatches.set(
      linkWithSubmenu as never, {
        submenu: (<HTMLElement>linkWithSubmenu).nextElementSibling as HTMLElement,
        beforeElementOnShiftTab: (<HTMLElement>(<unknown>linkWithSubmenu)).parentElement.parentElement.previousElementSibling.querySelector("li:last-of-type > button.menu__main-link") as HTMLElement
      });
  })


  if (linksWithSubmenu) {
    for (const [key, value] of submenuMatches) {
      (function (linkElem: HTMLElement, targetSubmenuElem: HTMLElement, beforeElementOnShiftTab: HTMLElement) {
        const bindSubmenuInstance = throwFocusToSubmenu.bind(targetSubmenuElem, beforeElementOnShiftTab);
        const disappearOnLeaveBackFromFirstSubElementBind = disappearOnLeaveBackFromFirstSubElement.bind(targetSubmenuElem);
        const disappearOnLeaveForwardFromLastSubElementBind = disappearOnLeaveForwardFromLastSubElement.bind(targetSubmenuElem);

        targetSubmenuElem.querySelector("li:first-of-type > button").addEventListener("keydown", disappearOnLeaveBackFromFirstSubElementBind);
        targetSubmenuElem.querySelector("li:last-of-type > button").addEventListener("keydown", disappearOnLeaveForwardFromLastSubElementBind);

        linkElem.addEventListener("focus", () => {
          window.addEventListener("keydown", bindSubmenuInstance);
        });

        linkElem.addEventListener("blur", () => {
          window.removeEventListener("keydown", bindSubmenuInstance);
        });
      }(key as unknown as HTMLElement, value.submenu, value.beforeElementOnShiftTab))
    }
  }

  function disappearOnLeaveBackFromFirstSubElement(event: KeyboardEvent) {
    if (event.code === "Tab" && event.getModifierState && event.getModifierState("Shift")) {
      this.classList.remove("active");
    }
  }

  function disappearOnLeaveForwardFromLastSubElement(event: KeyboardEvent) {
    if (event.code === "Tab" && event.getModifierState && !event.getModifierState("Shift")) {
      this.classList.remove("active");
    }
  }

  function throwFocusToSubmenu(beforeElementOnShiftTab: HTMLElement, event: KeyboardEvent) {
    event.preventDefault();

    if (event.code === "Tab" && event.getModifierState && event.getModifierState("Shift")) {
      beforeElementOnShiftTab.focus();
    }
    else if (event.code === "Tab") {
      this.classList.add("active");
      this.querySelector("button").focus();
    }

    window.onclick = () => {
      this.classList.remove("active");
    }
  }
}

export default submenu;