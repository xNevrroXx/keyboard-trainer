function toggleClass({selector, classStr, element}: {selector?: string, classStr: string, element?: HTMLElement}) {
  if(!(selector || element)) {
    throw new Error("You have to pass either element or selector");
  }

  if(element)
    element.classList.toggle(classStr);
  else
    document.querySelector(selector).classList.toggle(classStr);
}

export default toggleClass;