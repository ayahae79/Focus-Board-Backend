const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  deadline: { type: Date, required: true },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Each task is linked to a course
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Assigned to a specific student
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" }, // Linked to an event for calendar tracking
})

module.exports = mongoose.model("Task", taskSchema)
