import {createUserStatistic, searchDataCustom, createUserStatisticText} from "../../../modules/database.js";
import {validateTokenAccessBind} from "../../../modules/validateToken.js";


function statistic (app, db) {
  app.route("/api/statistic")
    .post((request, response, next) => validateTokenAccessBind(request, response, next),
    async (request, response) => {
      // start function
      const user = request.user;
      const userId = user.id;
      const statistic = request.body["statistic"];
      const statisticData = statistic["statistic"];
      const timestamp = new Date().getTime().toString();

      try {
        const responseErrors = {};

        try {
          await createUserStatisticText(db, "user_statistic_texts", timestamp, userId, statistic["text"]);
        }
        catch (error) {
          responseErrors["text"] = error;
        }

        for (let i = 0; i < statisticData.length; i++) {
          try {
            await createUserStatistic(
              db,
              "user_statistic_typing",
              timestamp,
              userId,
              statisticData[i]["char"],
              statisticData[i]["speed"],
              statisticData[i]["accuracy"],
              statisticData[i]["totalNumber"],
              statisticData[i]["countMistakes"]
            );
          }
          catch (error) {
            responseErrors["statisticData"] = error;
          }
        }

        if(responseErrors["text"] || responseErrors["statisticData"]) {
          console.log("responseErrors: ", responseErrors);
          response.json({
            errors: responseErrors,
            message: "statisticData has been posted"
          })
        }
        else {
          response.json({
            message: "statisticData has been posted"
          })
        }
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
        let findingResult = {
          texts: [],
          statistic: []
        };

        try {
          if (query.which === "all") {
            try {
              findingResult["texts"] = await searchDataCustom(db,
                `SELECT user_id, timestamp, value FROM user_statistic_texts
                              WHERE 
                                (user_id = ${userId})`
              );
            }
            catch (error) {
              console.log(error);
            }

            try {
              findingResult["statistic"] = await searchDataCustom(db,
                `SELECT timestamp, user_id, char_value as "char", speed_value as "speed", accuracy_value as "accuracy", total_number, count_mistakes FROM user_statistic_typing 
                              WHERE
                                (user_id = ${userId})
                              ORDER BY char_value`
              );
            }
            catch (error) {
              console.log(error);
            }
          }
          else if (query.which === "last") {
            try {
              findingResult["texts"] = await searchDataCustom(db,
                `SELECT user_id, timestamp, value FROM user_statistic_texts
                              WHERE 
                                (user_id = ${userId})
                              AND
                                (timestamp = (SELECT MAX(timestamp) FROM user_statistic_texts))`
              );
            }
            catch (error) {
              console.log(error);
            }

            try {
              findingResult["statistic"] = await searchDataCustom(db,
                `SELECT timestamp, user_id, char_value as "char", speed_value as "speed", accuracy_value as "accuracy", total_number, count_mistakes FROM user_statistic_typing 
                              WHERE
                                (user_id = ${userId})
                              AND
                                (timestamp = (SELECT MAX(timestamp) FROM user_statistic_typing))
                              ORDER BY char_value`
              );
            }
            catch (error) {
              console.log(error);
            }
          }
          else {
            response.status(400).json({
              message: "there is no search value"
            })
          }

          const data = {};
          const statisticData = findingResult.statistic;
          const texts = findingResult.texts;

          statisticData.data.forEach(charStatisticSlice => {
            const timestamp = charStatisticSlice["timestamp"];
            if(!data[timestamp]) {
              data[timestamp] = {
                text: "",
                statistic: []
              };
            }

            data[timestamp].statistic.push({
              char: charStatisticSlice["char"],
              speed: charStatisticSlice["speed"],
              accuracy: charStatisticSlice["accuracy"],
              totalNumber: charStatisticSlice["total_number"],
              countMistakes: charStatisticSlice["count_mistakes"]
            })
          })

          texts.data.forEach(textStatisticSlice => {
            if(!data[textStatisticSlice["timestamp"]]) {
              data[textStatisticSlice["timestamp"]] = {};
            }

            data[textStatisticSlice["timestamp"]]["text"] = textStatisticSlice["value"];
          })

          response.json({
            data: data
          })
        }
        catch (error) {
          response.status(404).json(error)
        }

      })
}

export default statistic;