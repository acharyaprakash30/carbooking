const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand
} = require("@aws-sdk/client-s3")
const multer = require("multer")
const multerS3 = require("multer-s3")
const path = require("path")

// Configure the AWS client
const s3 = new S3Client({
  region: process.env.BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  }
})

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME,
    acl: "public-read", // make uploaded files publicly accessible,

    key: function (req, file, cb) {
      console.log("fileee ---->", file)
      const extension = path.extname(file.originalname)
      const basename = path.basename(file.originalname, extension)
      const timestamp = new Date().getTime().toString()
      cb(null, `${basename}-${timestamp}${extension}`)
    }
  })
})

module.exports = {
  upload: upload
}
