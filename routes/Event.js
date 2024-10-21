const express = require('express')
const router = express.Router()
const EventCtrl = require('../controllers/event')
const { stripToken, verifyToken } = require('../middleware') // Ensure middleware is imported

// Protect the route with the authentication middleware
router.post('/add', stripToken, verifyToken, EventCtrl.createEvent)
router.get('/event/:id', EventCtrl.getEvent)
router.get('/events', EventCtrl.getAllEvents)
router.put('/event/:id', verifyToken, EventCtrl.updateEvent) // Protect update
router.delete('/event/:id', verifyToken, EventCtrl.deleteEvent) // Protect delete

module.exports = router
