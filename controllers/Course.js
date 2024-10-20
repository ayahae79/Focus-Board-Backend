const Course = require("../models/Course")
const Task = require("../models/Task")
const User = require("../models/User")
const Event = require("../models/Event")

const courseController = {
  // Create a new course
  createCourse: async (req, res) => {

    const { title, description,lecturedate,startTime,endTime,studentsEnrolled  } = req.body;
    //const { title, description, lectureSchedule, studentsEnrolled } = req.body


    const course = new Course({
      title,
      description,
      lecturedate,
      startTime,
      endTime,
      studentsEnrolled, // This can be an array of ObjectId references to User
    });
    
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
    const id = req.params.id;
    const {title, description,lecturedate,startTime,endTime,studentsEnrolled } = req.body;
    //const id = req.params.id
    //const { title, description, lectureSchedule, studentsEnrolled } = req.body


    try {
      const course = await Course.findByIdAndUpdate(
        id,
        { title, description,lecturedate,startTime,endTime,studentsEnrolled },
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
}

module.exports = courseController
