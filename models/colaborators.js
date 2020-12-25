const mongoose = require("mongoose");
const Joi = require("joi");
const _ = require("lodash");

// Create colaborator Schema.
const colaboratorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  role: {
    type: String,
    enum: ["colorist", "editor", "writer"],
  },
  last_sync: {
    type: Date,
    default: new Date(),
  },
});

const Colaborator = mongoose.model("Colaborator", colaboratorSchema);

function validateColaborator(colaborator) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    role: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(colaborator);
}

exports.Colaborator = Colaborator;
exports.validate = validateColaborator;
