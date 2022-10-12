// third-party modules
const express = require("express");
const cors = require("cors");
const path = require("path");
// own modules
const routes = require("./routes");

const app = express();
const PORT = 5001;

app.use(cors());
const pathData = path.join(__dirname, "..", "dist");
const matchPages = [
  ["/login", path.join(pathData, "views", "login.html")],
  ["/editprofile", path.join(pathData, "views", "editprofile.html")],
  ["/profile", path.join(pathData, "views", "profile.html")],
  ["/recovery", path.join(pathData, "views", "recovery.html")],
  ["/results", path.join(pathData, "views", "results.html")],
  ["/testing", path.join(pathData, "views", "testing.html")],
  // CSS and JS
  ["/getcss", path.join(pathData, "styles", "style.css")],
  ["/getjs", path.join(pathData, "scripts", "bundle.js")],

  // 404 Page - Necessarily the last root
  ["*", path.join(pathData, "index.html")],
]
routes(app, matchPages);

app.listen(PORT, () => {
  console.log(`Frontend server is by url: http://locahost:${PORT}`);
})