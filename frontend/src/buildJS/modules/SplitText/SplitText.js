/*
* This function cut into pieces and replace needed text into DOM-structure with wrapped analog. As a wrapper acts div-element with inline-styles.
* Returns the object. which will contain 3 fields: array of the lines, words and chars.
*
* @param {string, Element, Node, NodeList} targets - container element
* @param {object} vars - styles of each div that wrapper character
*
* */
function SplitText(target, vars) {
    let resultObj = {};
    let containerElement;
    const stylesObj = {
        position: "absolute",
    };
    if (typeof target === "string") {
        containerElement = document.querySelector(target);
    }
    else {
        containerElement = target;
    }
    if (vars.words && vars.chars) {
        if ("innerHTML" in containerElement) {
            containerElement.innerHTML = containerElement.innerHTML.split(" ").map(word => {
                return `<div class="word" style="display: inline-block; width: max-content">
        ${word.split("").map(char => {
                    return `<div class="char" style="display: inline-block; width: ${char === " " ? "1rem" : "max-content"}">${char}</div>`;
                }).join("")}
      </div>`;
            }).join(" ");
        }
        resultObj = {
            words: containerElement.querySelectorAll("div.word"),
            chars: containerElement.querySelectorAll("div.word > div.char")
        };
    }
    else if (vars.chars) {
        containerElement.innerHTML = containerElement.innerHTML.split("").map((char) => {
            return `<div class="char" style="display: inline-block; width: max-content">${char}</div>`;
        }).join("");
        resultObj = {
            chars: containerElement.querySelectorAll("div.word > div.char")
        };
    }
    return resultObj;
}
export default SplitText;
