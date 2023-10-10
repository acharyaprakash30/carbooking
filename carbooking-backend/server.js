const http = require("http")
const app = require("./app")

const server = http.createServer(app)
const dotenv = require("dotenv")
dotenv.config()

const port = process.env.PORT_NUMBER || 5000
const connection = require("./config/dbConfig")
server.listen(port, () => console.log(`Node Js App listening on port ${port}`))
