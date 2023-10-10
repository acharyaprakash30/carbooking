const mongoose = require("mongoose")
const bookingSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cars"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  // startDate: {
  //   type: String,
  //   required: true
  // },
  startTime: {
    type: String,
    required: true
  },
  // endDate: {
  //   type: String,
  //   required: true
  // },
  endTime: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  pickupAddress: {
    type: String,
    required: false
  },
  dropAddress: {
    type: String,
    required: false
  },
  paymentStatus: {
    type: Boolean,
    required: false,
    default: false
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending","Accepted","Delivered"],
    default: "Pending"
  }
})

const Booking = mongoose.model("Booking", bookingSchema)
module.exports = Booking
