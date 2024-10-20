const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10 // Fallback to 10 if not set
const APP_SECRET = process.env.APP_SECRET

// Hash the password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

// Compare stored password with provided password
const comparePassword = async (storedPassword, password) => {
  return await bcrypt.compare(password, storedPassword)
}

// Create a JWT token
const createToken = (payload) => {
  return jwt.sign(payload, APP_SECRET)
}

// Verify JWT token
const verifyToken = (req, res, next) => {
  const { token } = res.locals

  if (!token) {
    return res
      .status(401)
      .send({ status: 'Error', msg: 'Unauthorized: No token provided' })
  }

  try {
    const payload = jwt.verify(token, APP_SECRET)
    res.locals.payload = payload // Store payload for use in next middleware/route
    next()
  } catch (error) {
    console.error('Token verification error:', error)
    res
      .status(401)
      .send({ status: 'Error', msg: 'Unauthorized: Invalid token' })
  }
}

// Strip token from the Authorization header
const stripToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    res.locals.token = token // Store token for verification
    next()
  } else {
    res
      .status(401)
      .send({
        status: 'Error',
        msg: 'Unauthorized: Token missing or malformed'
      })
  }
}

// Check if the user is an admin
const isAdmin = (req, res, next) => {
  const { role } = res.locals.payload || {} // Use payload from token

  if (role !== 'admin') {
    return res.status(403).json({ error: 'Access denied: Admins only' })
  }
  next()
}

module.exports = {
  stripToken,
  verifyToken,
  createToken,
  comparePassword,
  hashPassword,
  isAdmin
}
