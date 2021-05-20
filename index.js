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

const allLinks = [
    {
        "id": 1,
        "name": "Google",
        "link": "https://www.google.com"
    },
    {
        "id": 2,
        "name": "Facebook",
        "link": "https://www.facebook.com"
    },
    {
        "id": 3,
        "name": "Instagram",
        "link": "https://www.instagram.com"
    },
    {
        "id": 4,
        "name": "Udemy",
        "link": "https://www.udemy.com"
    },
    {
        "id": 5,
        "name": "Gmail",
        "link": "https://www.gmail.com"
    },
    {
        "id": 6,
        "name": "Google",
        "link": "https://www.google.com"
    },
    {
        "id": 7,
        "name": "Facebook",
        "link": "https://www.facebook.com"
    },
    {
        "id": 8,
        "name": "Instagram",
        "link": "https://www.instagram.com"
    },
    {
        "id": 9,
        "name": "Udemy",
        "link": "https://www.udemy.com"
    },
    {
        "id": 10,
        "name": "Gmail",
        "link": "https://www.gmail.com"
    }
]

function validateLink(link) {
    const urlPattern = "((http|https)://)?(www.)?"
        + "[a-zA-Z0-9@:%._\+~#?&//=]{2,256}\.[a-z]"
        + "{2,6}([-a-zA-Z0-9@:%._\+~#?&//=]*)",
        schema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            link: Joi.string().regex(new RegExp(urlPattern)).required()
        })
    return schema.validate(link)
}

app.get('/api/links', (req, res) => {
    res.send(allLinks)
})

app.post('/api/links', (req, res) => {
    const { error } = validateLink(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const {name, link} = req.body

    // assining id to a link is currently buggy.
    // it is addressed when integrated with db automatically as db assigns the ids
    const newLink = {
        id: allLinks.length + 1,
        name: name,
        link: link
    }

    allLinks.unshift(newLink)
    res.send(newLink)
})

app.put('/api/links/:id', (req, res) => {
    const updateLink = allLinks.find(link => link.id === parseInt(req.params.id))
    if(!updateLink) return res.status(404).send('The link with given ID was not found')

    const { error } = validateLink(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    updateLink.name = req.body.name
    updateLink.link = req.body.link
    res.send(updateLink);
})

app.delete('/api/links/:id', (req, res) => {
    const deleteLink = allLinks.find(link => link.id === parseInt(req.params.id))
    if(!deleteLink) return res.status(404).send('The link with given ID was not found')

    const index = allLinks.indexOf(deleteLink)
    allLinks.splice(index, 1)

    res.send(deleteLink)
})

app.get('/api/links/:id', (req, res) => {
    const getLink = allLinks.find(link => link.id === parseInt(req.params.id))
    if(!getLink) return res.status(404).send('The link with given ID was not found')

    res.send(getLink)
})

const port = process.env.PORT || 3050
app.listen(port, () => console.log(`listening on port ${port}`))