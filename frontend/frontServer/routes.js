const path = require("path");

function routes(app, matchPages) {
  matchPages.forEach(match => {
    app.get(match[0], (request, response) => {
      response.sendFile(match[1]);
    })
  })
}

module.exports = routes;