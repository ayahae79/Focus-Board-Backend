const express = require('express')
const router = express.Router()
const EventCtrl = require('../controllers/event')

// Create a new event
router.post('/add', EventCtrl.createEvent)

// Get a specific event by ID
router.get('/event/:id', EventCtrl.getEvent)

// Get all events
router.get('/allevents', EventCtrl.getAllEvents)

// Update an existing event by ID
router.put('/event/:id', EventCtrl.updateEvent)

// Delete an event by ID
router.delete('/event/:id', EventCtrl.deleteEvent)

module.exports = router
