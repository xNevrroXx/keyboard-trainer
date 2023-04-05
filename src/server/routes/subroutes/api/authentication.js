// third-party modules
const argon2 =  require("argon2");
// own modules
const {changeToken, searchData, createUser, changeData, customQuery} =  require("../../../modules/database");
const generateAccessToken =  require("../../../modules/generateAccessToken");
const generateRefreshToken =  require("../../../modules/generateRefreshToken");
const {validateTokenRefreshBind, validateTokenAccessBind} =  require("../../../modules/validateToken");
const setCookies =  require("../../../modules/setCookies");
const {DB_HOST, DB_USER, DB_DATABASE, DB_PASSWORD, DB_PORT} = require("../../../mainData");
const fs = require("fs");
const path = require("path");

function authentication(app, db) {
  app.post("/api/authenticate",
    (request, response, next) => validateTokenAccessBind(request, response, next),
    async (request, response) =>
    {
    const user = request.user;

    try {
      const findingResult = await searchData(db, "user", user.id, "id");
      const userData = findingResult.data[0];

      response.json({
        message: "success authenticate"
      })
    } catch (error) {
      setCookies(response, [
        {
          "accessToken": "",
          modifyOptions: {
            maxAge: 0
          }
        },
        {
          "refreshToken": "",
          modifyOptions: {
            maxAge: 0
          }
        },
        {
          "isAuthenticate": false,
          modifyOptions: {
            maxAge: 0
          }
        }
      ])
      response.status(400).json({
        message: "user doesn't exist"
      });
    }
  })

  app.post("/api/register", async (request, response) => {
    const name = request.body.name;
    const hashedPassword = await argon2.hash(request.body.password);
    const email = request.body.email;


    const log = "Time: " + (new Date()).toString() + ",\n" +
        `start register before first try: ${name},\n` +
        `email: ${email},\n\n\n\n`;
    fs.writeFileSync(path.join(__dirname, "..", "..", "..", "loggerAuthenticate.txt"), log);
    try {
      const log = "Time: " + (new Date()).toString() + ",\n" +
          `start register first try - before search: ${name},\n` +
          `email: ${email},\n\n\n\n`;
      fs.writeFileSync(path.join(__dirname, "..", "..", "..", "loggerAuthenticate.txt"), log);
      const findingResult = await searchData(db, "user", email, "email");

      response.status(409).json({
        message: "User already exists"
      });
    } catch { // user does not exist yet
      try {
        const result = await createUser(db, {
          name: name,
          hashedPassword: hashedPassword,
          email: email
        })
        const log = "Time: " + (new Date()).toString() + ",\n" +
            `created!: ${name},\n` +
            `email: ${email},\n\n\n\n`;
        fs.writeFileSync(path.join(__dirname, "..", "..", "..", "loggerAuthenticate.txt"), log);
        response.status(201).json(
          {message: "user created"}
        )
      } catch (error) {
        const log = "Time: " + (new Date()).toString() + ",\n" +
            `NOT created!: ${name},\n` +
            `email: ${email},\n\n\n\n`;
        fs.writeFileSync(path.join(__dirname, "..", "..", "..", "loggerAuthenticate.txt"), log);
        response.status(400).json({
          message: error
        });
      }
    }
  })

  app.post("/api/login", async (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    try {
      const findingResult = await searchData(db, "user", email, "email");

      if (findingResult.status === 200) {
        const user = findingResult.data[0];

        if (await argon2.verify(user.password, password)) {
          try {
            const accessToken = generateAccessToken({
              id: user.id,
              name: user.name
            });
            const refreshToken = generateRefreshToken({
              id: user.id,
              name: user.name
            });

            try {
              await changeToken(db, "access_token", user.id, accessToken);
              await changeToken(db, "refresh_token", user.id, refreshToken);

              setCookies(response, [
                {"accessToken": accessToken},
                {"refreshToken": refreshToken},
                {"isAuthenticate": true}
              ]);

              response.status(200).json({
                message: "success log in"
              })
            } catch (error) {
              response.status(500).json({
                message: "unknown error"
              });
            }
          }
          catch (error) {
            response.status(500).json({
              error: error,
              message: "interval server error"
            })
          }
        } else {
          response.status(401).json({
            message: "password incorrect"
          });
        }
      }
    } catch (error) {
      response.status(404).json({
        message: error.message
      });
    }
  })

  app.post("/api/refreshtoken",
    (request, response, next) => validateTokenRefreshBind(request, response, next),
    async (request, response) =>
    {
      const providedToken = request.cookies.refreshToken;

      try {
        const currentRefreshToken = await searchData(db, "refresh_token", providedToken, "value");
        const tokenData = currentRefreshToken.data[0];

        if (tokenData["value"] === providedToken) {
          const findingResultUser = await searchData(db, "user", tokenData["user_id"], "id");
          const user = findingResultUser.data[0];

          const accessToken = generateAccessToken({
            id: user.id,
            name: user.name
          });
          const refreshToken = generateRefreshToken({
            id: user.id,
            name: user.name
          });
          await changeToken(db, "access_token", user.id, accessToken);
          await changeToken(db, "refresh_token", user.id, refreshToken);

          setCookies(response, [
            {"accessToken": accessToken},
            {"refreshToken": refreshToken},
            {"isAuthenticate": true}
          ])
          response.status(200).json({
            message: "refresh successfully"
          })
        } else {
          setCookies(response, [
            {
              "accessToken": "",
              modifyOptions: {
                maxAge: 0
              }
            },
            {
              "refreshToken": "",
              modifyOptions: {
                maxAge: 0
              }
            },
            {"isAuthenticate": false}
          ])
          response.status(400).json({
            message: "refresh token invalid"
          });
        }
      } catch(error) { // token doesn't exist
        setCookies(response, [
            {
              "accessToken": "",
              modifyOptions: {
                maxAge: 0
              }
            },
            {
              "refreshToken": "",
              modifyOptions: {
                maxAge: 0
              }
            },
            {"isAuthenticate": false}
          ])
        response.status(400).json({
          message: "refresh token invalid"
        });
      }
    })

  app.delete("/api/logout", async (request, response) => {
    const accessToken = request.cookies.accessToken;
    const refreshToken = request.cookies.refreshToken;

    await changeData(db, "access_token", accessToken, "value", "", "value");
    await changeData(db, "refresh_token", refreshToken, "value", "", "value");

    setCookies(response, [
      {
        "accessToken": "",
        modifyOptions: {maxAge: 0}
      },
      {
        "refreshToken": "",
        modifyOptions: {maxAge: 0}
      },
      {"isAuthenticate": false}
    ])
    response.status(204).json({
      message: "logged out!"
    });
  })

  app.put("/api/changepassword",
    (request, response, next) => validateTokenAccessBind(request, response, next),
    async (request, response) => {
    const user = request.user;
    const newHashedPassword = await argon2.hash(request.body["password"]);

    try {
      const findingUser = await searchData(db, "user", user.id, "id");

      try {
        const changePassword = await changeData(db, "user", user.id, "id", newHashedPassword, "password")

        response.json({
          message: "password has been successfully changed"
        })
      }
      catch (error) {
        console.log(error);
        response.status(500).json(error);
      }
    }
    catch (error) {
      console.log(error);
      response.status(error.status).json(error);
    }
  })

  app.put("/api/changemaindata",
    (request, response, next) => validateTokenAccessBind(request, response, next),
    async (request, response) => {
      const user = request.user;
      const userId = user.id;
      const newEmail = request.body.email;
      const newName = request.body.name;

      try {
        const findingUser = await searchData(db, "user", userId, "id");

        try {
          const changeEmail = await changeData(db, "user", userId, "id", newEmail, "email");
          const changeName = await changeData(db, "user", userId, "id", newName, "name");

          response.json({
            message: "Email and name has been changed"
          })
        }
        catch (error) {
          console.log(error);
          response.status(500).json({
            message: "unknown error"
          })
        }
      }
      catch(error) {
        console.log(error);
        response.status(404).json({
          message: "user doesn't exist"
        })
      }
    })

  app.delete("/api/resetprogress",
    (request, response, next) => validateTokenAccessBind(request, response, next),
    async (request, response) => {
      const user = request.user;
      const userId = user.id;

      try {
        const findingUser = await searchData(db, "user", userId, "id");

        try {
          await resetProgress(userId);

          response.json({
            message: "progress has been successfully reset"
          })
        }
        catch (error) {
          console.log(error);
          response.status(error.status).json(error);
        }
      }
      catch (error) {
        console.log(error);
        response.status(error.status).json(error);
      }
    })

  app.delete("/api/deleteaccount",
    (request, response, next) => validateTokenAccessBind(request, response, next),
    async (request, response) => {
      const user = request.user;

      try {
        await resetProgress(user.id);
        const resetAccessTokenStrSQL = `DELETE FROM access_token WHERE user_id = ${user.id}`;
        const resetAccessTokenQuerySQL = await customQuery(db, resetAccessTokenStrSQL);
        const resetRefreshTokenStrSQL = `DELETE FROM refresh_token WHERE user_id = ${user.id}`;
        const resetRefreshTokenQuerySQL = await customQuery(db, resetRefreshTokenStrSQL);

        setCookies(response, [
          {
            "accessToken": "",
            modifyOptions: {
              maxAge: 0
            }
          },
          {
            "refreshToken": "",
            modifyOptions: {
              maxAge: 0
            }
          },
          {
            "isAuthenticate": false,
            modifyOptions: {
              maxAge: 0
            }
          }
        ])
        const deleteUserStrSql = `DELETE FROM user WHERE id = ${user.id}`;
        const deleteUser = await customQuery(db, deleteUserStrSql);

        response.json({
          message: "account has been successfully deleted"
        })
      }
      catch (error) {
        console.log(error);
        response.status(error.status).json(error);
      }
    })


  async function resetProgress(userId) {
    try {
      const resetTypingStatStrSQL = `DELETE FROM user_statistic_typing WHERE user_id = ${userId}`;
      const resetProgress = await customQuery(db, resetTypingStatStrSQL);
    } catch (error) {
      console.log(error)
    }
    try {
      const resetTextsStrSQL = `DELETE FROM user_statistic_texts WHERE user_id = ${userId}`;
      const resetProgress = await customQuery(db, resetTextsStrSQL);
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = authentication;