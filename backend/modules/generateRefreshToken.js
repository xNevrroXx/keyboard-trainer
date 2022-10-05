const jwt = require("jsonwebtoken");

function generateRefreshToken(payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "20m"});
}

module.exports = generateRefreshToken;