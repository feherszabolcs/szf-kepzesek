const express = require('express')
const {
  getTraining,
  getTrainings,
  createTraining,
  updateTraining,
  deleteTraining,
  trainingPhotoUpload,
} = require('../controllers/trainings')

const courseRouter = require('./courses')
const router = express.Router()
router.use('/:trainingId/courses', courseRouter)
router.route('/:id/photo').put(trainingPhotoUpload)

router.route('/').get(getTrainings).post(createTraining)
router.route('/:id').get(getTraining).put(updateTraining).delete(deleteTraining)
module.exports = router
