const express  = require("express");
const path  = require('path');
const fs = require("fs");
const cors  = require("cors");
const mysql  = require("mysql");
const cookieParser  = require("cookie-parser");
const handlebars  = require("express-handlebars");
// owm modules
const {DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, PORT = 5000} = require("./mainData");
const routes  = require("./routes/routes.js");

const handlebarsEngine = handlebars.engine;

const db = mysql.createPool({
  connectionLimit: 100,
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  port: DB_PORT
})

  db.getConnection((error, connection) => {
    if (error) {
      const log = "Database is not connected\ntime: " + (new Date()).toString() + ",\n" +
          `host: ${DB_HOST},\n` +
          `user: ${DB_USER},\n` +
          `database: ${DB_DATABASE},\n` +
          `password: ${DB_PASSWORD},\n` +
          `port: ${DB_PORT}\n\n\n\n`;
      fs.writeFileSync(path.join(__dirname, "loggerDB.txt"), log);
      throw new Error(error);
    }

    console.log("DB connected successful: " + connection.threadId);
  })

const app = express();

app.engine("hbs", handlebarsEngine({
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: path.join(__dirname, "views", "partials"),
  defaultLayout: "main",
  extname: "hbs"
}));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"))

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

routes(app, db);

app.listen(PORT, () => {
  console.log(`App is listening on url: http://localhost:${PORT}`);
})