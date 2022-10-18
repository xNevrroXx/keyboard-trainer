const {createUserStatistic, searchData, searchDataCustom} = require("../../modules/database");
const {validateTokenAccessBind} = require("../../modules/validateToken");


function statistic (app, db) {
  app.route("/statistic/speed")
    .post((request, response, next) => validateTokenAccessBind(request, response, next, db),
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
    .get((request, response, next) => validateTokenAccessBind(request, response, next, db),
      async (request, response) => {
        // start function
        const user = request.user;
        const userId = user.id;
        const query = await request.query;

        try {
          let findingResult = null;
          if (query.which === "all") {
            findingResult = await searchDataCustom(db,
              `SELECT timestamp, user_id, char_value AS "char", speed_value FROM user_statistic_speed_typing ORDER BY "timestamp" DESC, "char" ASC`);
          }
          else if (query.which === "last") {
            findingResult = await searchDataCustom(db,
              `SELECT user_id, char_value AS "char", speed_value as "speed", timestamp FROM user_statistic_speed_typing 
                              WHERE timestamp = (SELECT MAX(timestamp) FROM user_statistic_speed_typing) ORDER BY char_value`
            );
          }
          else {
            response.status(400).json({
              message: "there is no search value"
            })
          }

          const data = {};
          findingResult.data.forEach(charStatistic => {
            if(!data[charStatistic["timestamp"]]) {
              data[charStatistic["timestamp"]] = [];
            }
            data[charStatistic["timestamp"]].push({
              char: charStatistic["char"],
              speed: charStatistic["speed"],
            })
          })

          response.json({
            data: data
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

module.exports = statistic;