const express = require('express')
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const trainings = require('./routes/trainings')
const errorHandler = require('./middleware/error.js')
const courses = require('./routes/courses')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()
app.use(express.json())

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

app.use(fileUpload())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/trainings', trainings)
app.use('/api/courses', courses)

app.use(errorHandler)

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
)
