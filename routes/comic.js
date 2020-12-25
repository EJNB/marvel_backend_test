const _ = require("lodash");
const { Comic, validate } = require("../models/comics");
const { Colaborator } = require("../models/colaborators");
const express = require("express");
const router = express.Router();

// Get all comics.
router.get("/", async (req, res) => {
  const comics = await Comic.find().select("-__v").sort("name");
  comics.map((comic) => {
    comic["colaborators"] = Colaborator.find({ comic: comic.id });
    return comic;
  });

  res.send(comics);
});

// Add comic.
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let comic = await Comic.findOne({ nickname: req.body.nickname });
  if (comic) return res.status(400).send("Comic already registered.");

  comic = new Comic(_.pick(req.body, ["name", "nickname"]));
  await comic.save();

  res.send(_.pick(comic, ["_id", "name", "nickname"]));
});

// Delete a comic.
router.delete("/:id", async (req, res) => {
  const comic = await Comic.findByIdAndRemove(req.params.id);

  if (!comic)
    return res.status(404).send("The comic with the given ID was not found.");

  res.send(comic);
});

// todo: aplicar el middleware de autenticacion
// aplicar los middlewares para joi id y unhandle rejections

module.exports = router;
