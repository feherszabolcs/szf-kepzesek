const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const trainings = require('./routes/trainings')

const app = express()
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
)

mongoose.set('strictQuery', true)
const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})
database.once('connected', () => {
  console.log(`Database Connected ${database.host}`)
})

app.use(morgan('dev'))

app.use('/api/trainings', trainings)
