import makeChart from "../modules/makeChart";
import {IChartStatistic} from "../types";

function results() {
  const chartStatistic: IChartStatistic[] = [];

  makeChart(chartStatistic);
}

export default results;