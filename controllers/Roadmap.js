const Roadmap = require("../models/Roadmap")
const User = require("../models/User")
const RoadmapController = {
  createRoadmap: async (req, res) => {
    try {
      const { name, description, courses, tasks, user } = req.body
      const newRoadmap = new Roadmap({
        name,
        description,
        courses,
        tasks,
        user,
      })
      await newRoadmap.save()
      await User.findByIdAndUpdate(user, {
        $push: { roadmaps: newRoadmap._id },
      })
      return res
        .status(201)
        .json({ message: "Roadmap created successfully", roadmap: newRoadmap })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  getRoadmap: async (req, res) => {
    const id = req.params.id
    try {
      const roadmap = await Roadmap.findById(id)
        .populate("courses") 
        .populate("tasks") 

      if (!roadmap) {
        return res.status(404).json({ message: "Roadmap not found" })
      }
      return res.status(200).json(roadmap)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  getAllRoadmap: async (req, res) => {
    try {
      const roadmaps = await Roadmap.find()
        .populate("courses")
        .populate("tasks")
        .populate("user")
      if (roadmaps.length === 0) {
        return res.status(404).json({ message: "No Roadmaps found" })
      }
      return res.status(200).json(roadmaps)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },

  deleteRoadmap: async (req, res) => {
    const id = req.params.id
    try {
      const deletedroadmap = await Roadmap.findByIdAndDelete(id)
      if (!deletedroadmap) {
        return res.status(404).json({ message: "Roadmap not found" })
      }
      return res
        .status(200)
        .json({ message: `roadmap ${deletedroadmap.name} deleted sucessfully` })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: "Server error" })
    }
  },
}
module.exports = RoadmapController
