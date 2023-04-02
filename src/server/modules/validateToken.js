// third-party modules
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// own modules
import setCookies from "./setCookies.js";

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

const validateTokenAccessBind = validateToken.bind(null, process.env.ACCESS_TOKEN_SECRET, "accessToken");
const validateTokenRefreshBind = validateToken.bind(null, process.env.REFRESH_TOKEN_SECRET, "refreshToken");

export default validateToken;
export {validateTokenAccessBind, validateTokenRefreshBind};