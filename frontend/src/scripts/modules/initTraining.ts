import splitText from "./splitText";
// types
import {IChartStatistic} from "../types";

function initTraining(chartStatistic: IChartStatistic[], next: () => void = null) {
  const textElem: HTMLElement = document.querySelector(".text"),
    statisticElem = document.querySelector(".statistic");

  let indexTargetChar: number = 0,
    pastTime: number = 0,
    countErrors: number = 0,
    wasError: boolean = false;

  const statistic = {
    speed: 0,
    accuracy: 0
  }
  chartStatistic.length = 0;
  const buffer: string[] = [];

  const specialKeyCodes = [
    "ControlLeft",
    "ControlRight",
    "ShiftRight",
    "ShiftLeft",
    "CapsLock",
    "Backspace",
    "ContextMenu",
  ];

  const statisticSpeedValueElem = statisticElem.querySelector(".statistic-item_print-speed .statistic-item__value"),
    statisticAccuracyElem = statisticElem.querySelector(".statistic-item_accuracy .statistic-item__value");

  setInterval(() => {
    pastTime++;
    statistic.accuracy = buffer.length !== 0 ? Math.floor(100 - countErrors / (buffer.length / 100)) : 100;
    statistic.speed = Math.floor(buffer.length / (pastTime/60));
    chartStatistic.push({
      accuracy: statistic.accuracy,
      speed: statistic.speed,
      time: pastTime
    })

    statisticSpeedValueElem.textContent = statistic.speed.toString();
    statisticAccuracyElem.textContent = statistic.accuracy.toString();
  }, 1000)


  textElem.textContent = textElem.textContent.trim();
  splitText(textElem);
  toggleClassTextChar(textElem, indexTargetChar, "text_target");
  window.addEventListener("keydown", handlerKeyDownTraining)

  function handlerKeyDownTraining({key, code}: KeyboardEvent) {
    if(textElem.textContent[indexTargetChar] === key && !specialKeyCodes.includes(code)) {
      if(wasError) {
        toggleClassTextChar(textElem, indexTargetChar, "text_failed");
        wasError = false;
      }
      if(textElem.textContent.length - 1 === indexTargetChar) {
        onEndTraining();
        if(next) {
          console.log("start next initTraining")
          next();
        }
        return;
      }
      buffer.push(code);
      toggleClassTextChar(textElem, indexTargetChar, "text_passed");
      toggleClassTextChar(textElem, indexTargetChar, "text_target");

      indexTargetChar++;
      toggleClassTextChar(textElem, indexTargetChar, "text_target");
    }
    else if(!specialKeyCodes.includes(code) && !wasError) {
      wasError = true;
      toggleClassTextChar(textElem, indexTargetChar, "text_failed");
      countErrors++;
    }
  }
  function onEndTraining() {
    window.removeEventListener("keydown", handlerKeyDownTraining);
  }
  function toggleClassTextChar(textElementWithSpans: HTMLElement, indexHighlight: number, className: string) {
    textElementWithSpans.querySelectorAll("span")[indexHighlight].classList.toggle(className);
  }
}

export default initTraining;