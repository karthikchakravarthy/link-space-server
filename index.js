const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Joi = require('joi')

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost/linkSpaceDB')
    .then(() => console.log("connection is successfull to mongoDB"))
    .catch(() => console.error("could not connect to mongodb"))

const linkSchema = new mongoose.Schema({
    name: String,
    link: String
})

const linkModel = mongoose.model('Link', linkSchema)

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

app.get('/api/links', (req, res) => {
    async function getAllLinks(params) {
        try {
            const allLinks = await linkModel
                .find()
            res.send(allLinks)
        }
        catch (error) {
            res.status(400).send(error.message)
        }
    }
    getAllLinks()
})

app.post('/api/links', (req, res) => {
    const { error } = validateLink(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const {name, link} = req.body

    const newLinkDB = new linkModel({
        name: name,
        link: link
    })
    async function createNewLink() {
        try {
            const result = await newLinkDB.save()
            res.send(result);
        }
        catch(error){
            res.status(400).send(error.message)
        }
    }
    createNewLink()
})

app.put('/api/links/:id', (req, res) => {
    const id = req.params.id
    const { error } = validateLink(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    async function UpdateLink() {
        try {
            const result = await linkModel.findByIdAndUpdate(id, {
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
    }
    UpdateLink()
})

app.delete('/api/links/:id', (req, res) => {
    const id = req.params.id
    async function DeleteLink() {
        try {
            const result = await linkModel.findByIdAndRemove(id)
            if(result) res.send(result);
            else res.status(404).send('The link with given ID was not found')
        }
        catch(error){
            res.status(400).send(error.message)
        }
        
    }
    DeleteLink()
})

app.get('/api/links/:id', (req, res) => {
    const id = req.params.id
    async function getLink() {
        try {
            const result = await linkModel.findById(id)
            if(result) res.send(result);
            else res.status(404).send('The link with given ID was not found')
        }
        catch(error){
            res.status(400).send(error.message)
        }
    }
    getLink()
})

const port = process.env.PORT || 3050
app.listen(port, () => console.log(`listening on port ${port}`))