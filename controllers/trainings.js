const Training = require('../models/Training')
const ErrorResponse = require('../utils/errorResponse')
const path = require('path')

// @desc   Get all trainings
// @route  GET /api/trainings
// @access Public
exports.getTrainings = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 4
    const skip = (page - 1) * limit
    const endIndex = page * limit - 1

    let query
    let queryStr = JSON.stringify(req.query)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    )

    query = Training.find(JSON.parse(queryStr)).populate('courses')
    query = query.skip(skip).limit(limit)

    const pagination = {}
    if (skip > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      }
    }
    // if (endIndex > total) {
    //   pagination.next = {
    //     page: page + 1,
    //     limit: limit,
    //   }
    // }

    const trainings = await query
    res.status(200).json({
      success: true,
      count: trainings.length,
      data: trainings,
    })
  } catch (error) {
    next(error)
  }
}

// @desc   Get single training
// @route  GET /api/trainings/:id
// @access Public
exports.getTraining = async (req, res, next) => {
  try {
    const training = await Training.findById(req.params.id)
    if (!training) {
      return res.status(400).json({ success: false, msg: 'Failed to find' })
    }
    return res.status(200).json({ success: true, data: training })
  } catch (error) {
    next(new ErrorResponse(`The id ${req.params.id} is not valid`, 404))
  }
}
// @desc   Create new training
// @route  POST /api/trainings
// @access Private
exports.createTraining = async (req, res, next) => {
  try {
    const training = await Training.create(req.body)
    res.status(201).json({ success: true, data: training })
  } catch (error) {
    next(error)
  }
}
// @desc   Update training
// @route  PUT /api/trainings/:id
// @access Private
exports.updateTraining = async (req, res, next) => {
  try {
    const training = await Training.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!training)
      return res.status(400).json({ success: false, msg: 'Not found!' })
    res.status(200).json({ success: true, data: training })
  } catch (error) {
    next(new ErrorResponse(`The id ${req.params.id} is not valid`, 404))
  }
}
// @desc   Delete training
// @route  DELETE /api/trainings/:id
// @access Private
exports.deleteTraining = async (req, res, next) => {
  try {
    const training = await Training.findById(req.params.id)
    if (!training)
      return res.status(400).json({ succes: false, msg: 'Not found!' })
    console.log(training.id)
    training.remove()
    res.status(200).json({ success: true, data: {} })
  } catch (error) {
    next(new ErrorResponse(`The id ${req.params.id} is not valid`, 404))
  }
}
exports.trainingPhotoUpload = async (req, res, next) => {
  try {
    console.log(req.params.id)
    const training = await Training.findById(req.params.id)
    if (!training) {
      return res.status(400).json({ success: false, msg: 'Not found' })
    }
    if (!req.files) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please upload a file' })
    }
    const file = req.files.file
    if (!file.mimetype.startsWith('image')) {
      return res
        .status(400)
        .json({ success: false, msg: 'Please upload an image file' })
    }

    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return res.status(400).json({
        success: false,
        msg: `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
      })
    }

    file.name = `photo_${training.id}${path.parse(file.name).ext}`
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.error(err)
        return res
          .status(500)
          .json({ success: false, msg: `Problem with file upload` })
      }
    })
    await Training.findByIdAndUpdate(req.params.id, { photo: file.name })
    res.status(200).json({
      success: true,
      data: file.name,
    })

    console.log(file.name)

    console.log(req.files)
  } catch (error) {
    res.status(400).json({ success: false })
  }
}
