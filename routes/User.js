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
router.put('/profile', userCtrl.updateProfile)
router.get('/user/:id', userCtrl.getUser)
module.exports = router
