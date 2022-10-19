import makeChart from "../modules/makeChart";
// types
import {IDataStatistic} from "../types";
import {authenticate, statisticDataGet} from "../services";
// general data
import {MATCH_PAGES_URL} from "../generalData";

async function results() {
  try {
    const authenticateResponse = await authenticate();

    try {
      const response: IDataStatistic | Error = await statisticDataGet("last");
      const data = response as IDataStatistic;

      for (const timestamp in data) {
        makeChart(data[timestamp], "#myChart");
      }
    }
    catch (error) {
      console.log("error in result: ", error);
    }
  } catch {
    window.location.href = MATCH_PAGES_URL["login"].pathname + MATCH_PAGES_URL["login"].possibleHashValue["sign-in"]
  }
}

export default results;