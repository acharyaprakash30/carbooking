// const mongoose = require("mongoose")

// const schema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     email: { type: String, required: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: false },
//     address: { type: String, required: false },
//     role: { type: String, required: false },
//     gender: {
//       type: String,
//       enum: ["Male", "Female", "Others"],
//       default: "Male"
//     }
//   },
//   { timestamps: true }
// )

// const userModel = mongoose.model("user", schema)
// module.exports = userModel

//new

const mongoose = require("mongoose")

const schema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: false },
    address: { type: String, required: false },
    role: { type: String,
          enum: ["superAdmin","admin","user"],
          default: "user"
      },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      default: "Male"
    }
    // bookings: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Booking"
    //   }
    // ]
  },
  { timestamps: true }
)

const userModel = mongoose.model("user", schema)
module.exports = userModel
