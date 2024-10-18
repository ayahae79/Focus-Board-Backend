const mongoose = require("mongoose")

const roadmapSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

module.exports = mongoose.model("Roadmap", roadmapSchema)
