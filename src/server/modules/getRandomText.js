const fetch = require("node-fetch");

async function getRandomText(numberSequences = 2) {
    const response = await fetch(`https://api.api-ninjas.com/v1/loremipsum`, {
        headers: {
            'X-Api-Key': 'Wu3RPXRr41apE4FFnXAl9w==iloLIsliV47rK6tO'
        }
    });

    const data = await response.json();
    return data.text;
}

module.exports = {getRandomText};