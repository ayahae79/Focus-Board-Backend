const User = require('../models/User')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.findOne({ email })

    if (existingUser) {
      return res
        .status(400)
        .send('A user with that email has already been registered!')
    } else {
      const user = await User.create({
        username,
        email,
        passwordDigest,
        role: role || 'user'
      })
      res.status(201).send(user) // Use 201 for resource creation
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error registering user', error: error.message })
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(401)
        .send({ status: 'Error', msg: 'Unauthorized: User not found' })
    }

    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )
    if (matched) {
      let payload = {
        id: user._id,
        email: user.email,
        role: user.role
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }

    res
      .status(401)
      .send({ status: 'Error', msg: 'Unauthorized: Invalid password' })
  } catch (error) {
    res
      .status(500)
      .send({
        status: 'Error',
        msg: 'An error has occurred!',
        error: error.message
      })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload || { message: 'No user session found' })
}

module.exports = {
  Register,
  Login,
  CheckSession
}
