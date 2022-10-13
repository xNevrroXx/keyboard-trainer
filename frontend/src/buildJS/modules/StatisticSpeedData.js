class DataStatisticSpeed {
    constructor(data = []) {
        this.data = [];
        this.data = data;
    }
    ;
    addData(additionalStatisticSpeedData) {
        for (const dataStatisticSpeedValue of this.data) {
            if (dataStatisticSpeedValue.char === additionalStatisticSpeedData.char) {
                dataStatisticSpeedValue.speed.push(additionalStatisticSpeedData.speed);
                return;
            }
        }
        this.data.push({
            char: additionalStatisticSpeedData.char,
            speed: [additionalStatisticSpeedData.speed]
        });
        return;
    }
}
export {};
