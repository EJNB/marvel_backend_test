const express = require("express");
const router = express.Router();
const axios = require("axios");
const _ = require("lodash");

const {
  marvelApiUrl,
  marvelAccesKey,
  hash,
} = require("../config/default.json");
const { Character } = require("../models/characters");
const { getComic } = require("../utils/utils");

// Get Characters from marvel api
// Save into database
// Response with data
router.put("/", async (req, res) => {
  let urlCharacter = "";
  let url = `${marvelApiUrl}/{id}/characters?ts=1&apikey=${marvelAccesKey}&hash=${hash}`;
  // Buscar en el la base de datos el nickname
  const comic = await getComic(req.body.nickname);
  const urlComics = `${marvelApiUrl}?ts=1&apikey=${marvelAccesKey}&hash=${hash}&title=${comic.name}&limit=20`;
  const { data } = await axios.get(urlComics);
  for (let c of data.data.results) {
    urlCharacter = url.replace("{id}", c.id);
    const { data } = await axios.get(urlCharacter);
    for (let element of data.data.results) {
      const character = new Character({
        character: element.name,
      });
      character.comics = element.comics.items.map((c) => c.name);
      await character.save();
    }
  }
  res.send(data.data.results);
});
router.get("/:nickname", async (req, res) => {
  const comic = getComic(req.params.nickname);
  const characters = await Character.find({ name: comic.name }).select([
    "-__v",
    "-_id",
  ]);

  if (_.isEmpty(characters))
    return res.send("No tenemos resultados para el comic seleccionado");

  // map result
  const result = {};
  result["last_sync"] = characters[0].last_sync;
  result["characters"] = characters.map(({ character, comics }) => ({
    character,
    comics,
  }));
  res.send(result);
});

module.exports = router;
