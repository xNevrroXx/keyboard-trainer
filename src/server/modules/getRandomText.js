async function getRandomText(numberSequences = 2) {
    const response = await fetch(`https://fish-text.ru/get?number=${numberSequences}`);

    const data = await response.json();
    return data.text;
}

module.exports = {getRandomText};