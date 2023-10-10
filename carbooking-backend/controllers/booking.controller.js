const Car = require("../models/carModel")
const User = require("../models/userModel")
const Booking = require("../models/bookingModel")
const moment = require("moment")
const nodemailer = require("nodemailer");

const BookingMail = async (user,car,booking) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FROM_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const subject = "Your New Password";
  const to = user.email;
  const from = process.env.FROM_USER;
  const html = `<p>Hi ${user.fullName},</p>
  <h3>Congratulation!! Your car ${car.name} has been booked </h3> 
  <p>Your order Details are:</p>
  <p>Start Date And Time: ${booking.startDate} ${booking.startTime} </p>
  <p>End Date And Time: ${booking.endDate} ${booking.endTime} </p>
  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

  const info = await transporter.sendMail({
    to,
    from,
    subject,
    html,
  });
  return info;
};

async function book(req, res) {
  try {
    const {
      carId,
      userId,
      from,
      to,
      startDate,
      startTime,
      endDate,
      endTime
    } = req.body

    // Combine startDate and startTime into start using moment
    const start = moment(
      `${startDate} ${startTime}`,
      "MM-DD-YYYY HH:mm:ss"
    ).toISOString()

    // Combine endDate and endTime into end using moment
    const end = moment(
      `${endDate} ${endTime}`,
      "MM-DD-YYYY HH:mm:ss"
    ).toISOString()


    if(endDate < startDate){
      return res.status(409).send({
        message:
          "end date and their respective time can't be greater than start date and time"
      })
    }
    if(startDate == endDate && endTime <= startTime){
      return res.status(409).send({
        message:
          "end time and date cant be smaller or equal to start time and date"
      })
    }
    if(start == end){
      return res.status(409).send({
        message:
          "start date, end date and their respective time can't be same"
      })
    }
  

    const existingBooking = await Booking.findOne({
      car: carId,
      $or: [
        {
          startTime: { $lte: start },
          endTime: { $gte: start }
        },
        {
          startTime: { $lte: end },
          endTime: { $gte: end }
        },
        {
          startTime: { $gte: start },
          endTime: { $lte: end }
        }
      ]
    })

    if (existingBooking) {
      // throw new Error("The car is not available for the requested time.")
      return res.status(509).send({
        message:
          "car is not available for the requested time. select a different time"
      })
    }

    const car = await Car.findById(carId)
    const user = await User.findById(userId)

    const startTimeFormatted = moment(start, "YYYY-MM-DDTHH:mm:ss.SSSZ")
    const endTimeFormatted = moment(end, "YYYY-MM-DDTHH:mm:ss.SSSZ")

    const bookingDurationInMinutes = moment
      .duration(moment(endTimeFormatted).diff(moment(startTimeFormatted)))
      .asMinutes()
    console.log("booking duration in minutes", bookingDurationInMinutes)

    const cost = (bookingDurationInMinutes / 60) * car.perHourRent

    const booking = new Booking({
      car: carId,
      user: userId,
      startTime: start,
      endTime: end,
      cost: cost,
      from:from,
      to:to
    })

    await BookingMail(user,car,req.body);
    await booking.save()

    res.send("booking successful")
  } catch (error) {
    console.log("booking error", error.message)
    res.status(500).send({ message: error.message })
  }
}

async function availability(req, res) {
  try {
    const { carId, startTime, endTime } = req.body

    const existingBooking = await Booking.findOne({
      car: carId,
      $or: [
        {
          startTime: { $lte: startTime },
          endTime: { $gte: startTime }
        },
        {
          startTime: { $lte: endTime },
          endTime: { $gte: endTime }
        },
        {
          startTime: { $gte: startTime },
          endTime: { $lte: endTime }
        }
      ]
    })

    if (existingBooking) {
      res.status(404).json({
        available: false,
        message: `car with id ${carId} is not available for booking`
      })
    } else {
      res.status(200).json({
        available: true,
        message: `car with id ${carId} is available for booking`
      })
    }

    // return booking
  } catch (error) {
    console.log("booking error", error.message)
    res.status(500).send({ message: error.message })
  }
}

async function myBookings(req, res) {
  try {
    // const { userId } = req.body
    const { userId } = req.params
    console.log("userId in mybooking", userId)

    Booking.find({ user: userId })
      .populate("car")
      .exec((err, bookings) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Error while fetching bookings" })
        }

        if (bookings.length === 0) {
          return res
            .status(404)
            .send({ message: "No bookings found for this user" })
        }

        res.status(200).json({
          data: bookings,
          message: `bookings fetched successfully`
        })
      })
  } catch (error) {
    console.log("error fetching bookings", error.message)
    res.status(500).send({ message: error.message })
  }
}

async function bookingStatus(req, res) {
  try {
    const { bookingId } = req.params

    const booking = await Booking.findOne({ _id: bookingId })
    booking.status = req.body.status
    await booking.save()
    res.status(200).json({message:"Booking status updated sucessfully"})
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function allBookings(req, res) {
  try {

    Booking.find()
      .populate("car")
      .populate("user")
      .exec((err, bookings) => {
        if (err) {
          return res
            .status(500)
            .send({ message: "Error while fetching bookings" })
        }

        if (bookings.length === 0) {
          return res
            .status(404)
            .send({ message: "No bookings found for this user" })
        }

        res.status(200).json({
          data: bookings,
          message: `bookings fetched successfully`
        })
      })
  } catch (error) {
    console.log("error fetching bookings", error.message)
    res.status(500).send({ message: error.message })
  }
}

module.exports = {
  availability: availability,
  book: book,
  myBookings: myBookings,
  allBookings:allBookings,
  bookingStatus:bookingStatus
}
