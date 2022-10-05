const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mysql = require("mysql");
// owm modules
const routes = require("./routes/routes");

dotenv.config();

const DB_DATABASE = process.env.DB_DATABASE,
  DB_USER = process.env.DB_USER,
  DB_PASSWORD = process.env.DB_PASSWORD,
  DB_HOST = process.env.DB_HOST,
  DB_PORT = process.env.DB_PORT;

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
    throw error;
  }

  console.log("DB connected successful: " + connection.threadId);
})

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

routes(app, db);

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
})