const express = require('express')
const { connectDB } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 4000

const app = express()

connectDB()

app.use(cors())

app.use(express.static('public'))

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))

app.listen(port, () => console.log(`Server on port ${port}`))
