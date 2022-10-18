var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// own modules
import { logout } from "../services";
import submenu from "./submenu";
function navMenu() {
    const menuElem = document.querySelector("nav.menu");
    const linkElems = menuElem.querySelectorAll("button[data-target-point]");
    const childCompares = new Map();
    const logoutBtn = menuElem.querySelector("button#logout");
    submenu();
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const response = yield logout();
            window.location.reload();
        }));
    }
    linkElems.forEach(linkElem => {
        childCompares.set(linkElem, linkElem.querySelectorAll("*"));
    });
    menuElem.addEventListener("click", (event) => {
        const target = event.target;
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
        function handler(target) {
            const buttonLinkTarget = target.getAttribute("data-target-point");
            const buttonLinkTargetExtra = target.getAttribute("data-target-point-extra");
            if (window.location.pathname !== buttonLinkTarget) {
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
    });
}
export default navMenu;
