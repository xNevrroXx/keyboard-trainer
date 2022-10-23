function initModal(
  {
    modalSelector, activeClass, triggerCloseSelector, triggerConfirmSelector, closeOnBackgroundSelector,
    triggerOpenSelector, callbackOnOpen = null, callbackOnClose = null, callbackOnConfirm = null,
    next = null
  }
: {
    modalSelector: string, activeClass: string, triggerCloseSelector?: string, triggerConfirmSelector?: string, closeOnBackgroundSelector?: string,
    triggerOpenSelector?: string, callbackOnOpen?: () => void, callbackOnClose?: () => void, callbackOnConfirm?: () => void,
    next?: () => void
  }
) {
  const modalElem = document.querySelector(modalSelector);

  const openModalEvent = new CustomEvent("openModal");
  const closeModalEvent = new CustomEvent("closeModal");

  if(triggerConfirmSelector && callbackOnConfirm) {
    const confirmElem = modalElem.querySelector(triggerConfirmSelector);


      confirmElem.addEventListener("click", callbackOnConfirm);
  }

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
  if (closeOnBackgroundSelector) {
    const triggerElem = document.querySelector(closeOnBackgroundSelector);

    triggerElem.addEventListener("click", (event) => {
      if (event.target === triggerElem) {
        modalElem.dispatchEvent(closeModalEvent);
      }
    });
  }

  if(next !== null) {
    next();
  }
}

export default initModal;