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
        "id": "1",
        "name": "Google",
        "link": "https://www.google.com"
    },
    {
        "id": "2",
        "name": "Facebook",
        "link": "https://www.facebook.com"
    },
    {
        "id": "3",
        "name": "Instagram",
        "link": "https://www.instagram.com"
    },
    {
        "id": "4",
        "name": "Udemy",
        "link": "https://www.udemy.com"
    },
    {
        "id": "5",
        "name": "Gmail",
        "link": "https://www.gmail.com"
    },
    {
        "id": "6",
        "name": "Google",
        "link": "https://www.google.com"
    },
    {
        "id": "7",
        "name": "Facebook",
        "link": "https://www.facebook.com"
    },
    {
        "id": "8",
        "name": "Instagram",
        "link": "https://www.instagram.com"
    },
    {
        "id": "9",
        "name": "Udemy",
        "link": "https://www.udemy.com"
    },
    {
        "id": "10",
        "name": "Gmail",
        "link": "https://www.gmail.com"
    }
]

app.get('/api/links', (req, res) => {
    res.send(allLinks)
})

app.post('/api/links', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        link: Joi.string().min(4).required()
    })
    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const link = {
        id: allLinks.length + 1,
        name: req.body.name,
        link: req.body.link
    }

    allLinks.unshift(link)
    res.send(link)
})
const port = process.env.PORT || 3050
app.listen(port, () => console.log(`listening on port ${port}`))

