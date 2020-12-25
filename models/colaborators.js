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

colaboratorSchema.statics.findByName = function (name) {
  const colaborators = Colaborator.find({ name });
  console.log(colaborators);
  return colaborators.some((c) => c.name == name);
  // {
  //   // console.log(_.isArray(res) && _.isEmpty(res));
  //   const result = res ? res : false;
  //   console.log(result);
  //   return res ? res : false;
  // }
};

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
