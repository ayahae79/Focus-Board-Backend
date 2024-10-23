// controllers/course.js
const Course = require("../models/Course")
const DropRequest = require("../models/DropRequest") // Assuming you have this model
const Task = require("../models/Task")
const User = require("../models/User")
const Event = require("../models/Event")

const courseController = {
  // Create a new course
  createCourse: async (req, res) => {
    const {
      title,
      description,
      lectureDays, // Changed to lectureDays for multiple selections
      startTime,
      endTime,
      studentsEnrolled,
    } = req.body

    const course = new Course({
      title,
      description,
      lectureDays, // Updated field
      startTime,
      endTime,
      studentsEnrolled, // This can be an array of ObjectId references to User
    })

    try {
      await course.save()
      await User.updateMany(
        { _id: { $in: studentsEnrolled } },
        { $push: { courses: course._id } }
      )

      res.status(201).send({ message: "Course created successfully", course })
    } catch (err) {
      res
        .status(400)
        .send({ message: "Error creating course", error: err.message })
    }
  },

  getCourse: async (req, res) => {
    try {
      const courses = await Course.find()
      res.send(courses)
    } catch (err) {
      res
        .status(500)
        .send({ message: "Error retrieving Course", error: err.message })
    }
  },

  getCourseById: async (req, res) => {
    const id = req.params.id
    try {
      const course = await Course.findById(id)
      if (!course) {
        return res.status(404).send({ message: "Course not found" })
      }
      res.json(course)
    } catch (err) {
      res
        .status(500)
        .send({ message: "Error retrieving course", error: err.message })
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
      studentsEnrolled,
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
          studentsEnrolled,
        },
        { new: true, runValidators: true } // runValidators ensures schema validation
      )

      if (!course) {
        return res.status(404).send({ message: "Course not found" })
      }

      res.send({ message: "Course updated successfully", course })
    } catch (err) {
      res
        .status(400)
        .send({ message: "Error updating course", error: err.message })
    }
  },

  // Delete a course
  deleteCourse: async (req, res) => {
    const id = req.params.id

    try {
      const deletedCourse = await Course.findByIdAndDelete(id)
      if (!deletedCourse) {
        return res.status(404).send({ message: "Course not found" })
      }
      res.send({ message: "Course deleted successfully" })
    } catch (err) {
      res
        .status(500)
        .send({ message: "Error deleting course", error: err.message })
    }
  },

  createDropRequest: async (req, res) => {
    const { courseId, userId } = req.params

    try {
      // Check if the user is enrolled in the course
      const course = await Course.findById(courseId)
      if (!course) return res.status(404).send({ message: "Course not found" })

      if (!course.studentsEnrolled.includes(userId)) {
        return res
          .status(403)
          .send({ message: "You are not enrolled in this course" })
      }

      // Create the drop request
      const dropRequest = {
        userId,
        status: "pending",
        createdAt: new Date(),
      }

      // Add the drop request to the course
      course.dropRequests.push(dropRequest)
      await course.save()

      res
        .status(201)
        .send({ message: "Drop request sent successfully", dropRequest })
    } catch (err) {
      res
        .status(400)
        .send({ message: "Error sending drop request", error: err.message })
    }
  },
  getDropRequests: async (req, res) => {
    const { courseId } = req.params

    try {
      // Find the course by ID and populate the dropRequests with user data
      const course = await Course.findById(courseId).populate(
        "dropRequests.userId"
      )

      if (!course) {
        return res.status(404).send({ message: "Course not found" })
      }
      console.log(course.dropRequests)

      // Send back the drop requests associated with the course
      res.status(200).json(course.dropRequests)
    } catch (err) {
      res
        .status(400)
        .send({ message: "Error fetching drop requests", error: err.message })
    }
  },

  // Admin can update the status of a drop request
  approveDrop: async (req, res) => {
    const { courseId, requestId } = req.params

    try {
      // Update the drop request status to "Approved"
      const course = await Course.findById(courseId)
      const dropRequest = course.dropRequests.id(requestId)
      const userId = dropRequest.userId
      await User.findByIdAndUpdate(userId, { $pull: { courses: courseId } })
      await Course.findByIdAndUpdate(courseId, {
        $pull: { dropRequests: { _id: requestId } },
      })
      await Course.findByIdAndUpdate(courseId, {
        $pull: { studentsEnrolled: userId },
      })
      res.status(200).send({ message: "Drop request approved" })
    } catch (error) {
      console.error("Error approving drop request:", error)
      res.status(500).send({ message: "Error approving drop request", error })
    }
  },

  rejectDrop: async (req, res) => {
    const { courseId, requestId } = req.params

    try {
      await Course.findByIdAndUpdate(courseId, {
        $pull: { dropRequests: { _id: requestId } },
      })

      res.status(200).send({ message: "Drop request rejected" })
    } catch (error) {
      res.status(500).send({ message: "Error rejecting drop request", error })
    }
  },
}

module.exports = courseController
