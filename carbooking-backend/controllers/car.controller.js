const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3")
const Car = require("../models/carModel")

async function show(req, res) {
  try {
    const cars = await Car.find()
    res.status(200).json(cars)
  } catch (error) {
    return res.status(400).json(error)
  }
}
async function showById(req, res) {
  try {
    const car = await Car.findOne({ _id: req.params.id })
    res.status(200).json(car)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function save(req, res) {
  console.log("process.env.S3_BUCKET_URL", process.env.S3_BUCKET_URL)
  try {
    req.body.imageUrl = req.file.location.replace(process.env.S3_BUCKET_URL, "")
    const newcar = await new Car(req.body)
    await newcar.save()
    res.status(200).json(newcar)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function update(req, res) {
  try {
    const car = await Car.findOne({ _id: req.body._id })
    car.name = req.body.name
    car.image = req.body.image
    car.fuelType = req.body.fuelType
    car.perHourRent = req.body.perHourRent
    car.capacity = req.body.capacity

    await car.save()
    res.status(200).json(car)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function remove(req, res) {
  try {
    const car = await Car.findOneAndDelete({ _id: req.params.id })
    // const car = await Car.findOne({ _id: req.params.id })
    if (!car) {
      return res.status(404).json({ message: "Car not found" })
    }

    // Delete image from S3 bucket
    const s3 = new S3Client({
      region: process.env.BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
      }
    })
    const deleteParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: car.imageUrl // imageUrl is the key of the image in the S3 bucket
    }

    await s3.send(new DeleteObjectCommand(deleteParams))
    res.send("Car and associated image deleted successfully")

    // res.send("Car deleted successfully")
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  show: show,
  showById: showById,
  save: save,
  update: update,
  remove: remove
}
