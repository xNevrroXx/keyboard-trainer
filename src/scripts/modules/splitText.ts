function splitText(textElem: HTMLElement) {
  const resultText = textElem.innerHTML
    .replace(/( )+/gm, " ")
    .replace(/\r|\n]+/gm, "\n");

  textElem.innerHTML = resultText.split("").map((char, index) => {
    if(/[a-zа-яё0-9}{\[\]:;'\/"<>,.~?!@#$%^&*()_+№\-= ]/ig.test(char)) {
      return `<span class="text__char">${char}</span>`;
    }
    else if (/(\r\n|\r|\n)/.test(char)) {
      return  `<span class="text__char line-break"><svg width="24px" height="24px" viewBox="0 0 24 24">
                    <path clip-rule="evenodd" d="M3 14a1 1 0 0 1 1-1h12a3 3 0 0 0 3-3V6a1 1 0 1 1 2 0v4a5 5 0 0 1-5 5H4a1 1 0 0 1-1-1z"/>
                    <path clip-rule="evenodd" d="M3.293 14.707a1 1 0 0 1 0-1.414l4-4a1 1 0 0 1 1.414 1.414L5.414 14l3.293 3.293a1 1 0 1 1-1.414 1.414l-4-4z"/>
                  </svg><br></span>`;
    }

    return "";
  }).join("");

  return resultText;
}

export default splitText;