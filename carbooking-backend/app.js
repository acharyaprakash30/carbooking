const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()

app.use(cors({ origin: "*" }))

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

app.use(bodyParser.json())
app.use("/uploads", express.static("uploads"))
app.use("/api/user", require("./routes/userRoute"))
app.use("/api/cars", require("./routes/carsRoute"))
app.use("/api/bookings", require("./routes/bookingRoute"))
app.get("/*", (req, res) => res.send("welcome to ntx limo backend"))

module.exports = app
