const mongoose = require('mongoose')
const Joi = require('joi')

const Link = mongoose.model('Link', new mongoose.Schema({
    name: String,
    link: String
}))

function validateLink(link) {
    const urlPattern = "((http|https)://)?(www.)?"
        + "[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]"
        + "{2,6}([-a-zA-Z0-9@:%._\\+~#?&//=]*)",
        schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            link: Joi.string().pattern(new RegExp(urlPattern)).required()
        })
    return schema.validate(link)
}

exports.Link = Link
exports.validate = validateLink