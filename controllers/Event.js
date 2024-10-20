const Event = require("../models/Event")
const Task = require("../models/Task")

const EventController = {
  createEvent: async (req, res) => {
    try {
      const { name, start, end, task } = req.body
      if (!name || !start || !end || !task) {
        return res.status(400).send("all feilds are required")
      }
      const newEvent = new Event({
        name,
        start,
        end,
        task,
        user: req.user._id,
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
      console.log(err)
    }
  },

  getEvent: async (req, res) => {
    const id = req.params.id
    try {
      const event = await Event.findById(id)
      if (!event) {
        return res.status(404).json({ message: "Event not found" })
      }
      return res.status(200).json(event)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find()
      if (events.length === 0) {
        return res.status(404).json({ message: "No Events found" })
      }
      return res.status(200).json(events)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

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
