const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10) || 10
const APP_SECRET = process.env.APP_SECRET

const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS)
}

const comparePassword = async (storedPassword, password) => {
  return await bcrypt.compare(password, storedPassword)
}

const createToken = (payload) => {
  return jwt.sign(payload, APP_SECRET)
}

const verifyToken = (req, res, next) => {
  const { token } = res.locals

  if (!token) {
    return res
      .status(401)
      .send({ status: 'Error', msg: 'Unauthorized: No token provided' })
  }

  try {
    const payload = jwt.verify(token, APP_SECRET)
    res.locals.payload = payload
    next()
  } catch (error) {
    console.error('Token verification error:', error)
    res
      .status(401)
      .send({ status: 'Error', msg: 'Unauthorized: Invalid token' })
  }
}

const stripToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    res.locals.token = token
    next()
  } else {
    res.status(401).send({
      status: 'Error',
      msg: 'Unauthorized: Token missing or malformed'
    })
  }
}

const isAdmin = (req, res, next) => {
  const { role } = res.locals.payload || {}

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
