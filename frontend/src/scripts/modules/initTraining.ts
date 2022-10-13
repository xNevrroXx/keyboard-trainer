import splitText from "./splitText";
// types
import DataStatisticSpeed from "./DataStatisticSpeed";

function initTraining(next: () => void = null) {
  const textElem: HTMLElement = document.querySelector(".text"),
    statisticElem = document.querySelector(".statistic");

  let indexTargetChar: number = 0,
    countErrors: number = 0,
    wasError: boolean = false;

  const statistic = {
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
  ];

  const statisticSpeedValueElem = statisticElem.querySelector(".statistic-item_print-speed .statistic-item__value"),
    statisticAccuracyElem = statisticElem.querySelector(".statistic-item_accuracy .statistic-item__value");


  textElem.textContent = textElem.textContent.trim();
  splitText(textElem);
  toggleClassTextChar(textElem, indexTargetChar, "text_target");
  window.addEventListener("keydown", handleKeyDownTraining)
  window.addEventListener("click", handleClick);

  // const changePastTimeFastBind = updateStatistic.bind(null, pastTime, 10);
  const idFastInterval = setInterval(() => {
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

      if (code === "Space") {
        key = " ";
      } else if (isClickShift.isClicked || isClickCapsLock.isClicked) {
        console.log(true)
        key = target.textContent.toUpperCase();
      } else if (event.getModifierState && (event.getModifierState("CapsLock") || event.getModifierState("Shift"))) {
        key = target.textContent.toUpperCase();
      } else {
        key = target.textContent.toLowerCase();
      }

      if (!specialKeyCodes.includes(code)) {
        processingTraining(key, code);
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
  function processingTraining(key: string, code: string) {
    if(isClickShift.isClicked) {
      dispatchKeyDown(isClickShift, ["ShiftLeft", "ShiftRight"], "keyup");
    }

    if(textElem.textContent[indexTargetChar] === key && !specialKeyCodes.includes(code)) {
      if(wasError) {
        toggleClassTextChar(textElem, indexTargetChar, "text_failed");
        wasError = false;
      }

      if(textElem.textContent.length - 1 === indexTargetChar) {
        onEndTraining();
        if(next) {
          next();
        }
        return;
      }
      buffer.push(code);
      updateStatistic();
      dataStatisticSpeed.addData({char: key.toLowerCase(), speed: statistic.speed});
      console.log("data: ", dataStatisticSpeed.data)
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
    clearInterval(idFastInterval);
    window.removeEventListener("keydown", handleKeyDownTraining);
  }
  function toggleClassTextChar(textElementWithSpans: HTMLElement, indexHighlight: number, className: string) {
    textElementWithSpans.querySelectorAll("span")[indexHighlight].classList.toggle(className);
  }
  function updateStatistic() {
    statistic.accuracy = buffer.length !== 0 ? Math.floor(100 - countErrors / (buffer.length / 100)) : 100;
    statistic.speed = Math.floor(buffer.length / ((pastTime.time || 500) / (1000 * 60)) );
  }
  function dispatchKeyDown (toggler: {isClicked: boolean}, codeKeys: string[], typeEvent: string) {
    codeKeys.forEach(codeKey =>
      window.dispatchEvent(new KeyboardEvent(typeEvent, {code: codeKey}))
    )
    toggler.isClicked = !toggler.isClicked;
    console.log(toggler)
  }
}

export default initTraining;