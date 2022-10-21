import keyboard from "./keyboard";
import initModal from "./modal";
import initTraining from "./initTraining";

function initTesting(next: () => void) {
  const modalStartPrint: HTMLElement = document.querySelector(".modal_start-print");
  const testingText = document.querySelector("#testing-text");

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
        const focusElement = document.activeElement;
        const textAreaCustomText = document.querySelector("#text-area-custom-text");

        if(textAreaCustomText !== focusElement) {
          if (event.code === "Enter" || event.code === "Space") {
            handleInitTraining();
          }
        }
      }

      function handleInitTraining() {
        if(testingText.textContent.length !== 0) {
          modalStartPrint.dispatchEvent(new CustomEvent("closeModal"));

          startPrintBtn.removeEventListener("click", handleInitTraining);
          document.removeEventListener("keyup", handleKeyUp);

          initTraining(
            next
          );
        }
        else {
          alert("There is no testing text yet");
        }
      }
    }
  });
}

export default initTesting;