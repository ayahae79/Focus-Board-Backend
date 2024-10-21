const express = require("express")
const router = express.Router()
const taskController = require("../controllers/task")

// Use the routes without the `/tasks` prefix, as it's already defined in server.js
router.post("/add", taskController.createTask) // POST /tasks
router.get("/tasks", taskController.getTasks) // GET /tasks
router.get("/tasks/:id", taskController.getTaskById) // GET /tasks/:id
router.put("/tasks/:id", taskController.updateTask) // PUT /tasks/:id
router.delete("/tasks/:id", taskController.deleteTask) // DELETE /tasks/:id

module.exports = router
