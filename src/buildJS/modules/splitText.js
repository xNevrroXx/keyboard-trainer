function splitText(textElem) {
    textElem.innerHTML = textElem.innerHTML.split("").map(char => {
        return `<span class="char">${char}</span>`;
    }).join("");
}
export default splitText;
