const Course = require('../models/Course')
const DropRequest = require('../models/DropRequest') // Assuming you have this model
const User = require('../models/User')

const courseController = {
  // Create a new course
  createCourse: async (req, res) => {
    const {
      title,
      description,
      lectureDays, // Changed to lectureDays for multiple selections
      startTime,
      endTime,
      studentsEnrolled
    } = req.body

    const course = new Course({
      title,
      description,
      lectureDays, // Updated field
      startTime,
      endTime,
      studentsEnrolled // This can be an array of ObjectId references to User
    })

    try {
      await course.save()
      await User.updateMany(
        { _id: { $in: studentsEnrolled } },
        { $push: { courses: course._id } }
      )

      res.status(201).send({ message: 'Course created successfully', course })
    } catch (err) {
      res
        .status(400)
        .send({ message: 'Error creating course', error: err.message })
    }
  },

  getCourse: async (req, res) => {
    try {
      const courses = await Course.find()
      res.send(courses)
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Error retrieving courses', error: err.message })
    }
  },

  getCourseById: async (req, res) => {
    const id = req.params.id
    try {
      const course = await Course.findById(id)
      if (!course) {
        return res.status(404).send({ message: 'Course not found' })
      }
      res.json(course)
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Error retrieving course', error: err.message })
    }
  },

  // Update a course
  updateCourse: async (req, res) => {
    const id = req.params.id
    const {
      title,
      description,
      lectureDays, // Changed to lectureDays
      startTime,
      endTime,
      studentsEnrolled
    } = req.body

    try {
      const course = await Course.findByIdAndUpdate(
        id,
        {
          title,
          description,
          lectureDays, // Updated field
          startTime,
          endTime,
          studentsEnrolled
        },
        { new: true, runValidators: true } // runValidators ensures schema validation
      )

      if (!course) {
        return res.status(404).send({ message: 'Course not found' })
      }

      res.send({ message: 'Course updated successfully', course })
    } catch (err) {
      res
        .status(400)
        .send({ message: 'Error updating course', error: err.message })
    }
  },

  // Delete a course
  deleteCourse: async (req, res) => {
    const id = req.params.id

    try {
      const deletedCourse = await Course.findByIdAndDelete(id)
      if (!deletedCourse) {
        return res.status(404).send({ message: 'Course not found' })
      }
      res.send({ message: 'Course deleted successfully' })
    } catch (err) {
      res
        .status(500)
        .send({ message: 'Error deleting course', error: err.message })
    }
  },

  requestDrop: async (req, res) => {
    const { courseId, userId } = req.body
    try {
      const dropRequest = new DropRequest({
        user: userId,
        course: courseId,
        status: 'pending'
      })
      await dropRequest.save()
      res.status(201).json({ message: 'Drop request submitted successfully!' })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error' })
    }
  },

  handleDropRequest: async (req, res) => {
    const { status } = req.body // 'approved' or 'declined'
    try {
      const dropRequest = await DropRequest.findById(req.params.id)
      if (!dropRequest) {
        return res.status(404).json({ message: 'Drop request not found' })
      }

      // Handle approved drop request
      if (status === 'approved') {
        const course = await Course.findById(dropRequest.course)
        await course.dropStudent(dropRequest.user) // Call the method to drop student
      }

      dropRequest.status = status
      await dropRequest.save()
      res.status(200).json({ message: 'Drop request updated', dropRequest })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Server error' })
    }
  }
}

module.exports = courseController
