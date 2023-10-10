const express = require("express")
const bookingController = require("../controllers/booking.controller")

const verifyTokenMiddleware = require("../middleware/verifyToken")

const router = express.Router()

router.post(
  "/book",
  //  verifyTokenMiddleware.verifyToken,
  bookingController.book
)

router.post("/availability", bookingController.availability)
router.get("/myBookings/:userId", bookingController.myBookings)
router.get("/getAll/", bookingController.allBookings)
router.post("/:bookingId/", bookingController.bookingStatus)

module.exports = router
