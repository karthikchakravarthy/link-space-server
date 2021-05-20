const {Link, validate} = require('../models/link')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const allLinks = await Link
            .find()
        res.send(allLinks)
    }
    catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const {name, link} = req.body
    const newLinkDB = new Link({
        name: name,
        link: link
    })
    try {
        const result = await newLinkDB.save()
        res.send(result);
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    const { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    try {
        const result = await Link.findByIdAndUpdate(id, {
            $set: {
                name: req.body.name,
                link: req.body.link
            }
        },{new: true})
        if(result) res.send(result);
        else res.status(404).send('The link with given ID was not found')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await Link.findByIdAndRemove(id)
        if(result) res.send(result);
        else res.status(404).send('The link with given ID was not found')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await Link.findById(id)
        if(result) res.send(result);
        else res.status(404).send('The link with given ID was not found')
    }
    catch(error){
        res.status(400).send(error.message)
    }
})

module.exports = router