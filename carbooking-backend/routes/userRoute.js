const express = require("express")
const userController = require("../controllers/user.controller")
const verifyTokenMiddleware = require("../middleware/verifyToken")
const { CheckRole } = require("../middleware/CheckRole")

const router = express.Router()

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/changePassword/:userId", userController.changePassword)
// router.patch("/edituser", userController.update)
router.patch(
  "/updaterole/:userId",
  verifyTokenMiddleware.verifyToken,
  CheckRole("superAdmin"),
  userController.updateRole
) //update user role
// router.delete("/deleteuser", userController.remove)

router.get(
  "/getallusers",
  verifyTokenMiddleware.verifyToken,
  CheckRole("admin","superAdmin"),
  userController.show
)
module.exports = router
