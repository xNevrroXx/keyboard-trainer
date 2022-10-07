var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// owm modules
import initTraining from "./modules/initTraining";
import keyboard from "./modules/keyboard";
import initModal from "./modules/modal";
import makeChart from "./modules/makeChart";
import plugToImgOnError from "./modules/plugToImgOnError";
import scaleElements from "./modules/scaleElements";
import loginFormTab from "./modules/loginFormTab";
import loginFormListener from "./modules/loginFormListener";
import authorize from "./modules/authorize";
import navMenu from "./modules/navMenu";
import recoverForm from "./modules/recoverForm";
window.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    navMenu();
    plugToImgOnError();
    yield authorize();
    const chartStatistic = [];
    scaleElements(document.querySelector("body"), document.querySelectorAll("body > *"));
    window.addEventListener("resize", () => {
        scaleElements(document.querySelector("body"), document.querySelectorAll("body > *"));
    });
    if (window.location.pathname === "/") {
        const modalStartPrint = document.querySelector(".modal_start-print");
        keyboard();
        initModal({
            modalSelector: ".modal_start-print",
            activeClass: "modal_active",
            triggerCloseSelector: ".modal__close-trigger",
            next: function () {
                const startPrintBtn = modalStartPrint.querySelector(".modal__start-print-btn");
                startPrintBtn.addEventListener("click", handleClick);
                document.addEventListener("keydown", handleKeyDown);
                // handler functions
                function handleKeyDown(event) {
                    if (event.code === "Enter" || event.code === "Space") {
                        modalStartPrint.dispatchEvent(new CustomEvent("closeModal"));
                        initTraining(chartStatistic);
                        document.removeEventListener("keydown", handleKeyDown);
                        startPrintBtn.removeEventListener("click", handleClick);
                    }
                }
                function handleClick(event) {
                    modalStartPrint.dispatchEvent(new CustomEvent("closeModal"));
                    initTraining(chartStatistic);
                    startPrintBtn.removeEventListener("click", handleClick);
                    document.removeEventListener("keydown", handleKeyDown);
                }
            }
        });
    }
    else if (window.location.pathname === "/pages/results.html") {
        makeChart(chartStatistic);
    }
    else if (window.location.pathname === "/pages/login.html") {
        document.querySelector("button#forgot-password").addEventListener("click", () => {
            window.location.href = "/pages/recovery.html";
        });
        loginFormTab();
        loginFormListener();
    }
    else if (window.location.pathname === "/pages/recovery.html") {
        document.querySelector("button#try-again").addEventListener("click", () => {
            window.location.href = "/pages/login.html?sign-in";
        });
        recoverForm();
    }
}));
