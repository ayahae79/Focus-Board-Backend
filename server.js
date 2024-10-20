const express = require('express')
const path = require('path')
require('dotenv').config()
const cors = require('cors')

// Initialize express app
const app = express()

// Set the port from environment variables or default to 3000
const PORT = process.env.PORT || 3000

// Middleware to handle URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }))

// Middleware to parse incoming JSON requests
app.use(express.json())

// Use CORS middleware
app.use(
  cors({
    origin: 'http://localhost:5173' // Allow requests from your frontend
  })
)

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')))

// Database configuration (connect to DB)
require('./config/db')

// Routes
const userRoute = require('./routes/user')
const coursesRouter = require('./routes/course')
const eventRoute = require('./routes/event')
const taskRoute = require('./routes/task')
const roadmapRoute = require('./routes/roadmap')

// Mount routes with proper prefixes
app.use('/api/user', userRoute)
app.use('/api/courses', coursesRouter)
app.use('/api/event', eventRoute)
app.use('/api/tasks', taskRoute)
app.use('/api/roadmap', roadmapRoute)

// Listen for HTTP requests on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
