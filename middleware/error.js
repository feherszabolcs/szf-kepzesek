const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  console.log(err.stack)

  if (err.code == 11000) {
    err = new ErrorResponse(`The course with same id already exists!`, 400)
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error',
  })
}
module.exports = errorHandler
