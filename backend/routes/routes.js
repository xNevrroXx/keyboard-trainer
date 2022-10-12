const argon2 = require("argon2");
const mysql = require("mysql");
// own modules
const {changeToken, searchData, createUser, changeData} = require("../modules/database");
const generateAccessToken = require("../modules/generateAccessToken");
const generateRefreshToken = require("../modules/generateRefreshToken");
const validateToken = require("../modules/validateToken");
const sendMail = require("../modules/nodemailer");
const createTemporaryCode = require("../modules/createRandomValue");
const recoverRoutes = require("./recover");

let refreshTokenList = [];

async function routes(app, db) {
  app.get("/users", (request, response) => {
    db.getConnection(async (error, connection) => {
      const searchQuerySQL = mysql.format("SELECT * FROM user;");

      connection.query(searchQuerySQL, (error, result) => {
        connection.release();

        if (error) {
          throw error;
        }

        response.json({
          users: result
        })
      })
    })
  })
  app.get("/access_tokens", (request, response) => {
    db.getConnection(async (error, connection) => {
      const searchQuerySQL = mysql.format("SELECT * FROM access_token;");

      connection.query(searchQuerySQL, (error, result) => {
        connection.release();

        if (error) {
          throw error;
        }

        response.json({
          access_tokens: result
        })
      })
    })
  })
  app.get("/refresh_tokens", (request, response) => {
    db.getConnection(async (error, connection) => {
      const searchQuerySQL = mysql.format("SELECT * FROM refresh_token;");

      connection.query(searchQuerySQL, (error, result) => {
        connection.release();

        if (error) {
          throw error;
        }

        response.json({
          refresh_tokens: result
        })
      })
    })
  })


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
        const user = findingResult.data;

        if (await argon2.verify(user.password, password)) {
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
            refreshTokenList.push(refreshToken);

            response.json({
              accessToken: accessToken,
              refreshToken: refreshToken
            });
          } catch (error) {
            response.status(500).json({
              message: "unknown error"
            });
          }
        } else {
          response.status(401).json({
            message: "password incorrect"
          });
        }
      }
    } catch (error) {
      response.status(400).json({
        message: "user doesn't exist"
      });
    }
  })

  app.post("/refreshtoken", async (request, response) => {
    const providedToken = request.headers["refreshtoken"].split(" ")[1];

    try {
      const currentRefreshToken = await searchData(db, "refresh_token", providedToken, "value");

      if (currentRefreshToken.data["value"] === providedToken) {
        const user = await searchData(db, "user", currentRefreshToken.data["user_id"], "id");

        const accessToken = generateAccessToken({
          id: user.data.id,
          name: user.data.name
        });
        const refreshToken = generateRefreshToken({
          id: user.data.id,
          name: user.data.name
        });
        await changeToken(db, "access_token", user.data.id, accessToken);
        await changeToken(db, "refresh_token", user.data.id, refreshToken);

        response.json({
          accessToken: accessToken,
          refreshToken: refreshToken
        });
      } else {
        response.status(400).json({
          message: "refresh token invalid"
        });
      }
    } catch { // token doesn't exist
      response.status(400).json({
        message: "refresh token invalid"
      });
    }
  })

  app.delete("/logout", (request, response) => {
    const accessToken = request.headers["accesstoken"].split(" ")[1];
    const refreshToken = request.headers["refreshtoken"].split(" ")[1];

    changeData(db, "access_token", accessToken, "value", "", "value");
    changeData(db, "refresh_token", refreshToken, "value", "", "value");
    // changeToken(db, "access_token", accessToken, "");
    // changeToken(db, "refresh_token", refreshToken, "");
    response.status(204).json({
      message: "logged out!"
    });
  })

  app.post("/posts", (req, res, next) => validateToken(req, res, next, db, process.env.ACCESS_TOKEN_SECRET), async (request, response) => {
    const user = request.user;
    // todo send some info about user

    try {
      const findingResult = await searchData(db, "user", user.id, "id");

      response.json({
        id: findingResult.data.id,
        name: findingResult.data.name
      })
    } catch (error) {
      response.status(400).json({
        message: "user doesn't exist"
      });
    }
  })

  recoverRoutes(app, db);
}

module.exports = routes;