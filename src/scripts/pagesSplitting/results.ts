import makeChart from "../modules/makeChart";
// types
import {IAdditionalDataStatisticSpeed, IDataStatistic} from "../types";
import {statisticDataGet} from "../services";

async function results() {
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
}

export default results;