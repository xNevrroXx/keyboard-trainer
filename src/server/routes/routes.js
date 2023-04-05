// sub-routes
const recoverRoutes = require("./subroutes/api/recover");
const statistic = require("./subroutes/api/statistic");
const htmlPages = require("./subroutes/htmlPages/htmlPages");
const authentication = require("./subroutes/api/authentication");


async function routes(app, db) {
  authentication(app, db);
  recoverRoutes(app, db);
  statistic(app, db);
  htmlPages(app, db);
}

module.exports = routes;