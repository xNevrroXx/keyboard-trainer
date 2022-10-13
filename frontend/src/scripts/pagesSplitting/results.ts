import makeChart from "../modules/makeChart";
import {IDataStatisticSpeed} from "../types";

function results() {
  let chartData: IDataStatisticSpeed[] = [];
  // todo  get-query for chart data

  makeChart(chartData);
}

export default results;