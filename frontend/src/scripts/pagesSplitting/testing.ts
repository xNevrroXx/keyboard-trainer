// types
import {IChartStatistic, IMatchPagesUrl} from "../types";
// own modules
import keyboard from "../modules/keyboard";
import initModal from "../modules/modal";
import initTraining from "../modules/initTraining";


function testing(MATCH_PAGES_URL: IMatchPagesUrl) {
  const modalStartPrint: HTMLElement = document.querySelector(".modal_start-print");
  const chartStatistic: IChartStatistic[] = [];

  console.log(MATCH_PAGES_URL)
  keyboard();
  initModal({
    modalSelector: ".modal_start-print",
    activeClass: "modal_active",
    triggerCloseSelector: ".modal__close-trigger",
    next: function () {
      const startPrintBtn = modalStartPrint.querySelector(".modal__start-print-btn");

      startPrintBtn.addEventListener("click", handleClick)
      document.addEventListener("keydown", handleKeyDown);

      // handler functions
      function handleKeyDown(event: KeyboardEvent) {
        if (event.code === "Enter" || event.code === "Space") {
          modalStartPrint.dispatchEvent(new CustomEvent("closeModal"));
          initTraining(
            chartStatistic,
            () => window.location.href = MATCH_PAGES_URL["results"].pathname
          );
          document.removeEventListener("keydown", handleKeyDown);
          startPrintBtn.removeEventListener("click", handleClick);
        }
      }

      function handleClick(event: MouseEvent) {
        modalStartPrint.dispatchEvent(new CustomEvent("closeModal"));
        initTraining(
          chartStatistic,
          () => window.location.href = MATCH_PAGES_URL["results"].pathname
        );
        startPrintBtn.removeEventListener("click", handleClick);
        document.removeEventListener("keydown", handleKeyDown);
      }
    }
  });
}

export default testing;