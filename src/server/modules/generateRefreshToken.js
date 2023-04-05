const jwt = require("jsonwebtoken");
// own modules
const {REFRESH_TOKEN_SECRET} = require("../mainData");

function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: "30m"});
}

module.exports = generateRefreshToken;