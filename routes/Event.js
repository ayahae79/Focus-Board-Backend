const express = require("express")
const router = express.Router()
const EventCtrl = require("../controllers/event")

router.post("/add", EventCtrl.createEvent)
router.get("/event/:id", EventCtrl.getEvent)
router.get("/allevents", EventCtrl.getAllEvents)
router.delete("/event/:id", EventCtrl.deleteEvent)

module.exports = router
