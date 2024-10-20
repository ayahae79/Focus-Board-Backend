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

// Import routes
const userRoute = require('./routes/user')
const taskRoute = require('./routes/task') // Ensure this matches your file name

// Mount routes
app.use('/user', userRoute)
app.use('/tasks', taskRoute) // This defines the base path for task routes

// Listen for HTTP requests on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
