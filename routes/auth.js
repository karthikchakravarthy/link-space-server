const express = require('express')
const Joi = require('joi')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User} = require('../models/user')
const router = express.Router()

router.post('/', async (req, res) => {
   const {error} = validate(req.body)
   if(error) return res.status(400).send(error.details[0].message)

   let {email, password} = req.body

   let user = await User.findOne({email})
   if(!user) return res.status(400).send('Invalid user or password')

   isValidPassword = await bcrypt.compare(password, user.password)
   if(!isValidPassword) return res.status(400).send('Invalid user or password')

   res.send(true)
})

function validate(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user)
}

module.exports = router