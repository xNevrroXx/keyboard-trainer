// own modules
const {validateTokenAccessBind, validateTokenRefreshBind} = require("../modules/validateToken");
const {searchData} = require("../modules/database");
// sub-routes
const recoverRoutes = require("./subroutes/recover");
const statistic = require("./subroutes/statistic");
const htmlPages = require("./subroutes/htmlPages");
const authentication = require("./subroutes/authentication");


async function routes(app, db) {
  authentication(app, db);
  recoverRoutes(app, db);
  statistic(app, db);
  htmlPages(app, db);
}

module.exports = routes;