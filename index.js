const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const links = require('./routes/links')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/links', links)

mongoose.connect('mongodb://localhost/linkSpaceDB')
    .then(() => console.log("connection is successfull to mongoDB"))
    .catch(() => console.error("could not connect to mongodb"))

const port = process.env.PORT || 3050
app.listen(port, () => console.log(`listening on port ${port}`))