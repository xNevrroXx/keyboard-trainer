const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config();

const ENV = {
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,

    EMAIL_ADDRESS: process.env.EMAIL_ADDRESS,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,

    PORT: process.env.PORT
}


const log = "Time: " + (new Date()).toString() + ",\n" +
    `host: ${ENV.DB_HOST},\n` +
    `user: ${ENV.DB_USER},\n` +
    `database: ${ENV.DB_DATABASE},\n` +
    `password: ${ENV.DB_PASSWORD},\n` +
    `port: ${ENV.DB_PORT}\n\n\n\n`;
fs.writeFileSync(path.join(__dirname, "loggerENV.txt"), log);
module.exports = ENV;