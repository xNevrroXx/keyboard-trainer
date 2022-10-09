const jwt = require("jsonwebtoken");
const {changeToken} = require("./database");

function validateToken(request, response, next, db, secretToken) {
  const authHeader = request.headers["authorization"] || request.headers["refreshtoken"];
  const token = authHeader.split(" ")[1];

  if (token == null) {
    response.sendStatus(400);
  }

  jwt.verify(token, secretToken, (error, user) => {
    if (error) {
      // if (request.body.id && secretToken === process.env.ACCESS_TOKEN_SECRET) {
      //   changeToken(db, "access_token", request.body.id, " ");
      // }
      // else if(request.body.id) {
      //   changeToken(db, "refresh_token", request.body.id, " ");
      // }
      response.status(403).send("Token invalid");
    }
    else {
      request.user = user;
      next();
    }
  })
}

module.exports = validateToken;