const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task');

// Use the routes without the `/tasks` prefix, as it's already defined in server.js
router.post('/', taskController.createTask); // POST /tasks
router.get('/', taskController.getTasks); // GET /tasks
router.get('/:id', taskController.getTaskById); // GET /tasks/:id
router.put('/:id', taskController.updateTask); // PUT /tasks/:id
router.delete('/:id', taskController.deleteTask); // DELETE /tasks/:id

module.exports = router;
