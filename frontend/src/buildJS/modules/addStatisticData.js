function addStatisticSpeedData(dataStatisticSpeed, additionalStatisticSpeedData) {
    for (const dataStatisticSpeedValue of dataStatisticSpeed) {
        if (dataStatisticSpeedValue.char === additionalStatisticSpeedData.char) {
            dataStatisticSpeedValue.speed.push(additionalStatisticSpeedData.speed);
            return dataStatisticSpeed;
        }
    }
    dataStatisticSpeed.push({
        char: additionalStatisticSpeedData.char,
        speed: [additionalStatisticSpeedData.speed]
    });
    return dataStatisticSpeed;
}
export { addStatisticSpeedData };
