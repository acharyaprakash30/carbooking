// const mongoose = require('mongoose')

// const schema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     imageUrl: { type: String, required: true },
//     fuelType: { type: String, required: true },
//     capacity: { type: Number, required: true },
//     perHourRent: { type: Number, required: true },
//     booked: [
//       {
//         from: { type: String, required: true },
//         to: { type: String, required: true },
//       },
//     ],
//   },
//   { timestamps: true }
// )

// const carModel = mongoose.model('cars', schema)
// module.exports = carModel

//new
const mongoose = require("mongoose")

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    fuelType: { type: String, required: true },
    capacity: { type: Number, required: true },
    perHourRent: { type: Number, required: true }
    // bookings: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Booking"
    //   }
    // ]
  },
  { timestamps: true }
)

const carModel = mongoose.model("cars", schema)
module.exports = carModel
