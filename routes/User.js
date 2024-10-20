const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const middleware = require("../middleware/index");

// User login route
router.post("/login", userCtrl.Login); // POST /login

// User registration route
router.post("/register", userCtrl.Register); // POST /register

// Session check route with token verification middleware
router.get(
  "/session",
  middleware.stripToken,
  middleware.verifyToken,
  userCtrl.CheckSession // GET /session
);

module.exports = router;
