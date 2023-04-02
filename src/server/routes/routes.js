// sub-routes
import recoverRoutes from "./subroutes/api/recover.js";
import statistic from "./subroutes/api/statistic.js";
import htmlPages from "./subroutes/htmlPages/htmlPages.js";
import authentication from "./subroutes/api/authentication.js";


async function routes(app, db) {
  authentication(app, db);
  recoverRoutes(app, db);
  statistic(app, db);
  htmlPages(app, db);
}

export default routes;