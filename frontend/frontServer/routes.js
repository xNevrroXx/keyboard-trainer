const path = require("path");

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
]
const matchForOtherTypes = [
  ["/assets", path.join(pathData, "assets")]
]

function routes(app) {
  matchPages.forEach(match => {
    app.get(match[0], (request, response) => {
      response.sendFile(match[1]);
    })
  })

  matchForOtherTypes.forEach(match => {
    app.get(match[0], (request, response) => {
      const file = request.query.file;

      response.sendFile(path.join(match[1], file));
    })
  })

  // 404 Page - Necessarily the last root
  app.get("*", (request, response) => {
    response.status(404).sendFile(path.join(pathData, "index.html"));
  })
}

module.exports = routes;