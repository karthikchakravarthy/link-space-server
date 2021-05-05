const express = require('express')
const cors = require('cors')
const Joi = require('joi')

const app = express()

app.use(cors())
app.use(express.json())


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
    const schema = {
        name: Joi.string().min(3).required(),
        url: Joi.string().min(4).required()
    }
    const {error} = Joi.validate(req.body, schema)
    if(error) return res.status(400).send(error.details[0].message)

    const link = {
        id: allLinks.length + 1,
        name: req.body.name,
        url: req.body.url
    }

    allLinks.push(link)
    res.send(link)
})
const port = process.env.PORT || 3050
app.listen(port, () => console.log(`listening on port ${port}`))

