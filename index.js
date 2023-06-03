const express = require('express')
const app = express()

const path = require("path")

const passport = require('passport')
const helmet = require('helmet');

const cors = require("cors")
const bodyParser = require("body-parser")

require("dotenv").config({ path: __dirname + '/.env' });


const cookieParser = require("cookie-parser")
const cookieSession = require('cookie-session')

const { authJWT } = require('./src/middleware/middleware')


app.set("view engine", "ejs");

app.use(helmet({
  referrerPolicy: {
    policy: 'same-origin'
  }
}))

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5200',],
  credentials: true,
}))


app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

require('./src/controllers/passport')



app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json())
app.use("/", express.static(path.join(__dirname, "/client/build")))


app.use(authJWT)

//******************** Routes ********************//
require('./src/routes/googleAuth')(app)

require('./src/routes/user')(app)
require('./src/routes/auth')(app)

require('./src/routes/media')(app)

require('./src/routes/comment')(app)

//**********Quiz routes**********//
require('./src/routes/reply')(app)


require('./src/routes/group')(app)



app.get('*', function (req, res) {
  res.status(404).send('Huhhh smart!')
})


const PORT = process.env.PORT || 5200

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT}`)
})