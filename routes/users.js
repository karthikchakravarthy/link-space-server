const express = require('express')
const bcrypt = require('bcrypt')
const _ = require('lodash')
const {User, validate} = require('../models/user')
const router = express.Router()

router.post('/', async (req, res) => {
   const {error} = validate(req.body)
   if(error) return res.status(400).send(error.details[0].message)

   let {name, email, password} = req.body

   let user = await User.findOne({email})
   if(user) return res.status(400).send('user aleady exists')

   const salt = await bcrypt.genSalt(10)
   password = await bcrypt.hash(password, salt)

   user = new User({
       name,
       email,
       password
   })
   await user.save()
   const token = user.generateAuthToken()
  // _.pick(user, ['_id', 'name', 'email'])
res.send(_.extend(_.pick(user, ['_id', 'name', 'email']),{'token':token}))
//res.header('x-auth-token', token)
})

module.exports = router