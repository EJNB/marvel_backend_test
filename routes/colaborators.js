const express = require("express");
const router = express.Router();
const { Colaborator } = require("../models/colaborators");
const { ColaboratorComic } = require("../models/colaboratorComic");
const {
  marvelApiUrl,
  marvelAccesKey,
  hash,
} = require("../config/default.json");
const _ = require("lodash");
const { default: axios } = require("axios");
const { getComic } = require("../utils/utils");

// Update colaborators by comic.
router.put("/", async (req, res) => {
  const comic = await getComic(req.body.nickname);

  if (!comic)
    return res.send("No tenemos resultados para el comic seleccionado");

  // Configure url and send request.
  const url = `${marvelApiUrl}?ts=1&apikey=${marvelAccesKey}&hash=${hash}&title=${comic.name}&limit=100`;
  const { data } = await axios.get(url);

  for (let element of data.data.results) {
    for (let creator of element.creators.items) {
      switch (creator.role) {
        case "editor":
        case "writer":
        case "colorist":
          // Buscas si existe el editor.
          let colaborator = await exitsColaborator(creator.name);
          if (colaborator) continue;
          // sino existe lo insertas.
          colaborator = new Colaborator({
            name: creator.name,
            role: creator.role,
          });
          await colaborator.save();

          // Salvar en la colection de muchos a muchos.
          let colaboratorComic = new ColaboratorComic({
            colaborator: colaborator._id,
            comic: comic._id,
          });
          await colaboratorComic.save();
        default:
          continue;
      }
    }
  }
  res.send(comic);
});

// Service A All Colaborators
router.get("/:nickname", async (req, res) => {
  const comic = await getComic(req.params.nickname);

  if (!comic) return res.send("No tenemos resultado0s para el comic ingresado");
  const colaborators = await getColaboratorByComic(comic._id);

  if (_.isEmpty(colaborators))
    return res.send("No tenemos resultados para el comic ingresado");

  const result = getResult(colaborators);
  res.send(result);
});

async function exitsColaborator(name) {
  const colaborators = await Colaborator.find({ name });
  return colaborators.some((c) => c.name == name);
}

async function getColaboratorByComic(comic) {
  return await ColaboratorComic.find({ comic })
    .populate("colaborator")
    .select("-__v")
    .sort("name");
}

function getResult(colaborators) {
  let result = {};
  result["last_async"] = colaborators[0].colaborator.last_sync;
  for (let role of ["editor", "writer", "colorist"]) {
    result[role + "s"] = colaborators
      .filter(({ colaborator }) => colaborator.role == role)
      .map(({ colaborator }) => colaborator.name);
  }
  return result;
}

module.exports = router;
