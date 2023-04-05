// third-party modules
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// own modules
const setCookies = require("./setCookies");
const {ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET} = require("../mainData");

dotenv.config();

function validateToken(secretToken, nameField, request, response, next, isThrowOnError = true) {
  const token = request.cookies[nameField];
  if (token == null || token == undefined || token === "") {
    if(isThrowOnError) {
      response.sendStatus(400);
      return;
    }
    else {
      setCookies(response, [
        {
          "isAuthenticate": false,
          modifyOptions: {
            httpOnly: false
          }
        }
      ])
      request.isUser = false;

      next();
      return;
    }
  }

  jwt.verify(token, secretToken, (error, user) => {
    if (error) {
      setCookies(response, [
        {
          [nameField]: "",
          modifyOptions: {
            maxAge: 0
          }
        },
        {
          "isAuthenticate": false,
          modifyOptions: { 
            httpOnly: false
          }
        }
      ])

      if(isThrowOnError) {
        response.status(403).json({
          message: "token invalid"
        });
      }
      else {
        request.isUser = false;

        next();
      }
    }
    else {
      request.isUser = true;
      request.user = user;

      next();
    }
  })
}

const validateTokenAccessBind = validateToken.bind(null, ACCESS_TOKEN_SECRET, "accessToken");
const validateTokenRefreshBind = validateToken.bind(null, REFRESH_TOKEN_SECRET, "refreshToken");

module.exports = validateToken;
module.exports = {validateTokenAccessBind, validateTokenRefreshBind};