function splitText(textElem: HTMLElement) {
  const text = textElem.textContent
    .replace(/\r?\n|\r|\n/g, " ")
    .replace(/\s+/g, " ");

  textElem.innerHTML = text.split("").map(char => {
    return `<span class="text__char">${char}</span>`
  }).join("");
}

export default splitText;