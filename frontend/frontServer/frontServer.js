// third-party modules
const express = require("express");
const cors = require("cors");
const path = require("path");
// own modules
const routes = require("./routes");

const app = express();
const PORT = 5001;

app.use(cors());
routes(app);

app.listen(PORT, () => {
  console.log(`Frontend server is by url: http://locahost:${PORT}`);
})