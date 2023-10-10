const express = require("express")
const carController = require("../controllers/car.controller")
const imageUploader = require("../utilities/image-uploader")
const { CheckRole } = require("../middleware/CheckRole")
const verifyTokenMiddleware = require("../middleware/verifyToken")

const router = express.Router()
router.get("/getallcars", carController.show)
router.get("/getsinglecar/:id", carController.showById)

router.post(
  "/addcar",
  verifyTokenMiddleware.verifyToken,
  CheckRole("admin","superAdmin"),
  imageUploader.upload.single("imageUrl"),
  carController.save
)

// router.patch(
//   "/editcar",
//   verifyTokenMiddleware.verifyToken,
//   CheckRole("admin"),
//   carController.update
// )

router.delete(
  "/deletecar",
  verifyTokenMiddleware.verifyToken,
  // CheckRole("admin"),
  carController.remove
)

router.delete(
  "/deletecar/:id",
  verifyTokenMiddleware.verifyToken,
  CheckRole("admin","superAdmin"),
  carController.remove
)

module.exports = router
