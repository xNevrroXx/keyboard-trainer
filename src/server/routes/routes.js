// own modules
const {validateTokenAccessBind, validateTokenRefreshBind} = require("../modules/validateToken");
const {searchData} = require("../modules/database");
// sub-routes
const recoverRoutes = require("./subroutes/recover");
const statistic = require("./subroutes/statistic");
const htmlPages = require("./subroutes/htmlPages");
const authentication = require("./subroutes/authentication");


async function routes(app, db) {
  app.post("/posts",
    (request, response, next) => validateTokenAccessBind(request, response, next),
    async (request, response) =>
    {
    const user = request.user;
    // todo send some info about user

      console.log("user from auth: ", user);
    try {
      const findingResult = await searchData(db, "user", user.id, "id");
      const userData = findingResult.data[0];

      response.json({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        image: user.image
      })
    } catch (error) {
      response.status(400).json({
        message: "user doesn't exist"
      });
    }
  })

  authentication(app, db);
  recoverRoutes(app, db);
  statistic(app, db);
  htmlPages(app, db);
}

module.exports = routes;