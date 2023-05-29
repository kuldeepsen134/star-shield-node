const express = require('express')
const app = express()

const cookieParser = require("cookie-parser")
const cors = require("cors")

const cookieSession = require('cookie-session')

const bodyParser = require("body-parser")
const path = require("path")

const passport = require('passport')


require("dotenv").config({ path: __dirname + '/.env' });

const { authJWT } = require('./src/middleware/middleware')

require('./src/controllers/passport')

app.set("view engine", "ejs");

app.use(express.json())
app.use(cookieParser())

app.use("/", express.static(path.join(__dirname, "/client/build")))


app.use(
  cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Add additional HTTP methods as required
    allowedHeaders: ['Content-Type', 'Authorization'], // Add additional headers as required
  })
)

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.urlencoded({ extended: true }))

app.use(authJWT)

//******************** Routes ********************//

require('./src/routes/user')(app)
require('./src/routes/auth')(app)

require('./src/routes/media')(app)

require('./src/routes/comment')(app)

//**********Quiz routes**********//
require('./src/routes/reply')(app)

require('./src/routes/googleAuth')(app)

require('./src/routes/group')(app)




app.get('/', function (req, res) {
  res.status(404).send('Huhhh smart!')
})


const PORT = process.env.PORT || 5200

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT}`)
})