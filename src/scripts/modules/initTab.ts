// types
import {ITabMatchTriggerContent} from "../types";

function initTab(matchTriggerContent: ITabMatchTriggerContent) {
  const triggerContainerElem = document.querySelector(matchTriggerContent.containers.trigger);
  const contentContainerElem = document.querySelector(matchTriggerContent.containers.content);
  const matchTriggerContentElems: Map<HTMLElement, HTMLElement> = new Map();

  matchTriggerContent.matchesDatasetId.forEach(matchSlice => {
    matchTriggerContentElems
      .set(
        triggerContainerElem.querySelector(matchTriggerContent.mainSelectors.trigger + `[data-id="${matchSlice.trigger}"]`) as HTMLElement,
        contentContainerElem.querySelector(matchTriggerContent.mainSelectors.content + `[data-id="${matchSlice.content}"]`) as HTMLElement
      );
  })

  toggleClasses(triggerContainerElem.querySelector(matchTriggerContent.mainSelectors.trigger + `[data-id="${matchTriggerContent.defaultActiveDatasetId}"]`));

  console.log("triggerContainerElem: ", triggerContainerElem);
  triggerContainerElem.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    console.log("target: ", target);
    if (target) {
      for (const [trigger, content] of matchTriggerContentElems) {
        if (target === trigger) {
          toggleClasses(target);
        }
      }
    }
  })

  function toggleClasses(targetTrigger: HTMLElement) {
    for (const [trigger, content] of matchTriggerContentElems) {
      trigger.classList.remove(matchTriggerContent.activeClass.trigger);
      content.classList.remove(matchTriggerContent.activeClass.content);

      if (targetTrigger === trigger) {
        trigger.classList.add(matchTriggerContent.activeClass.trigger);
        content.classList.add(matchTriggerContent.activeClass.content);
      }
    }
  }
}

export default initTab;