import {IResponseStatistic, ITabMatchTriggerContent} from "../types";
import {authenticate, statisticDataGet} from "../services/services";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";
import makeChart from "../modules/makeChart";
import initTab from "../modules/initTab";

async function profile() {
  try {
    const authenticateResponse = await authenticate();
    const educationResultsELem = document.querySelector(".profile__tab-content-element[data-id='1']"),
      resultsElem = document.querySelector(".profile__tab-content-element[data-id='2']"),
      friendsElem = document.querySelector(".profile__tab-content-element[data-id='3']");

    const matchTriggerContentMain: ITabMatchTriggerContent = {
      containers: {
        trigger: ".profile__list-personal-keyboard-data",
        content: ".profile__tab-content-wrapper"
      },
      mainSelectors: {
        trigger: ".profile__data-tab-trigger",
        content: ".profile__tab-content-element"
      },
      activeClass: {
        trigger: "button_in-text_active",
        content: "profile__tab-content-element_active"
      },
      matchesDatasetId: [
        {
          trigger: 1,
          content: 1
        },
        {
          trigger: 2,
          content: 2
        },
        {
          trigger: 3,
          content: 3
        },
      ],
      defaultActiveDatasetId: 1
    }
    initTab(matchTriggerContentMain);

    // education results
    try {
      throw new Error("There is no data");
    }
    catch (error) {
      const plug = educationResultsELem.querySelector(".plug")
      plug.classList.remove("hidden");
    }

    // statistic results
    try {
      const response: IResponseStatistic | Error = await statisticDataGet("all");
      const data = response as IResponseStatistic;

      for (const timestamp of Object.keys(data).sort().reverse() as (keyof typeof data)[]) {
        const contentElem = document.createElement("div");
        contentElem.classList.add("profile__partition", "result");
        contentElem.innerHTML = `
          <div class="result__wrapper-title"><h3 class="result__title subtitle">Result from</h3><span class="result__date subtitle"></span></div>
          <div class="result__statistic">
            <h3 class="result__subtitle subtitle">Text</h3>
            <div class="result__testing-text-wrapper">
              <p class="result__testing-text"></p>
            </div>
            <h3 class="result__subtitle subtitle result__trigger-container"><button data-id="1" class="button button_in-text result__trigger">Speed</button> and <button data-id="2" class="button button_in-text result__trigger">accuracy</button> statistic</h3>
            <div class="result__canvases-container">
              <div data-id="1" class="result__canvas-container result__content">
                <canvas class="result__statistic-canvas" id="speed"></canvas>
              </div>
              <div data-id="2" class="result__canvas-container result__content">
                <canvas class="result__statistic-canvas" id="accuracy"></canvas>
              </div>
            </div>
          </div>
        `;
        resultsElem.append(contentElem);

        const testTextElem = contentElem.querySelector(".result__testing-text");
        const testDateElem = contentElem.querySelector(".result__date");
        const testingData = data[timestamp];

        testDateElem.textContent = new Date(+timestamp).toLocaleString();
        testTextElem.innerHTML = testingData.text;
        makeChart(testingData.statistic, "#speed", "speed", "speed", contentElem);
        makeChart(testingData.statistic, "#accuracy", "accuracy", "accuracy", contentElem);


        try {
          const matchTriggerContent: ITabMatchTriggerContent = {
            containers: {
              common: contentElem,
              trigger: ".result__trigger-container",
              content: ".result__canvases-container"
            },
            mainSelectors: {
              trigger: ".result__trigger",
              content: ".result__content"
            },
            activeClass: {
              trigger: "button_in-text_active",
              content: "result__active-canvas"
            },
            matchesDatasetId: [
              {
                trigger: 1,
                content: 1
              },
              {
                trigger: 2,
                content: 2
              }
            ],
            defaultActiveDatasetId: 1
          }
          initTab(matchTriggerContent);
        }
        catch (error) {
          console.log(error)
        }
      }
    }
    catch (error) {
      const plug = resultsElem.querySelector(".plug")
      plug.classList.remove("hidden");
    }

    // friends
    try {
      throw new Error("There is no data");
    }
    catch (error) {
      const plug = friendsElem.querySelector(".plug")
      plug.classList.remove("hidden");
    }
  } catch(error) {
    window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"];
  }
}

export default profile;