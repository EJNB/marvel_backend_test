const mongoose = require("mongoose");
const Joi = require("joi");
const Colaborators = require("./colaborators");

// Create comic Schema.
const comicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
  nickname: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    unique: true,
  },
});

comicSchema.virtual("colaborators").get(function () {
  console.log("I am virtual");
  return Colaborators.find({ comic: this._id }).sort("_id");
});

const Comic = mongoose.model("Comic", comicSchema);

function validateComic(comic) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    nickname: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(comic);
}

exports.Comic = Comic;
exports.validate = validateComic;
