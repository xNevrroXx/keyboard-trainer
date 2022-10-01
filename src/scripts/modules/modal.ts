function initModal(
  {modalSelector, activeClass, triggerCloseSelector, triggerOpenSelector, callbackOnOpen = null, callbackOnClose = null, next = null}
: {modalSelector: string, activeClass: string, triggerCloseSelector?: string, triggerOpenSelector?: string, callbackOnOpen?: () => void, callbackOnClose?: () => void, next?: () => void}
) {
  const modalElem = document.querySelector(modalSelector);

  const openModalEvent = new CustomEvent("openModal");
  const closeModalEvent = new CustomEvent("closeModal");

  modalElem.addEventListener("openModal", function() {
    this.classList.add(activeClass);
    if(callbackOnOpen !== null) {
      callbackOnOpen();
    }
  })
  modalElem.addEventListener("closeModal", function() {
    this.classList.remove(activeClass);
    if(callbackOnClose !== null) {
      callbackOnClose();
    }
  })

  if(triggerOpenSelector) {
    const triggerElems = document.querySelectorAll(triggerOpenSelector);
    triggerElems.forEach(triggerElem => {
      triggerElem.addEventListener("click", () => {
        modalElem.dispatchEvent(openModalEvent);
      })
    })
  }
  if (triggerCloseSelector) {
    const triggerElems = document.querySelectorAll(triggerCloseSelector);
    triggerElems.forEach(triggerElem => {
      triggerElem.addEventListener("click", () => {
        modalElem.dispatchEvent(closeModalEvent);
      })
    })
  }

  if(next !== null) {
    next();
  }
}

export default initModal;