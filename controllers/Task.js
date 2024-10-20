const Task = require('../models/Task')
const User = require('../models/User')
const Event = require('../models/Event')
const Course = require('../models/Course')

const taskController = {
  createTask: async (req, res) => {
    const { name, description, deadline, status, course, user, event } =
      req.body

    const task = new Task({
      name,
      description,
      deadline,
      status,
      course,
      user,
      event
    })

    try {
      await task.save()
      await User.findByIdAndUpdate(user, { $push: { tasks: task._id } })
      await Event.findByIdAndUpdate(event, { $push: { task: task._id } })
      await Course.findByIdAndUpdate(course, { $push: { tasks: task._id } })

      res.status(201).send({ message: 'Task created successfully', task })
    } catch (err) {
      res
        .status(400)
        .send({ message: 'Error creating task', error: err.message })
    }
  },

  getTasks: async (req, res) => {
    try {
      const tasks = await Task.find()
      res.send(tasks)
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Error retrieving tasks', error: err.message })
    }
  },

  getTaskById: async (req, res) => {
    const id = req.params.id
    try {
      const task = await Task.findById(id)
      if (!task) {
        return res.status(404).send({ message: 'Task not found' })
      }
      res.json(task)
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Error retrieving task', error: err.message })
    }
  },

  updateTask: async (req, res) => {
    const id = req.params.id
    const { name, description, deadline, status, course, user, event } =
      req.body
    try {
      const task = await Task.findByIdAndUpdate(
        id,
        { name, description, deadline, status, course, user, event },
        { new: true }
      )
      if (!task) {
        return res.status(404).send({ message: 'Task not found' })
      }
      res.send({ message: 'Task updated successfully', task })
    } catch (err) {
      res
        .status(400)
        .send({ message: 'Error updating task', error: err.message })
    }
  },

  deleteTask: async (req, res) => {
    const id = req.params.id
    try {
      const deletedTask = await Task.findByIdAndDelete(id)
      if (!deletedTask) {
        return res.status(404).send({ message: 'Task not found' })
      }
      res.send({ message: 'Task deleted successfully' })
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Error deleting task', error: err.message })
    }
  }
}

module.exports = taskController
