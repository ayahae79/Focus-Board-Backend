const Event = require("../models/Event")
const Task = require("../models/Task")
const User = require("../models/User")

const EventController = {
  // Create a new event
  createEvent: async (req, res) => {
    console.log("Request body:", req.body)

    // Check if the user is authenticated

    try {
      const { name, start, end, task, user } = req.body
      if (!name || !start || !task) {
        return res
          .status(400)
          .json({ message: "Name, start date, and task are required" })
      }

      const newEvent = new Event({
        name,
        start,
        end,
        task,
        user, // Ensure user is authenticated and available
      })

      await newEvent.save()
      await Task.findByIdAndUpdate(task, {
        $push: { event: newEvent._id },
      })
      await User.findByIdAndUpdate(user, {
        $push: { event: newEvent._id },
      })
      return res
        .status(201)
        .json({ message: "Event created successfully", event: newEvent })
    } catch (err) {
      console.error("Error creating event:", err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  // Get a specific event by ID
  getEvent: async (req, res) => {
    const id = req.params.id
    try {
      const event = await Event.findById(id).populate("task")
      if (!event) {
        return res.status(404).json({ message: "Event not found" })
      }
      return res.status(200).json(event)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  // Get all events
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find().populate("task")
      return res.send(events)
    } catch (err) {
      res
        .status(500)
        .send({ message: "Error retrieving tasks", error: err.message })
    }
  },

  // Delete an event by ID
  deleteEvent: async (req, res) => {
    const id = req.params.id
    try {
      const deletedEvent = await Event.findByIdAndDelete(id)
      if (!deletedEvent) {
        return res.status(404).json({ message: "Event not found" })
      }
      return res
        .status(200)
        .json({ message: `Event ${deletedEvent.name} deleted successfully` })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },
}

module.exports = EventController
