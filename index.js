const express = require('express')
const cors = require('cors')
const Joi = require('joi')

const app = express()

app.use(cors())
app.use(express.json())

let allLinks = [
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
let uuid= allLinks.length;
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
        id: (parseInt(uuid) + 1).toString(),
        name: req.body.name,
        link: req.body.link
    }

    allLinks.unshift(link)
    res.send(link)
})
app.patch('/api/links', (req, res) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        name: Joi.string().min(3).max(30).required(),
        link: Joi.string().min(4).required()
    })
    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const updatedLink = {
        id: req.body.id,
        name: req.body.name,
        link: req.body.link
    }
    allLinks.forEach((linkData)=>{
          if(linkData.id===req.body.id){
            linkData.name = req.body.name;
            linkData.link = req.body.link;
          }
    })
    res.send(updatedLink);
})
app.delete('/api/links', (req, res) => {
    allLinks = allLinks.filter(link=> {
        return req.body.id != link.id
    })
    const deletedLink = {
        id: req.body.id,
        name: req.body.name,
        link: req.body.link
    }
    res.send(deletedLink)
})
const port = process.env.PORT || 3050
app.listen(port, () => console.log(`listening on port ${port}`))

