const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  lectureSchedule: [
    {
      date: { type: Date, required: true }, // Date of the lecture
      startTime: { type: String, required: true }, // Starting time
      endTime: { type: String, required: true }, // Ending time
    },
  ],
  studentsEnrolled: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Students taking this course
  deletionStatus: {
    type: String,
    enum: ['approved', 'pending'],
    default: 'approved', // Default to approved for admin deletions
  },
})

module.exports = mongoose.model("Course", courseSchema)
