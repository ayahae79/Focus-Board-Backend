const router = require('express').Router()
const userCtrl = require('../controllers/user')
const middleware = require('../middleware/index')

router.post('/login', userCtrl.Login)
router.post('/register', userCtrl.Register)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.CheckSession
)

module.exports = router
