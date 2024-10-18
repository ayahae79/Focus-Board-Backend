const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Courses user is enrolled in
  roadmaps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
})

module.exports = mongoose.model("User", userSchema)