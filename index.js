const express = require('express')
const app = express()

const cookieParser = require("cookie-parser")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")

require("dotenv").config({ path: __dirname + '/.env' });

const { authJWT } = require('./src/middleware/middleware')

//setting view engine to ejs
app.set("view engine", "ejs");

app.use("/", express.static(path.join(__dirname, "/client/build")))

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: ['https://star-shield.netlify.app', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Add additional HTTP methods as required
    allowedHeaders: ['Content-Type', 'Authorization'], // Add additional headers as required
  })
)

app.use(bodyParser.urlencoded({ extended: true }))

app.use(authJWT)

//******************** Routes ********************//

require('./src/routes/user')(app)
require('./src/routes/auth')(app)

require('./src/routes/media')(app)

require('./src/routes/comment')(app)

//**********Quiz routes**********//
require('./src/routes/reply')(app)



app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/index.html"))
})

const PORT = process.env.PORT || 5200

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT}`)
})