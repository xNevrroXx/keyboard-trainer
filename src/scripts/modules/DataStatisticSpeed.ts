import {IAdditionalDataStatistic, IDataStatisticSpeed} from "../types";

class DataStatisticSpeed {
  readonly statisticData: IDataStatisticSpeed[] = [];
  private text: string = null;

  constructor(data: IDataStatisticSpeed[] = []) {
    this.statisticData = data;
  };

  setText(text: string) {
    this.text = text;
  }

  addStatisticData(additionalStatisticSpeedData: IAdditionalDataStatistic) {
    for (const statisticCharSlice of this.statisticData) {
      if (statisticCharSlice.char === additionalStatisticSpeedData.char) {
        statisticCharSlice.speedArr.push(additionalStatisticSpeedData.speed);

        return;
      }
    }

    this.statisticData.push({
      char: additionalStatisticSpeedData.char,
      speedArr: [additionalStatisticSpeedData.speed],
      accuracyArr: [additionalStatisticSpeedData.accuracy]
    })

    return;
  };

  getAvgStatistic() {
    const statisticData: IAdditionalDataStatistic[] = [];

    this.statisticData.forEach((value: IDataStatisticSpeed) => {
      const speed = value.speedArr;
      const accuracy = value.accuracyArr;

      const sumSpeed = speed.reduce((sum, currentValue) => sum + currentValue, 0);
      let averageSpeed = Math.round(sumSpeed / speed.length);

      const sumAccuracy = speed.reduce((sum, currentValue) => sum + currentValue, 0);
      let averageAccuracy = Math.round(sumAccuracy / speed.length);

      statisticData.push({
        char: value.char,
        speed: averageSpeed,
        accuracy: averageAccuracy
      })
    })

    return {
      text: this.text,
      statisticData: statisticData
    };
  }
}

export default DataStatisticSpeed;