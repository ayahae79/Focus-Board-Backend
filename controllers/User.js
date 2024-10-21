const User = require("../models/User")
const middleware = require("../middleware")

const Register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.findOne({ email })

    if (existingUser) {
      return res
        .status(400)
        .send("A user with that email has already been registered!")
    } else {
      const user = await User.create({
        username,
        email,
        passwordDigest,
        role: role || "user",
      })
      res.status(201).send(user)
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message })
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(401)
        .send({ status: "Error", msg: "Unauthorized: User not found" })
    }

    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )
    if (matched) {
      let payload = {
        id: user._id,
        email: user.email,
        role: user.role,
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }

    res
      .status(401)
      .send({ status: "Error", msg: "Unauthorized: Invalid password" })
  } catch (error) {
    res.status(500).send({
      status: "Error",
      msg: "An error has occurred!",
      error: error.message,
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload || { message: "No user session found" })
}

const updateProfile = async (req, res) => {
  const {
    userId,
    full_name,
    profile_picture,
    date_of_birth,
    phone_number,
    student_id,
    major,
    year_of_study,
    gpa,
    academic_advisor,
  } = req.body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId, // Ensure this is correct
      {
        full_name,
        profile_picture,
        date_of_birth,
        phone_number,
        student_id,
        major,
        year_of_study,
        gpa,
        academic_advisor,
      },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error updating profile" })
  }
}

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    res.json(user)
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message })
  }
}

module.exports = {
  Register,
  Login,
  CheckSession,
  updateProfile,
  getUser,
}
