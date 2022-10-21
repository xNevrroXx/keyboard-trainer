import makeChart from "../modules/makeChart";
// types
import {IResponseStatistic, IDataStatistic} from "../types";
import {authenticate, statisticDataGet} from "../services";
// general statisticData
import {MATCH_PAGES_URL} from "../generalData";

async function results() {
  try {
    const authenticateResponse = await authenticate();
    const plugNoResultsElem = document.querySelector(".plug");
    const resultsElem = document.querySelector(".results");

    try {
      const response: IResponseStatistic | Error = await statisticDataGet("last");
      const data = response as IResponseStatistic;

      for (const timestamp of Object.keys(data) as (keyof typeof data)[]) {
        const testTextElem = document.querySelector(".results__testing-text");
        const testDateElem = document.querySelector(".results__date");
        const testingData = data[timestamp];

        testDateElem.textContent = new Date(+timestamp).toLocaleString();
        testTextElem.textContent = testingData.text;
        makeChart(testingData.statistic, "#myChart", "speed");
      }
    }
    catch (error) {
      plugNoResultsElem.classList.remove("hidden");
      resultsElem.classList.add("results__hidden");
    }
  } catch {
    window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"]
  }
}

export default results;