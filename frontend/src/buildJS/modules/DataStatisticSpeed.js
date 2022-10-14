class DataStatisticSpeed {
    constructor(data = []) {
        this.data = [];
        this.data = data;
    }
    ;
    addData(additionalStatisticSpeedData) {
        for (const dataStatisticSpeedValue of this.data) {
            if (dataStatisticSpeedValue.char === additionalStatisticSpeedData.char) {
                dataStatisticSpeedValue.speedArr.push(additionalStatisticSpeedData.speed);
                return;
            }
        }
        this.data.push({
            char: additionalStatisticSpeedData.char,
            speedArr: [additionalStatisticSpeedData.speed]
        });
        return;
    }
    ;
    withAvgSpeed() {
        const resultData = [];
        this.data.forEach((value) => {
            const speed = value.speedArr;
            const sum = speed.reduce((sum, currentValue) => sum + currentValue, 0);
            let averageSpeed = Math.round(sum / speed.length);
            resultData.push({
                char: value.char,
                speed: averageSpeed
            });
        });
        return resultData;
    }
}
export default DataStatisticSpeed;
