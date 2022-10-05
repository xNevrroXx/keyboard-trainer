const jwt = require("jsonwebtoken");

function validateToken(request, response, next) {
  const authHeader = request.headers["authorization"];
  const token = authHeader.split(" ")[1];

  if (token == null) {
    response.sendStatus(400);
  }

  jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      console.log(user);
      response.status(403).send("Token invalid")
    }
    else {
      console.log(user);
      request.user = user;
      next();
    }
  })
}

module.exports = validateToken;