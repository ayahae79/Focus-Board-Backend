//connecting the database
const mongoose = require("mongoose")
mongoose
  .connect(process.env.MongoDBURL)
  .then(() => {
    const db = mongoose.connection
    console.log(
      `MongoDb connected to database : ${db.name}, at host ${db.host}, on port ${db.port}`
    )
  })
  .catch((err) => {
    console.log("not connected " + err)
  })
