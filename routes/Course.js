
// routes/Course.js
const express = require("express")
const router = express.Router()
const courseController = require("../controllers/Course")

// Existing routes
router.post("/courses", courseController.createCourse)
router.get("/courses", courseController.getCourse)
router.get("/courses/:id", courseController.getCourseById)
router.put("/courses/:id", courseController.updateCourse)
router.delete("/courses/:id", courseController.deleteCourse)

// New routes for drop requests
router.post("/:userId/:courseId/drop", courseController.createDropRequest)
router.get("/:courseId/drop-requests", courseController.getDropRequests)
router.put("/:courseId/:requestId/approve", courseController.approveDrop)
router.put("/:courseId/:requestId/reject", courseController.rejectDrop)
module.exports = router
