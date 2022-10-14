const {createUserStatistic, searchData, searchDataCustom} = require("../../modules/database");
const {validateTokenAccessBind} = require("../../modules/validateToken");


function statisticRoutes (app, db) {
  app.post("/statistic/speed/post",
    (request, response, next) => validateTokenAccessBind(request, response, next, db),
    async (request, response) => {
    // start function
    const user = request.user;
    const userId = user.id;
    const statisticData = request.body["statistic-data"];
    const timestamp = new Date().getTime().toString();

    try {
      for (let i = 0; i < statisticData.length; i++) {
        await createUserStatistic(
          db,
          "user_statistic_speed_typing",
          timestamp,
          userId,
          statisticData[i]["char"],
          statisticData[i]["speed"]
        );
      }

      response.json({
        message: "data has been posted"
      })
    }
    catch (error) {
      response.status(400).json({
        error: error,
        message: error.message
      })
    }
  })

  app.post("/statistic/speed/get",
    (request, response, next) => validateTokenAccessBind(request, response, next, db),
    async (request, response) => {
    // start function
    const user = request.user;
    const userId = user.id;
    const query = await request.query;

    try {
      let findingResult = null;
      if (query.which === "all") {
        findingResult = await searchData(db, "user_statistic_speed_typing", userId, "user_id");
      }
      else if (query.which === "last") {
        findingResult = await searchDataCustom(db,
          `SELECT user_id, char_value, speed_value, timestamp FROM user_statistic_speed_typing WHERE timestamp = (SELECT MAX(timestamp) FROM user_statistic_speed_typing)`);
      }
      else {
        response.status(400).json({
          message: "there is no search value"
        })
      }

      response.json({
        data: findingResult.data
      })
    }
    catch (error) {
      response.status(400).json({
        error: error,
        message: "statistic speed data doesn't exist"
      })
    }
  })
}

module.exports = statisticRoutes;