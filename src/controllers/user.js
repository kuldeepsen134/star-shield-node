const { User } = require("../models")
const md5 = require("md5")
const { handleError, handleResponse, createUUID } = require("../utils/helpers")
const { registerUser } = require("../utils/common")
const { sendMailer } = require("../utils/helpers")


exports.register = async (req, res) => {
  try {

    const { error } = registerUser.validate(req.body, { abortEarly: false })

    if (error) {
      return handleError(error, 400, res,)
    }


    const { first_name, last_name, email, password, role, } = req.body

    let data = ({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: md5(password),
      role,
      isEmailVerified: false,

      token: createUUID()
    })

    const newUser = new User(data)

    await newUser.save()

    const datad = { ...newUser._doc, error: false }

    const link = `${process.env.FRONTEND_URL}/account-verification?token=${datad.token}`;
    const subject = "Your email verification link";
    const message = `<div style="margin:auto; width:70%">
                            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                            <div style="margin:50px auto;width:60%;padding:20px 0">
                            <div style="border-bottom:1px solid #eee">
                                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Star Shield</a>
                            </div>
                              <p style="font-size:25px">Hello  ,</p>
                              <p>Use the code below to recover access to your Star Shield account.</p>
                              <a href=${link} style=text-decoration:none><h3 stylea="background:#e6f3ffwidth:fullmargin: 0 autopadding:10px">Confirm</h3></a></h3>
                              <p style="font-size:0.9em;">Best Regards,<br />Star Shield</p>
                          </div>
                      </div>
                      </div>`;

    sendMailer(data.email, subject, message, res)


    res.send(datad)

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

exports.findOne = async (req, res) => {
  await User.findOne({ _id: req.params.id })
    .then(data => {
      handleResponse(res, data, 200)
    }).catch(err => {
      handleError(err, 400, res)
    })
}
