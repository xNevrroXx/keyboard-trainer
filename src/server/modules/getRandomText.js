const fetch = require("node-fetch");
// own modules
const {FISH_TEXT_SECRET} = require("../mainData");

async function getRandomText(numberSequences = 2) {
    const response = await fetch(`https://api.api-ninjas.com/v1/loremipsum`, {
        headers: {
            'X-Api-Key': FISH_TEXT_SECRET
        }
    });

    const data = await response.json();
    return data.text;
}

module.exports = {getRandomText};