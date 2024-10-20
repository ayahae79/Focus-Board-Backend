// Import necessary packages
const express = require("express")
const path = require("path")
require("dotenv").config()
const cors = require("cors")

// Initialize express app
const app = express()

// Set the port from environment variables or default to 4000
const PORT = process.env.PORT

// Middleware to handle URL-encoded data (form submissions)
app.use(express.urlencoded({ extended: true }))

// Middleware to parse incoming JSON requests
app.use(express.json())

// Use CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow requests from your frontend
  })
)

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")))

// Database configuration (connect to DB)
require("./config/db")

// routes
const EventRoute = require("./routes/event")
// Mount routes
app.use("/event", EventRoute)

// Listen for HTTP requests on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
