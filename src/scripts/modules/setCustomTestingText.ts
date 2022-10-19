function setCustomTestingText() {
  const textAreaCustomText: HTMLTextAreaElement = document.querySelector("textarea[name='custom-text']");
  const testingTextElem: HTMLElement = document.querySelector("#testing-text");

  textAreaCustomText.focus();

  textAreaCustomText.addEventListener("input", function(event) {
    testingTextElem.textContent = this.value;
  })
}

export default setCustomTestingText;