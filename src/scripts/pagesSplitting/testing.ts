// types
import {IMatchPagesUrl} from "../types";
// own modules
import keyboard from "../modules/keyboard";
import initModal from "../modules/modal";
import initTraining from "../modules/initTraining";


function testing(MATCH_PAGES_URL: IMatchPagesUrl) {
  const modalStartPrint: HTMLElement = document.querySelector(".modal_start-print");

  keyboard();
  initModal({
    modalSelector: ".modal_start-print",
    activeClass: "modal_active",
    triggerCloseSelector: ".modal__close-trigger",
    next: function () {
      const startPrintBtn = modalStartPrint.querySelector(".modal__start-print-btn");

      startPrintBtn.addEventListener("click", handleInitTraining)
      document.addEventListener("keyup", handleKeyUp);


      function handleKeyUp(event: KeyboardEvent) {
        if (event.code === "Enter" || event.code === "Space") {
          handleInitTraining();
        }
      }
      function handleInitTraining() {
        modalStartPrint.dispatchEvent(new CustomEvent("closeModal"));

        startPrintBtn.removeEventListener("click", handleInitTraining);
        document.removeEventListener("keyup", handleKeyUp);

        initTraining(
          () => window.location.href = MATCH_PAGES_URL["results"].pathname
        );
      }
    }
  });
}

export default testing;