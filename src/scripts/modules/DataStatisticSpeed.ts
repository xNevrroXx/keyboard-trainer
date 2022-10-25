import {IAdditionalDataStatistic, IAverageDataStatistic, IDataStatisticSpeed, IStatisticWithText} from "../types";

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
        if(additionalStatisticSpeedData.speed) {
          statisticCharSlice.speedArr.push(additionalStatisticSpeedData.speed);
        }
        statisticCharSlice.accuracyArr.push(additionalStatisticSpeedData.accuracy);

        return;
      }
    }

    if(additionalStatisticSpeedData.speed) {
      this.statisticData.push({
        char: additionalStatisticSpeedData.char,
        speedArr: [additionalStatisticSpeedData.speed],
        accuracyArr: [additionalStatisticSpeedData.accuracy]
      })
    }
    else {
      this.statisticData.push({
        char: additionalStatisticSpeedData.char,
        speedArr: [],
        accuracyArr: [additionalStatisticSpeedData.accuracy]
      })
    }

    return;
  };

  getAvgStatistic(): IStatisticWithText {
    const statisticData: IAverageDataStatistic[] = [];

    this.statisticData.forEach((value: IDataStatisticSpeed) => {
      const speed = value.speedArr;
      const accuracy = value.accuracyArr;
      const totalCharNumber = accuracy.length;
      const countMistakes = accuracy.reduce((sum, currentValue) => {
        if (currentValue === 0) {
          return sum + 1;
        }
        return sum;
      }, 0)

      const sumSpeed = speed.reduce((sum, currentValue) => sum + currentValue, 0);
      let averageSpeed = Math.round(sumSpeed / speed.length);

      const sumAccuracy = accuracy.reduce((sum, currentValue) => sum + currentValue, 0);
      let averageAccuracy = Math.round(sumAccuracy / accuracy.length);

      statisticData.push({
        char: value.char,
        speed: averageSpeed,
        accuracy: averageAccuracy,
        totalNumber: totalCharNumber,
        countMistakes: countMistakes
      })
    })

    return {
      text: this.text,
      statistic: statisticData
    };
  }
}

export default DataStatisticSpeed;