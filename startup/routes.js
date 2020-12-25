const express = require("express");

const colaborators = require("../routes/colaborators");
const characters = require("../routes/characters");
const comic = require("../routes/comic");

module.exports = function (app) {
  app.use(express.json());
  app.use("/marvel/colaborators", colaborators);
  app.use("/marvel/characters", characters);
  app.use("/marvel/comics", comic);
};
