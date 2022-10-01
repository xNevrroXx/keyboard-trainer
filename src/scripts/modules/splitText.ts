function splitText(textElem: HTMLElement) {
  textElem.innerHTML = textElem.innerHTML.split("").map(char => {
    return `<span class="char">${char}</span>`
  }).join("");
}

export default splitText;