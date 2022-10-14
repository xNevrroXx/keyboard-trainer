const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

function validateToken(secretToken, header, request, response, next, db) {
  console.log(request.body)
  const authHeader = request.headers[header];
  const token = authHeader.split(" ")[1];


  if (token == null) {
    response.sendStatus(400);
  }

  jwt.verify(token, secretToken, (error, user) => {
    if (error) {
      console.log("error")
      response.status(403).send("Token invalid");
    }
    else {
      console.log("start action")
      request.user = user;
      next();
    }
  })
}

const validateTokenAccessBind = validateToken.bind(null, process.env.ACCESS_TOKEN_SECRET, "authorization");
const validateTokenRefreshBind = validateToken.bind(null, process.env.REFRESH_TOKEN_SECRET, "refreshtoken");

module.exports = validateToken;
module.exports = {validateTokenAccessBind, validateTokenRefreshBind};