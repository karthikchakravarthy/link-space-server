const mongoose = require("mongoose");
const Joi = require("joi");

const Link = mongoose.model(
  "Link",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    link: {
      type: String,
      required: true,
    },
    user: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 50,
        },
      }),
      required: true,
    },
  })
);

function validateLink(link) {
  const urlPattern =
      "((http|https)://)?(www.)?" +
      "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]" +
      "{2,6}([-a-zA-Z0-9@:%._\\+~#?&//=]*)",
    schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      link: Joi.string().pattern(new RegExp(urlPattern)).required(),
    });
  return schema.validate(link);
}

exports.Link = Link;
exports.validate = validateLink;
