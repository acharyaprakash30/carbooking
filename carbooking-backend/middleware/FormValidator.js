const { check, validationResult } = require("express-validator")
const User = require("../models/userModel")
const fs = require("fs")

exports.validateUser = [
  check("fullName")
    .notEmpty()
    .withMessage("Full name is required!!")
    .matches("^[A-Za-z ]+$")
    .withMessage("Please enter valid full name!!")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 characters required!!"),
  check("email")
    .notEmpty()
    .withMessage("Email is required!!")
    .custom(async (email, { req }) => {
      if (req.body.email) {
        // Check if email already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
          return res.status(400).send({ error: "Email already exists" })
        }
      }
    })
    .isEmail()
    .withMessage("Invalid email address!!"),

  check("password")
    .notEmpty()
    .withMessage("Password is required!!")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    .withMessage(
      "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter,one number and one special character"
    ),

  check("phone")
    .custom(async (phone, { req }) => {
      if (req.body.phone) {
        // Check if email already exists
        const existingUser = await User.findOne({ phone })
        if (existingUser) {
          return res.status(400).send({ error: "phone is  already used" })
        }
      }
    })
    .matches("^([9][0-9]{9})$")
    .withMessage("Please enter valid MobileNumber!!"),

  check("gender")
    .isIn(["Male", "Female", "Others"])
    .withMessage("Please provide valid Gender!!"),

  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      if (req.file) {
        fs.unlinkSync(req.file.path)
      }
      return res.status(422).json({ errors: errors.array() })
    }
    next()
  }
]
