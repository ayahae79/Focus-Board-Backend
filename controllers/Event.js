const Event = require('../models/Event')
const Task = require('../models/Task')
const User = require('../models/User') // Ensure User is imported if used

const EventController = {
  // Create a new event
  createEvent: async (req, res) => {
    try {
      const { name, start, end, task } = req.body
      if (!name || !start || !end || !task) {
        return res.status(400).send('All fields are required')
      }

      const newEvent = new Event({
        name,
        start,
        end,
        task,
        user: req.user._id // Ensure user is authenticated and available
      })

      await newEvent.save()

      // Update the corresponding task with the new event ID
      await Task.findByIdAndUpdate(task, {
        $push: { event: newEvent._id }
      })
      await User.findByIdAndUpdate(user, {
        $push: { event: newEvent._id },
      })

      return res
        .status(201)
        .json({ message: 'Event created successfully', event: newEvent })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  // Get a specific event by ID
  getEvent: async (req, res) => {
    const id = req.params.id
    try {
      const event = await Event.findById(id)
      if (!event) {
        return res.status(404).json({ message: 'Event not found' })
      }
      return res.status(200).json(event)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  // Get all events
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find()
      if (events.length === 0) {
        return res.status(404).json({ message: 'No Events found' })
      }
      return res.status(200).json(events)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  // Update an existing event by ID
  updateEvent: async (req, res) => {
    const id = req.params.id
    try {
      const { name, start, end, task } = req.body
      if (!name || !start || !end || !task) {
        return res.status(400).send('All fields are required')
      }

      const updatedEvent = await Event.findByIdAndUpdate(
        id,
        { name, start, end, task },
        { new: true } // Return the updated document
      )

      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' })
      }

      return res
        .status(200)
        .json({ message: 'Event updated successfully', event: updatedEvent })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  },

  // Delete an event by ID
  deleteEvent: async (req, res) => {
    const id = req.params.id
    try {
      const deletedEvent = await Event.findByIdAndDelete(id)
      if (!deletedEvent) {
        return res.status(404).json({ message: 'Event not found' })
      }
      return res
        .status(200)
        .json({ message: `Event ${deletedEvent.name} deleted successfully` })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = EventController
