const { User } = require("../models")
const md5 = require("md5")
const jwt = require('jsonwebtoken')
const { handleError, handleResponse } = require("../utils/helpers")
const { registerUser } = require("../utils/common")
const jwtkey = "jwt"


exports.register = async (req, res) => {
  try {

    const { error } = registerUser.validate(req.body, { abortEarly: false })

    if (error) {
      return handleError(error, 400, res)
    }

    
    const { first_name, last_name, email, password, role, } = req.body

    let data = ({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: md5(password),
      role,
    })

    const newUser = new User(data)

    await newUser.save()

    const token = await jwt.sign({ data }, jwtkey, { expiresIn: '2592000s' })

    const datad = { ...newUser._doc, token }

    handleResponse(res, datad, 201)

  }

  catch (error) {
    res.status(400).send({ error: error.message })
  }
}

exports.findAll = async (req, res) => {

  const users = await User.find().then(data => {
    handleResponse(res, data, 200)
  }).catch(err => {
    handleError(err, 400, res)
  })
}
