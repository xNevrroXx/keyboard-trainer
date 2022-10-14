function splitText(textElem) {
    const text = textElem.textContent
        .replace(/\r?\n|\r|\n/g, " ")
        .replace(/\s+/g, " ");
    textElem.innerHTML = text.split("").map(char => {
        return `<span class="char">${char}</span>`;
    }).join("");
}
export default splitText;
