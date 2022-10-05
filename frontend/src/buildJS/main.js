import initTraining from "./modules/initTraining";
import keyboard from "./modules/keyboard";
import initModal from "./modules/modal";
import makeChart from "./modules/makeChart";
import plugToImgOnError from "./modules/plugToImgOnError";
import scaleElements from "./modules/scaleElements";
window.addEventListener("DOMContentLoaded", () => {
    const chartStatistic = [];
    console.log(chartStatistic);
    scaleElements(document.querySelector("body"), document.querySelectorAll("body > *"));
    window.addEventListener("resize", () => {
        scaleElements(document.querySelector("body"), document.querySelectorAll("body > *"));
    });
    plugToImgOnError();
    console.log(window.location);
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
});
