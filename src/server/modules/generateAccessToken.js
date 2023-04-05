const jwt = require("jsonwebtoken");
// own modules
const {ACCESS_TOKEN_SECRET} = require("../mainData");

function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: "15m"});
}

module.exports = generateAccessToken;