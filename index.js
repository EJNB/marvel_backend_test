const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);
app.get("/", () => console.log("server running...."));
module.exports = server;
