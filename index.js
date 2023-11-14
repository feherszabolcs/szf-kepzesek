const express = require('express')
require('dotenv').config()
const trainings = require('./routes/trainings')
const morgan = require('morgan')

const app = express()
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
)

app.use(morgan('dev'))

app.use('/api/trainings', trainings)
