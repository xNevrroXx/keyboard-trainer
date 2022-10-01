import initTraining from "./modules/initTraining";
import keyboard from "./modules/keyboard";
import initModal from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalStartPrint: HTMLElement = document.querySelector(".modal_start-print");

  keyboard();
  initModal({
    modalSelector: ".modal_start-print",
    activeClass: "modal_active",
    triggerCloseSelector: ".modal__close-trigger",
    next: function() {
      const startPrintBtn = modalStartPrint.querySelector(".modal__start-print-btn");

      startPrintBtn.addEventListener("click", handleClick)
      document.addEventListener("keydown", handleKeyDown);

      // handler functions
      function handleKeyDown(event: KeyboardEvent) {
        if (event.code === "Enter" || event.code === "Space") {
          modalStartPrint.dispatchEvent(new CustomEvent("closeModal"));
          initTraining();
          document.removeEventListener("keydown", handleKeyDown);
          startPrintBtn.removeEventListener("click", handleClick);
        }
      }
      function handleClick(event: MouseEvent) {
        modalStartPrint.dispatchEvent(new CustomEvent("closeModal"));
        initTraining();
        startPrintBtn.removeEventListener("click", handleClick);
        document.removeEventListener("keydown", handleKeyDown);
      }
    }
  });
})