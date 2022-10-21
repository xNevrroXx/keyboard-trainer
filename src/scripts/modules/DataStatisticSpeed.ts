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
      speedArr: [additionalStatisticSpeedData.speed]
    })

    return;
  };

  withAvgSpeed() {
    const statisticData: IAdditionalDataStatistic[] = [];

    this.statisticData.forEach((value: IDataStatisticSpeed) => {
      const speed = value.speedArr;

      const sum = speed.reduce((sum, currentValue) => sum + currentValue, 0);
      let averageSpeed = Math.round(sum / speed.length);

      statisticData.push({
        char: value.char,
        speed: averageSpeed
      })
    })

    return {
      text: this.text,
      statisticData: statisticData
    };
  }
}

export default DataStatisticSpeed;