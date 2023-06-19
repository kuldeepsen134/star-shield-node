
const express = require('express');
const session = require('express-session');
const app = express();

const path = require("path");
const passport = require('passport');
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config({ path: __dirname + '/.env' });
const cookieParser = require("cookie-parser");
const { authJWT } = require('./src/middleware/middleware');

app.set("view engine", "ejs");

app.use(cors({
  origin: ['http://localhost:3000','http://localhost:5200', ],
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

require('./src/controllers/passport');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use("/", express.static(path.join(__dirname, "/client/build")));

app.use(authJWT);

//******************** Routes ********************//
require('./src/routes/googleAuth')(app);
require('./src/routes/user')(app);
require('./src/routes/auth')(app);
require('./src/routes/media')(app);
require('./src/routes/comment')(app);
require('./src/routes/reply')(app);
require('./src/routes/group')(app);
require('./src/routes/post')(app);

app.get('*', function (req, res) {
  res.status(404).send('Huhhh smart!');
});

const PORT = process.env.PORT || 5200;

app.listen(PORT, () => {
  console.log(`Server is working on ${PORT}`);
});