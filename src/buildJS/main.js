window.addEventListener("DOMContentLoaded", () => {
    // Constants
    const body = document.getElementsByTagName("body")[0], domElements = document.querySelectorAll("body > *"), gif = document.getElementById("gif"), keyboard = document.getElementsByClassName("keyboard")[0], textElem = document.querySelector(".text"), statisticElem = document.querySelector(".statistic"), keys = [
        "Backquote",
        "Digit1",
        "Digit2",
        "Digit3",
        "Digit4",
        "Digit5",
        "Digit6",
        "Digit7",
        "Digit8",
        "Digit9",
        "Digit0",
        "Minus",
        "Equal",
        "Backslash",
        "Tab",
        "KeyQ",
        "KeyW",
        "KeyE",
        "KeyR",
        "KeyT",
        "KeyY",
        "KeyU",
        "KeyI",
        "KeyO",
        "KeyP",
        "BracketLeft",
        "BracketRight",
        "Backspace",
        "CapsLock",
        "KeyA",
        "KeyS",
        "KeyD",
        "KeyF",
        "KeyG",
        "KeyH",
        "KeyJ",
        "KeyK",
        "KeyL",
        "Semicolon",
        "Quote",
        "Enter",
        "ShiftLeft",
        "KeyZ",
        "KeyX",
        "KeyC",
        "KeyV",
        "KeyB",
        "KeyN",
        "KeyM",
        "Comma",
        "Period",
        "Slash",
        "ShiftRight",
        "ControlLeft",
        "ControlRight",
        // "MetaLeft",
        "AltLeft",
        "Space",
        "AltRight",
        "ContextMenu",
    ], specialKeyCodes = [
        "ControlLeft",
        "ControlRight",
        "ShiftRight",
        "ShiftLeft",
        "CapsLock",
        "Backspace",
        "ContextMenu",
    ], konamiCode = [
        "ArrowUp",
        "ArrowUp",
        "ArrowDown",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "ArrowLeft",
        "ArrowRight",
        "KeyB",
        "KeyA",
        "Enter"
    ];
    textElem.textContent = textElem.textContent.trim();
    // Variables
    let konamiBuffer = [], buffer = [], countErrors = 0;
    // Functions
    function initTraining() {
        let indexTargetChar = 0, pastTime = 0, failedTargetChar = null;
        const statisticSpeedValueElem = statisticElem.querySelector(".statistic__speed > .value"), statisticAccuracyElem = statisticElem.querySelector(".statistic__accuracy .value");
        setInterval(() => {
            pastTime++;
            const accuracy = buffer.length !== 0 ? Math.floor(100 - countErrors / (buffer.length / 100)) : 100, speed = Math.floor(buffer.length / pastTime);
            console.log(accuracy);
            statisticSpeedValueElem.textContent = speed.toString();
            statisticAccuracyElem.textContent = accuracy.toString() + "%";
        }, 1000);
        window.addEventListener("keydown", ({ key, code }) => {
            console.log("targetKey: ", textElem.textContent[indexTargetChar]);
            console.log("key: ", key);
            if (textElem.textContent[indexTargetChar] === key && !specialKeyCodes.includes(code)) {
                if (failedTargetChar) {
                    toggleKeyClass(failedTargetChar, "keyboard__target-key");
                    failedTargetChar = null;
                }
                buffer.push(code);
                indexTargetChar++;
                // console.log(buffer)
            }
            else if (!specialKeyCodes.includes(code) && !failedTargetChar) {
                failedTargetChar = code;
                toggleKeyClass(failedTargetChar, "keyboard__target-key");
                countErrors++;
            }
        });
    }
    function toggleKeyClass(code, neededClass) {
        const selectorKey = "#" + (code.includes("Key") ? `Key${code[3].toUpperCase()}` : code);
        console.log(selectorKey);
        const targetKeyElem = document.querySelector(selectorKey);
        targetKeyElem.classList.toggle(neededClass);
    }
    function checkForKonamiCode(pushToBuffer) {
        konamiBuffer.push(pushToBuffer);
        const stringifiedBuffer = konamiBuffer.slice(-11).toString(), stringifiedKonamiCode = konamiCode.toString();
        if (stringifiedBuffer === stringifiedKonamiCode) {
            gif.classList.toggle("gif--hidden");
        }
    }
    function scaleElements(container, elements) {
        elements.forEach((element) => {
            const scale = Math.min(container.offsetWidth / element.offsetWidth, container.offsetHeight / element.offsetHeight);
            if (scale <= 1 && scale > 0)
                element.style.transform = `scale(${scale - 0.1})`;
        });
    }
    // Digital keyboard sync
    initTraining();
    keys.forEach((key, index) => {
        document
            .getElementById(keys[index])
            .addEventListener("click", function (event) {
            const target = event.target;
            if (target instanceof HTMLElement) {
                checkForKonamiCode(target.id);
            }
        });
    });
    window.addEventListener("keydown", ({ code }) => {
        if (keys.includes(code)) {
            document.getElementById(code).classList.add("active");
            checkForKonamiCode(code);
        }
    });
    window.addEventListener("keyup", ({ code }) => {
        if (keys.includes(code)) {
            document.getElementById(code).classList.remove("active");
        }
    });
    // Responsive scaling
    scaleElements(body, domElements);
    window.addEventListener("resize", () => {
        scaleElements(body, domElements);
    });
});
