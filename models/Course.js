// models/Course.js
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
 lectureDays: {
    type: [String], // Array of days (e.g., ['Monday', 'Wednesday'])
    required: true
  },
  startTime: { type: String, required: true }, // Starting time
  endTime: { type: String, required: true }, // Ending time
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Students taking this course
  dropRequests: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      status: {
        type: String,
        default: "pending",
      },
    },
  ],
})

const Course = mongoose.model('Course', CourseSchema)
module.exports = Course
