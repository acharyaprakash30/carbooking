const User = require("../models/userModel")

exports.CheckRole = (...roles) => {
  return async (req, res, next) => {
    const { email } = req.userData
    console.log("email from the request at middleware", email)
    try {
      const user = await User.findOne({ email })
      console.log("user.role", user.role)

      if (!roles.includes(user?.role)) {
        // return next(
        return res.status(403).json({
          message:
            "Unauthorized user, you donot have permission to perform this task"
        })
        // )
      }
      next()
    } catch (error) {
      return res.status(500).json({
        message: "Error retriving the user data",
        error: error.message
      })
    }
  }
}
// exports.CheckRole = (...roles) => {
//   return (req, res, next) => {
//     console.log("req data-->", roles, req.role)
//     if (!roles.includes(req.body.role)) {
//       return next(
//         res.status(403).json({
//           message: "Unauthorized user"
//         })
//       )
//     }

//     next()
//   }
// }
