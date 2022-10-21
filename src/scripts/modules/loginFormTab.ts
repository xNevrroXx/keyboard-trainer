// types
import {IMatchPagesUrl} from "../types";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";

function loginFormTab() {
  const container = document.getElementById('container');

  const
    registerButtonElems = [
      document.getElementById('signUp'),
      document.querySelector(`.menu__item.menu__item_login > button[data-target-point="${MATCH_PAGES_URL["login"].pathname}"][data-target-point-extra="${MATCH_PAGES_URL["login"].possibleHashValue["register"]}"]`)
    ],
    signInButtonElems = [
      document.getElementById('signIn'),
      document.querySelector(`.menu__item.menu__item_login > button[data-target-point="${MATCH_PAGES_URL["login"].pathname}"][data-target-point-extra="${MATCH_PAGES_URL["login"].possibleHashValue["sign-in"]}"]`)
    ],
    hiddenOnRegisterElems: HTMLElement[] = [
      document.querySelector("div.sign-in-container"),
      document.querySelector("div.overlay-right")
    ],
    hiddenOnSignInElems: HTMLElement[] = [
      document.querySelector("div.sign-up-container"),
      document.querySelector("div.overlay-left")
    ],
    delayBeforeHiding = 400;

  if (window.location.hash === MATCH_PAGES_URL["login"].possibleHashValue["register"]) {
    container.classList.add("active-right");
    container.classList.remove("active-left");

    hiddenOnRegisterElems.forEach(elemForHide => {
      elemForHide.style.display = "none";
    })
  }
  if (window.location.hash === MATCH_PAGES_URL["login"].possibleHashValue["sign-in"]) {
    container.classList.remove("active-right");
    container.classList.add("active-left");

    hiddenOnSignInElems.forEach(elemForHide => {
      elemForHide.style.display = "none";
    })
  }

  registerButtonElems.forEach(registerButtonElem => {
    registerButtonElem.addEventListener('click', () => {
      container.classList.add("active-right");
      container.classList.remove("active-left");
      window.history.replaceState({}, "", `${MATCH_PAGES_URL["login"].pathname}${MATCH_PAGES_URL["login"].possibleHashValue["register"]}`);

      hiddenOnRegisterElems.forEach(elemForHide => {
        setTimeout(() => {
          elemForHide.style.display = "none";
        }, delayBeforeHiding)
      });

      hiddenOnSignInElems.forEach(elemForHide => {
        setTimeout(() => {
          elemForHide.style.display = "flex";
        }, delayBeforeHiding)
      });
    });
  })

  signInButtonElems.forEach(signInButtonElem => {
    signInButtonElem.addEventListener('click', () => {
      container.classList.remove("active-right");
      container.classList.add("active-left");
      window.history.replaceState({}, "", `${MATCH_PAGES_URL["login"].pathname}${MATCH_PAGES_URL["login"].possibleHashValue["sign-in"]}`);

      hiddenOnSignInElems.forEach(elemForHide => {
        setTimeout(() => {
          elemForHide.style.display = "none";
        }, delayBeforeHiding)
      });

      hiddenOnRegisterElems.forEach(elemForHide => {
        setTimeout(() => {
          elemForHide.style.display = "flex";
        }, delayBeforeHiding)
      })
    });
  })
}

export default loginFormTab;