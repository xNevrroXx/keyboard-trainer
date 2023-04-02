import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import mysql from "mysql"
import cookieParser from "cookie-parser"
import * as path from 'path';
import {fileURLToPath} from 'url';
import handlebars from "express-handlebars";
// owm modules
import routes from "./routes/routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const handlebarsEngine = handlebars.engine;
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