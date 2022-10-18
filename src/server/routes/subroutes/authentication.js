// third-party modules
const argon2 = require("argon2");
// own modules
const {changeToken, searchData, createUser, changeData} = require("../../modules/database");
const generateAccessToken = require("../../modules/generateAccessToken");
const generateRefreshToken = require("../../modules/generateRefreshToken");
const {validateTokenRefreshBind} = require("../../modules/validateToken");
const setCookies = require("../../modules/setCookies");

function authentication(app, db) {
  app.post("/register", async (request, response) => {
    const name = request.body.name;
    const hashedPassword = await argon2.hash(request.body.password);
    const email = request.body.email;

    try {
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

        response.status(201).json(
          {message: "user created"}
        )
      } catch (error) {
        response.status(400).json({
          message: error
        });
      }
    }
  })

  app.post("/login", async (request, response) => {
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
                {"isAuthorized": true}
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

  app.post("/refreshtoken",
    (request, response, next) => validateTokenRefreshBind(request, response, next),
    async (request, response) =>
    {
      const providedToken = request.cookies.refreshToken;

      console.log("start refresh");
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

          console.log("success refresh and response cookies");
          setCookies(response, [
            {"accessToken": accessToken},
            {"refreshToken": refreshToken},
            {"isAuthorized": true}
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
            {"isAuthorized": false}
          ])
          console.log("error in refresh pre-end")
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
            {"isAuthorized": false}
          ])
        console.log("error in refresh end", error)
        response.status(400).json({
          message: "refresh token invalid"
        });
      }
    })

  app.delete("/logout", async (request, response) => {
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
      {"isAuthorized": false}
    ])
    response.status(204).json({
      message: "logged out!"
    });
  })
}

module.exports = authentication;