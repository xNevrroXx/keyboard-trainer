function setCustomTestingText() {
  const textAreaCustomText: HTMLTextAreaElement = document.querySelector("textarea[name='custom-text']");
  const testingTextElem: HTMLElement = document.querySelector("#testing-text");

  textAreaCustomText.focus();

  textAreaCustomText.addEventListener("input", function(event: InputEvent) {
    event.preventDefault();

    const inputData = this.value;
    let resultString = "";
    let notAllowedText = "";
    let replacedText = "";

    for (let i = 0; i < inputData.length; i++) {
      const char = inputData[i];
      let previousChar = "";
      if (i !== 0) {
        previousChar = inputData[i - 1];
      }

      if (/[a-zа-яё0-9}{\[\]:;'\/"<>,.~?!@#$%^&*()_+№\-= ]/i.test(char)) {
        resultString += char;
      }
      else if (/(\r\n|\r|\n)/.test(char)) {

        if (previousChar !== char) {
          resultString += char;
        }
      }
      else if (/’/.test(char)) {
        replacedText += char;
        resultString += "'";
      } else {
        notAllowedText += char;
      }
    }

    this.value = resultString;
    testingTextElem.textContent = resultString;
    if (notAllowedText.length > 0) {
      alert("These characters are not allowed: " + notAllowedText);
    }
    if (replacedText.length > 0) {
      alert(`This char ${replacedText} has been replaced by: ` + "'")
    }
  })
}

export default setCustomTestingText;