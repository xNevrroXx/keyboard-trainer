import makeChart from "../modules/makeChart";
// types
import {IAdditionalDataStatisticSpeed} from "../types";
import {statisticDataGet} from "../services";

async function results() {
  try {
    const response: IAdditionalDataStatisticSpeed[] | Error = await statisticDataGet("last");

    makeChart(response as IAdditionalDataStatisticSpeed[]);
  }
  catch (error) {
    console.log("error in result: ", error);
  }
}

export default results;