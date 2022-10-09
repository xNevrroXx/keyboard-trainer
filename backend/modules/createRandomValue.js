function createRandomValue(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return {
    value: Math.floor(Math.random() * (max - min + 1)) + min,
    endTime: new Date().getTime() + 1000*5
  };
}

module.exports = createRandomValue;