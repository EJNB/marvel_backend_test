const mongoose = require("mongoose");

let colaboratorComicSchema = new mongoose.Schema({
  colaborator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Colaborator",
    required: true,
  },
  comic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comic",
    required: true,
  },
});

// visitSchema.statics.forUser = function(userId, page) {
//   return Visit.paginate({'_user': userId}, {page: page, limit: 5, sort: {'_id': -1 }});
// };

function validate(colaborator) {
  const schema = Joi.object({
    comic: Joi.objectId().required(),
    colaborator: Joi.objectId().required(),
  });

  return schema.validate(colaborator);
}

const ColaboratorComic = mongoose.model(
  "ColaboratorComic",
  colaboratorComicSchema
);

exports.ColaboratorComic = ColaboratorComic;
exports.validate = validate;
