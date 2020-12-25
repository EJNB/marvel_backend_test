const { get } = require("lodash");

const { Comic } = require("../models/comics");

async function getComic(nickname) {
  return await Comic.findOne({ nickname });
}

exports.getComic = getComic;
