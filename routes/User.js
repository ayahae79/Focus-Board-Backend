const router = require("express").Router()
const userCtrl = require("../controllers/user")
const middleware = require("../middleware/index")

router.post("/login", userCtrl.Login)
router.post("/register", userCtrl.Register)
router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.CheckSession
)
router.put("/profile", userCtrl.updateProfile)
router.get("/user/:id", userCtrl.getUser)
router.get("/users", userCtrl.getAllusers)
router.get("/myCourses/:id", userCtrl.getUserCourses)
router.get("/myRoadmaps/:id", userCtrl.getUserRoadmaps)
router.get("/myTasks/:id", userCtrl.getUserTasks)
router.get("/myEvents/:id", userCtrl.getUserEvent)
module.exports = router
