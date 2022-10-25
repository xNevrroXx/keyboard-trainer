// third-party modules
const sendMail = require("../../../modules/nodemailer");
const argon2 = require("argon2");
// own modules
const {searchData, createTemporaryCode, changeData, customQuery} = require("../../../modules/database");
const createRandomValue = require("../../../modules/createRandomValue");
const setCookie = require("../../../modules/setCookies");

function recoverRoutes (app, db) {
  app.post("/api/recover/getcode", async (request, response) => {
    const email = request.body.email;

    try {
      const findingResult = await searchData(db, "user", email, "email");
      const user = findingResult.data[0];
      const temporaryValue = createRandomValue(1e5, 1e6-1);

      try {
        await createTemporaryCode(db, "temporary_code", user.id, user.email, temporaryValue.value, temporaryValue.endTime);
        await sendMail(email, temporaryValue.value);

        setCookie(response,[
          {
            "email": email,
            modifyOptions: {
              httpOnly: true,
              maxAge: 1000*60*5
            }
          }
        ])
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

  app.post("/api/recover/verifycode", async (request, response) => {
    const email = request.cookies.email;
    const code = +request.body.code;

    try {
      const findingResult = await searchData(db, "temporary_code", email, "user_email");
      const findingCode = findingResult.data[0];

      if(findingCode.value === code && +findingCode["end_time"] > new Date().getTime()) {
        setCookie(response,[
          {
            "code": code,
            modifyOptions: {
              httpOnly: true,
              maxAge: 1000*60*5
            }
          }
        ])

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

  app.post("/api/recover/changepassword", async (request, response) => {
    const email = request.cookies.email;
    const code = +request.cookies.code;
    const password = await argon2.hash(request.body.password);

    try {
      const findingResultUser = await searchData(db, "user", email, "email");
      const user = findingResultUser.data[0];

      try {
        const findingResultCode = await searchData(db, "temporary_code", code, "value");

        if(findingResultCode.data[0].value === code) {
          try {
            const updatingResult = await changeData(db, "user", email, "email", password, "password");
            response.status(200).json({
              message: "statisticData has been updated!"
            })
          } catch (error) {
            response.sendStatus(500).json({
              message: "unknown error"
            });
          }
          try {
            const deleteStrSQL = `DELETE FROM temporary_code WHERE user_id = ${user.id}`;
            const deleteQuerySQL = await customQuery(db, deleteStrSQL);
          } catch (error) {
            console.log(error);
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