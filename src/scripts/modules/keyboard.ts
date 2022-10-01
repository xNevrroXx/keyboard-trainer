function keyboard() {
  // Constants
  const body = document.getElementsByTagName("body")[0],
    domElements: NodeListOf<Element> = document.querySelectorAll("body > *"),
    gif = document.getElementById("gif"),
    keys = [
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
      "MetaLeft",
      "AltLeft",
      "Space",
      "AltRight",
      "ContextMenu",
    ],
    konamiCode = [
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

// Variables
  let konamiBuffer: any[] = [];

// Functions
  function checkForKonamiCode(pushToBuffer: string) {
    konamiBuffer.push(pushToBuffer);

    const stringifiedBuffer = konamiBuffer.slice(-11).toString(),
      stringifiedKonamiCode = konamiCode.toString();

    if (stringifiedBuffer === stringifiedKonamiCode) {
      gif.classList.toggle("gif--hidden");
    }
  }

// Digital keyboard sync
  keys.forEach((key, index) => {
    document
      .getElementById(keys[index])
      .addEventListener("click", function (event) {
        const target: EventTarget = event.target;
        if(target instanceof HTMLElement) {
          checkForKonamiCode(target.id);
        }
      });
  });

  window.addEventListener("keydown", (event) => {
    if (keys.includes(event.code)) {
      document.getElementById(event.code).classList.add("active");
      if(event.getModifierState && event.getModifierState("CapsLock")) {
        console.log(event.getModifierState("CapsLock"))
        document.getElementById("CapsLock").classList.add("activated");
      }
      else {
        document.getElementById("CapsLock").classList.remove("activated");
      }
    }
    checkForKonamiCode(event.code);
  });

  window.addEventListener("keyup", ({ code }) => {
    if (keys.includes(code)) {
      document.getElementById(code).classList.remove("active");
    }
  });


// Responsive scaling
}

export default keyboard;