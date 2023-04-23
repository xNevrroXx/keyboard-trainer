// own modules
import splitText from "./splitText";
import DataStatisticSpeed from "./DataStatisticSpeed";
// types
import {IStatisticWithText} from "../types";

function initTraining(next: (statisticWithText?: IStatisticWithText) => void, text?: string) {
  const keyboardInputPhone: HTMLInputElement = document.querySelector("#keyboard-input-phone");
  const testingTextElem: HTMLElement = document.querySelector("#testing-text"),
    statisticElem = document.querySelector(".statistic");

  let idIntervalTyping: NodeJS.Timer;
  let indexTargetChar: number = 0,
    countErrors: number = 0,
    wasError: boolean = false;

  const statistic: {speed: number, accuracy: number} = {
    speed: 0,
    accuracy: 0
  },
  pastTime = {
    time: 0
  };
  let dataStatisticSpeed: DataStatisticSpeed = new DataStatisticSpeed();
  const buffer: string[] = [];
  let isClickShift = {isClicked: false},
    isClickCapsLock = {isClicked: false};

  const specialKeyCodes = [
    "ControlLeft",
    "ControlRight",
    "ShiftRight",
    "ShiftLeft",
    "CapsLock",
    "Backspace",
    "ContextMenu",
    "AltLeft"
  ];

  const statisticSpeedValueElem = statisticElem.querySelector(".statistic-item_print-speed .statistic-item__value"),
    statisticAccuracyElem = statisticElem.querySelector(".statistic-item_accuracy .statistic-item__value");

  if (text != null && text !== "") {
    testingTextElem.textContent = text;
  }
  testingTextElem.textContent = testingTextElem.textContent.trim();
  const testingText = splitText(testingTextElem);

  // logic
  dataStatisticSpeed.setText(testingText);
  toggleClassTextChar(testingTextElem, indexTargetChar, "text__char-target");
  scrollToTarget();

  window.addEventListener("keydown", handleKeyDownTraining)
  window.addEventListener("click", handleClick);
  // start mobile devices support
  window.addEventListener("touchstart", () => {
    keyboardInputPhone.focus();
  })
  window.addEventListener("click", () => {
    keyboardInputPhone.focus();
  })
  // keyboardInputPhone.addEventListener("keydown", () => {}, false);
  // end mobile devices support

  idIntervalTyping = setInterval(() => {
    pastTime.time = pastTime.time + 100;
    updateStatistic();

    if(pastTime.time % 1000 === 0) {
      statisticSpeedValueElem.textContent = statistic.speed.toString();
      statisticAccuracyElem.textContent = statistic.accuracy.toString();
    }
  }, 100);

  function handleClick(event: MouseEvent) {
    const target = event.target as Element;

    if (target && target.classList.contains("keyboard__key")) {
      const code = target.getAttribute("id");

      let key = null;
      let codeKey = null;

      if (code === "Space") {
        key = " ";
        codeKey = "Space";
      } else if (code === "Enter") {
        key = "";
        codeKey = "Enter";
      }
      else if (isClickShift.isClicked || isClickCapsLock.isClicked) {
        key = target.textContent.toUpperCase();
      } else if (event.getModifierState && (event.getModifierState("CapsLock") || event.getModifierState("Shift"))) {
        key = target.textContent.toUpperCase();
      } else {
        key = target.textContent.toLowerCase();
      }

      if (!specialKeyCodes.includes(code)) {
        processingTraining(key, codeKey);
      } else {
        if (code === "CapsLock") {
          if (!isClickCapsLock.isClicked) {
            dispatchKeyDown(isClickCapsLock, ["CapsLock"], "keydown");
          } else {
            dispatchKeyDown(isClickCapsLock, ["CapsLock"], "keyup");
          }
        } else if (code === "ShiftLeft" || code === "ShiftRight") {
          if (!isClickShift.isClicked) {
            dispatchKeyDown(isClickShift, ["ShiftLeft", "ShiftRight"], "keydown");
          } else {
            dispatchKeyDown(isClickShift, ["ShiftLeft", "ShiftRight"], "keyup");
          }
        }
      }
    }
  }

  function handleKeyDownTraining({key, code}: KeyboardEvent) {
    processingTraining(key, code);
  }
  async function processingTraining(key: string, code: string) {
    if (isClickShift.isClicked) { // canceling the Shift key press which was pressed with a mouse click
      dispatchKeyDown(isClickShift, ["ShiftLeft", "ShiftRight"], "keyup");
    }

    if (testingText[indexTargetChar] === key && !specialKeyCodes.includes(code) || (testingText[indexTargetChar].charCodeAt(0) === 10 && code === "Enter")) {
      scrollToTarget();

      buffer.push(code);
      updateStatistic();
      if (code === "Space" || code === "Enter") {
        dataStatisticSpeed.addStatisticData({char: code, speed: statistic.speed, accuracy: 100});
      }
      else {
        dataStatisticSpeed.addStatisticData({char: key.toLowerCase(), speed: statistic.speed, accuracy: 100});
      }

      if (wasError) {
        toggleClassTextChar(testingTextElem, indexTargetChar, "text__char-failed");
        wasError = false;
      }

      if (testingText[indexTargetChar].charCodeAt(0) === 10) {
        toggleClassTextChar(testingTextElem, indexTargetChar, "text__char-passed-svg");
      }

      toggleClassTextChar(testingTextElem, indexTargetChar, "text__char-passed");
      toggleClassTextChar(testingTextElem, indexTargetChar, "text__char-target");

      if (testingText.length - 1 === indexTargetChar) {
        try {
          const response = await onEndTraining();

          if (next) {
            next(dataStatisticSpeed.getAvgStatistic());
          }
          return;
        }
        catch (error) {
          return;
        }
      }
      else {
        indexTargetChar++;
        toggleClassTextChar(testingTextElem, indexTargetChar, "text__char-target");
      }
    } else if (!specialKeyCodes.includes(code)) {
      let codeTarget = "";

      if (/( )/.test(testingText[indexTargetChar])) {
        codeTarget = "Space";
      }
      else if (/(\r\n|\r|\n)/.test(testingText[indexTargetChar])) {
        codeTarget = "Enter";
      }
      else {
        codeTarget = testingText[indexTargetChar];
      }

      dataStatisticSpeed.addStatisticData({char: codeTarget, accuracy: 0});
      wasError = true;
      testingTextElem.querySelectorAll("span")[indexTargetChar].classList.add("text__char-failed");
      countErrors++;
    }
  }
  async function onEndTraining() {
    clearInterval(idIntervalTyping);
    window.removeEventListener("keydown", handleKeyDownTraining);
    window.removeEventListener("click", handleClick);
  }
  function toggleClassTextChar(textElementWithSpans: HTMLElement, indexHighlight: number, className: string) {
    textElementWithSpans.querySelectorAll("span")[indexHighlight].classList.toggle(className);
  }
  function updateStatistic() {
    if(pastTime.time !== 0) {
      statistic.accuracy = buffer.length !== 0 ? Math.floor(100 - countErrors / (buffer.length / 100)) : 100;
      statistic.speed = Math.floor(buffer.length / ((pastTime.time || 500) / (1000 * 60)) );
    }
  }
  function dispatchKeyDown (toggler: {isClicked: boolean}, codeKeys: string[], typeEvent: string) {
    codeKeys.forEach(codeKey =>
      window.dispatchEvent(new KeyboardEvent(typeEvent, {code: codeKey}))
    )
    toggler.isClicked = !toggler.isClicked;
  }
  function scrollToTarget() {
    const targetChar: HTMLSpanElement | null = testingTextElem.querySelector(".text__char-target");
    if (!targetChar) throw new Error("No target character");
    testingTextElem.scrollTop = targetChar.offsetTop;
    testingTextElem.scrollTop += -3;
  }
}

export default initTraining;