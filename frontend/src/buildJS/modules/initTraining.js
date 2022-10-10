import splitText from "./splitText";
function initTraining(chartStatistic) {
    const textElem = document.querySelector(".text"), statisticElem = document.querySelector(".statistic");
    let indexTargetChar = 0, pastTime = 0, countErrors = 0, wasError = false;
    const statistic = {
        speed: 0,
        accuracy: 0
    };
    chartStatistic.length = 0;
    const buffer = [];
    const specialKeyCodes = [
        "ControlLeft",
        "ControlRight",
        "ShiftRight",
        "ShiftLeft",
        "CapsLock",
        "Backspace",
        "ContextMenu",
    ];
    const statisticSpeedValueElem = statisticElem.querySelector(".statistic-item_print-speed .statistic-item__value"), statisticAccuracyElem = statisticElem.querySelector(".statistic-item_accuracy .statistic-item__value");
    setInterval(() => {
        pastTime++;
        statistic.accuracy = buffer.length !== 0 ? Math.floor(100 - countErrors / (buffer.length / 100)) : 100;
        statistic.speed = Math.floor(buffer.length / (pastTime / 60));
        chartStatistic.push({
            accuracy: statistic.accuracy,
            speed: statistic.speed,
            time: pastTime
        });
        statisticSpeedValueElem.textContent = statistic.speed.toString();
        statisticAccuracyElem.textContent = statistic.accuracy.toString();
    }, 1000);
    textElem.textContent = textElem.textContent.trim();
    splitText(textElem);
    toggleClassTextChar(textElem, indexTargetChar, "text_target");
    window.addEventListener("keydown", handlerKeyDownTraining);
    function handlerKeyDownTraining({ key, code }) {
        if (textElem.textContent[indexTargetChar] === key && !specialKeyCodes.includes(code)) {
            if (wasError) {
                toggleClassTextChar(textElem, indexTargetChar, "text_failed");
                wasError = false;
            }
            if (textElem.textContent.length - 1 === indexTargetChar) {
                endTraining();
                return;
            }
            buffer.push(code);
            toggleClassTextChar(textElem, indexTargetChar, "text_passed");
            toggleClassTextChar(textElem, indexTargetChar, "text_target");
            indexTargetChar++;
            toggleClassTextChar(textElem, indexTargetChar, "text_target");
        }
        else if (!specialKeyCodes.includes(code) && !wasError) {
            wasError = true;
            toggleClassTextChar(textElem, indexTargetChar, "text_failed");
            countErrors++;
        }
    }
    function endTraining() {
        window.removeEventListener("keydown", handlerKeyDownTraining);
        window.location.href = "http://localhost:4000/pages/results.html";
    }
    function toggleClassTextChar(textElementWithSpans, indexHighlight, className) {
        textElementWithSpans.querySelectorAll("span")[indexHighlight].classList.toggle(className);
    }
}
export default initTraining;
