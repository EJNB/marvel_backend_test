const mongoose = require("mongoose");
const Joi = require("joi");

// Create character Schema.
const characterSchema = new mongoose.Schema({
  character: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  comics: [String],
  last_sync: {
    type: Date,
    default: new Date(),
  },
});

const Character = mongoose.model("Character", characterSchema);

function validateCharacter(character) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
  });

  return schema.validate(character);
}

exports.Character = Character;
exports.validate = validateCharacter;
