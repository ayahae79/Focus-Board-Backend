const express = require("express")
const router = express.Router()
const EventCtrl = require("../controllers/event")

// Protect the route with the authentication middleware
router.post("/add", EventCtrl.createEvent)
router.get("/event/:id", EventCtrl.getEvent)
router.get("/events", EventCtrl.getAllEvents)
router.delete("/event/:id", EventCtrl.deleteEvent)

module.exports = router
