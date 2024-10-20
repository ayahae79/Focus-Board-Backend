const express = require('express')
const path = require('path')
require('dotenv').config()
const cors = require('cors')


const app = express()


const PORT = process.env.PORT || 3000


app.use(express.urlencoded({ extended: true }))


app.use(express.json())


app.use(
  cors({
    origin: 'http://localhost:5173' 
  })
)


app.use(express.static(path.join(__dirname, 'public')))


require('./config/db')


const userRoute = require('./routes/user')
const coursesRouter = require('./routes/course')
const eventRoute = require('./routes/event')
const taskRoute = require('./routes/task')
const roadmapRoute = require('./routes/roadmap')


app.use('/api/user', userRoute)
app.use('/api/courses', coursesRouter)
app.use('/api/event', eventRoute)
app.use('/api/tasks', taskRoute)
app.use('/api/roadmap', roadmapRoute)


app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})
