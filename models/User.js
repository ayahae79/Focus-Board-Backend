const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordDigest: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  roadmaps: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  event: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
})

module.exports = mongoose.model("User", userSchema)
