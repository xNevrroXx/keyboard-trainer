const {searchData, createTemporaryCode, changeData} = require("../modules/database");
const createRandomValue = require("../modules/createRandomValue");
const sendMail = require("../modules/nodemailer");
const argon2 = require("argon2");

const recoverRoutes = (app, db) => {
  app.post("/recover/getcode", async (request, response) => {
    const email = request.body.email;

    try {
      const findingResult = await searchData(db, "user", email, "email");
      const temporaryValue = createRandomValue(1e5, 1e6-1);

      try {
        await createTemporaryCode(db, "temporary_code", findingResult.data.id, findingResult.data.email, temporaryValue.value, temporaryValue.endTime);
        await sendMail(email, temporaryValue.value);

        response.status(202).json({
          message: "email has been send"
        });
      } catch (error) {
        response.status(502).json({
          message: "Server internal error. Please try again later"
        })
      }
    } catch (error) {
      response.status(400).json({
        message: "user doesn't exist"
      });
    }
  })

  app.post("/recover/verifycode", async (request, response) => {
    const email = request.body.email;
    const code = +request.body.code;

    try {
      const findingResult = await searchData(db, "temporary_code", email, "user_email");

      if(findingResult.data.value === code) {
        response.status(200).json({
          message: "success"
        });
      }
      else {
        response.status(401).json({
          message: "code incorrect"
        });
      }
    } catch (error) {
      response.status(400).json({
        message: "user doesn't exist"
      });
    }
  })

  app.post("/recover/changepassword", async (request, response) => {
    const email = request.body.email;
    const code = +request.body.code;
    const password = await argon2.hash(request.body.password);

    try {
      const findingResultUser = await searchData(db, "user", email, "email");

      try {
        const findingResultCode = await searchData(db, "temporary_code", code, "value");

        if(findingResultCode.data.value === code) {
          try {
            const updatingResult = await changeData(db, "user", email, "email", password, "password");
            console.log("data has been updated!");
            response.status(200).json({
              message: "data has been updated!"
            })
          } catch (error) {
            console.log("error update code: ", error);
            response.sendStatus(500).json({
              message: "unknown error"
            });
          }
        }
        else {
          response.status(401).json({
            message: "code incorrect"
          });
        }
      }
      catch (error) {
        response.status(400).json({
          message: "code doesn't exist"
        });
      }
    } catch (error) {
      response.status(400).json({
        message: "user doesn't exist"
      });
    }
  })
}

module.exports = recoverRoutes;