// routes/Course.js
const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course')

// Existing routes
router.post('/courses', courseController.createCourse)
router.get('/courses', courseController.getCourse)
router.get('/courses/:id', courseController.getCourseById)
router.put('/courses/:id', courseController.updateCourse)
router.delete('/courses/:id', courseController.deleteCourse)

// New routes for drop requests
router.post('/drop', courseController.requestDrop)
router.patch('/drop/:id', courseController.handleDropRequest)

module.exports = router
