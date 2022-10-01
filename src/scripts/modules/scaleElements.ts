function scaleElements(container: HTMLElement, elements: NodeListOf<Element>) {
  elements.forEach((element: HTMLElement) => {
    if(!element.classList.contains("modal") && !element.classList.contains("main-navbar")) {
      const scale = Math.min(
        container.offsetWidth / element.offsetWidth,
        container.offsetHeight / element.offsetHeight
      );

      if (scale <= 1 && scale > 0) {
        element.style.transform = `scale(${scale - 0.1})`;
      }
    }
  });
}

export default scaleElements;