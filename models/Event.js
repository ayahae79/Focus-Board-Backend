const mongoose = require("mongoose")

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  start: { type: Date, required: true }, // Event start date and time
  end: { type: Date }, // Optional event end date and time
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }, // Event related to a task
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Linked to the user who created the event
})

module.exports = mongoose.model("Event", eventSchema)
