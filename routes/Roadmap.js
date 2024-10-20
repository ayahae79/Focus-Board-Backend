const express = require("express")
const router = express.Router()
const roadmapCtrl = require("../controllers/roadmap")

router.post("/add", roadmapCtrl.createRoadmap)
router.get("/roadmap/:id", roadmapCtrl.getRoadmap)
router.get("/roadmaps", roadmapCtrl.getAllRoadmap)
router.delete("/roadmap/:id", roadmapCtrl.deleteRoadmap)

module.exports = router
