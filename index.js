const winston = require("winston");
const express = require("express");
const app = express();

require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/config")();

const port = process.env.PORT || 3050;
app.listen(port, () => winston.info(`listening on port ${port}`));
