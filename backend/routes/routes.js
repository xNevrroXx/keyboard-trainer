const argon2 = require("argon2");
const mysql = require("mysql");
// own modules
const generateAccessToken = require("../modules/generateAccessToken");
const generateRefreshToken = require("../modules/generateRefreshToken");
const validateToken = require("../modules/validateToken.js");

let refreshTokens = [];

async function routes(app, db) {
  app.get("/", (request, response) => {
    response.json({message: "hi"})
  })
  app.post("/register", async (request, response) => {
    const name = request.body.name;
    const hashedPassword = await argon2.hash(request.body.password);
    const email = request.body.email;

    db.getConnection(async (error, connection) => {
      if (error) {
        throw new Error(error);
      }

      const searchStrSQL = "SELECT * FROM user WHERE name = ?";
      const searchQuerySQL = mysql.format(searchStrSQL, [name]);

      const insertStrSQL = "INSERT INTO user(name, password, email) VALUES (?, ?, ?)";
      const insertQuerySQL = mysql.format(insertStrSQL, [name, hashedPassword, email]);

      await connection.query(searchQuerySQL, async (error, result) => {
        if (error) {
          throw error;
        }

        if (result.length !== 0) {
          connection.release();
          console.log(result);
          response.status(409).send("User already exists");
        } else {
          await connection.query(insertQuerySQL, (error, result) => {
            connection.release();

            if (error) {
              throw error;
            }

            console.log(`User created. ID: ${result.insertId}`);
            response.status(201).send("User created");
          })
        }
      })
    })
  })

  app.post("/login", (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    db.getConnection((error, connection) => {
      const searchStrSQL = "SELECT * FROM user WHERE email = ?";
      const searchQuerySQL = mysql.format(searchStrSQL, [email]);

      connection.query(searchQuerySQL, async (error, result) => {
        if (error) {
          throw error;
        }

        if (result.length === 0) {
          connection.release();
          response.status(404).send("User does not exist");
        } else {
          if (await argon2.verify(result[0].password, password)) {
            const accessToken = generateAccessToken({
              name: result[0].name
            });
            const refreshToken = generateRefreshToken({
              name: result[0].name
            });
            refreshTokens.push(refreshToken);

            console.log(accessToken);
            response.json({
              accessToken: accessToken,
              refreshToken: refreshToken
            });
          } else {
            response.send("password incorrect");
          }
        }
      });
    })
  })

  app.post("/refreshToken", (request, response) => {
    if (!refreshTokens.includes(request.body.token)) {
      response.status(400).send("Refresh Token Invalid");
    }

    refreshTokens = refreshTokens.filter(token => token !== request.body.token);

    const accessToken = generateAccessToken({
      name: request.body.name
    });
    const refreshToken = generateRefreshToken({
      name: request.body.name
    });
    refreshTokens.push(refreshToken);

    response.json({
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  })

  app.delete("/logout", (request, response) => {
    refreshTokens = refreshTokens.filter(token => token !== request.body.token);
    response.status(204).send("Logged out!");
  })

  app.post("/posts", validateToken, (request, response) => {
    console.log("token validate");
    console.log(request.user)
    response.json({
      message: "successfully accessed post"
    });
  })
}

module.exports = routes;