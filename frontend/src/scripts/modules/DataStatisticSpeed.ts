import {IAdditionalDataStatisticSpeed, IDataStatisticSpeed} from "../types";

class DataStatisticSpeed {
  data: IDataStatisticSpeed[] = [];

  constructor(data: IDataStatisticSpeed[] = []) {
    this.data = data;
  };

  addData(additionalStatisticSpeedData: IAdditionalDataStatisticSpeed) {
    for (const dataStatisticSpeedValue of this.data) {
      if (dataStatisticSpeedValue.char === additionalStatisticSpeedData.char) {
        dataStatisticSpeedValue.speed.push(additionalStatisticSpeedData.speed);

        return;
      }
    }

    this.data.push({
      char: additionalStatisticSpeedData.char,
      speed: [additionalStatisticSpeedData.speed]
    })

    return;
  }
}

export default DataStatisticSpeed;