function splitText(textElem: HTMLElement) {
  const text = textElem.textContent
    .replace(/\r?\n|\r|\n/g, " ")
    .replace(/\s+/g, " ");

  textElem.innerHTML = text.split("").map(char => {
    if(/[a-zа-яё0-9}{\[\]:;'\/"<>,.~?!@#$%^&*()_+№\-= ]/ig.test(char) === false) {
      return "";
    }
    return `<span class="text__char">${char}</span>`
  }).join("");
}

export default splitText;