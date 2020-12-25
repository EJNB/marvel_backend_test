const express = require("express");

const colaborators = require("../routes/colaborators");
const characters = require("../routes/characters");
const users = require("../routes/users");
const auth = require("../routes/auth");
const comic = require("../routes/comic");
const report = require("../routes/colaborators");

module.exports = function (app) {
  app.use(express.json());
  app.use("/marvel/users", users);
  app.use("/marvel/auth", auth);
  app.use("/marvel/colaborators", colaborators);
  app.use("/marvel/characters", characters);
  app.use("/marvel/comics", comic);
};
