// models/Course.js
const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  lectureDays: {
    type: [String], // Array of days (e.g., ['Monday', 'Wednesday'])
    required: true
  },
  startTime: String,
  endTime: String,
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
})

const Course = mongoose.model('Course', CourseSchema)
module.exports = Course
