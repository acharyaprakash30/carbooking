const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const bcrypt = require("bcryptjs")
const nodemailer = require("nodemailer");

const RandomNumber = () => {
  let length = 12;
  let charset =
    "@#$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$&*0123456789abcdefghijklmnopqrstuvwxyz";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

//send mail to the user for their password
const userPasswordMail = async (personalData,password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FROM_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
  const subject = "Your New Password";
  const to = personalData.email;
  const from = process.env.FROM_USER;
  const html = `<p>Hi ${personalData.fullName},</p>
  <p>Your password for ${personalData.email} is ${password}</p> 
  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

  const info = await transporter.sendMail({
    to,
    from,
    subject,
    html,
  });
  return info;
};

async function show(req, res) {
  try {
    const users = await User.find()
    // const resData = {
    //   user
    // }
    console.log("users data in be", users)
    res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function register(req, res) {
  const { fullName, email, password, address, gender } = req.body
  const token = req.headers.authorization.split(" ")[1]

  try {
    // // Check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).send({ error: "Email already exists" })
    }
    else{
      const password = RandomNumber();
      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt);
      if (token === process.env.INTERNAL_API_KEY) {
        // Create a new user object with the hashed password
        var user = new User({
          fullName,
          email,
          address,
          gender,
          password: hashedPassword,
          role: "superAdmin"
        })
        // Save the user to the database
        await user.save()
      } else {
        // Create a new user object with the hashed password
        var user = new User({
          fullName,
          email,
          address,
          gender,
          password: hashedPassword,
          role: "user"
        })
        // Save the user to the database
        await user.save()
      }
        await userPasswordMail(user,password);
      res.send({ message: "User registered successfully" })
    }
  
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found" })

    // const isMatch = await user.comparePassword(password);
    const isMatch = bcrypt.compareSync(password, user.password)
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" })

    const payload = { id: user._id, email: user.email, fullName: user.fullName }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h"
    })

    return res.status(200).json({ message: "Logged in Successfully", token })

    // User.findOne({ email }, (err, user) => {
    //   if (err) {
    //     return res.status(500).json({
    //       error: "Internal server error"
    //     })
    //   }
    //   if (!user) {
    //     return res.status(401).json({
    //       error: "Incorrect email or password"
    //     })
    //   }

    //   bcrypt.compare(password, user.password, (err, result) => {
    //     if (err) {
    //       return res.status(500).json({
    //         error: "Internal server error"
    //       })
    //     }
    //     if (!result) {
    //       return res.status(401).json({
    //         error: "Incorrect email or password"
    //       })
    //     }
    //     return res.status(200).json({
    //       message: "Login successful"
    //     })
    //   })
    // })
  } catch (error) {
    return res.status(500).json({ message: "Server error" })
  }
}

async function updateRole(req, res) {
  try {
    const { userId } = req.params

    const user = await User.findOne({ _id: userId })
    user.role = req.body.role

    await user.save()
    res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error)
  }
}

async function changePassword(req,res){
  const { userId } = req.params;
  const passwordDetails = {
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
    confirmPassword: req.body.confirmPassword,
  };

  if (passwordDetails.confirmPassword !== passwordDetails.newPassword) {
    res.status(401).json({ message: 'Password Not Matched!' });
  } else {
    const user = await User.findOne({_id:userId});
    const checkPassword = user.password;
    const passwordIsValid = bcrypt.compareSync(
      passwordDetails.oldPassword,
      checkPassword,
    );

    if (!passwordIsValid) {
      res.status(400).json({ message: 'Incorrect Password!!' });
    } else {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(passwordDetails.newPassword, salt);
    
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: 'Password Changed Successfully!' });
    }
  }
};

// async function remove(req, res) {
//   try {
//     await Car.findOneAndDelete({ _id: req.body._id })
//     res.send("Car deleted successfully")
//   } catch (error) {
//     return res.status(400).json(error)
//   }
// }

module.exports = {
  show: show,
  register: register,
  login: login,
  updateRole: updateRole,
  changePassword:changePassword
  // update: update,
  // remove: remove
}
