const Training = require('../models/Training')
// @desc   Get all trainings
// @route  GET /api/trainings
// @access Public
exports.getTrainings = async (req, res, next) => {
  try {
    const trainings = await Training.find()
    res.status(200).json({
      success: true,
      count: trainings.length,
      data: trainings,
    })
  } catch (error) {
    res.status(400).json({ success: false })
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
    res.status(400).json({ success: false })
    console.log(error)
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
    res.status(400).json({ success: false })
  }
}
// @desc   Update training
// @route  PUT /api/trainings/:id
// @access Private
exports.updateTraining = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update training ${req.params.id}` })
}
// @desc   Delete training
// @route  DELETE /api/trainings/:id
// @access Private
exports.deleteTraining = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete training ${req.params.id}` })
}
