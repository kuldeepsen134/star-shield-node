const { User } = require("../models")
const md5 = require("md5")
const { handleError, handleResponse, createUUID } = require("../utils/helpers")
const { registerUser, updaterUserProfile } = require("../utils/common")
const { sendMailer } = require("../utils/helpers")


exports.register = async (req, res) => {
  try {

    const { error } = registerUser.validate(req.body, { abortEarly: false })

    if (error) {
      return handleError(error, 400, res,)
    }


    const { first_name, last_name, email, password, contact,role, } = req.body

    let data = ({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: md5(password),
      contact,
      role,
      isEmailVerified: false,

      token: createUUID()
    })

    const newUser = new User(data)

    await newUser.save()

    const datad = { ...newUser._doc, error: false }

    const link = `${process.env.BACKEND_URL}/account-verification?token=${datad.token}`;
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
  const page = parseInt(req.query.page) || 1; // Get the page number from the query string
  const limit = parseInt(req.query.limit) || 5

  const totalCount = await User.countDocuments(); // Get the total count of documents in the collection

  const totalPages = Math.ceil(totalCount / limit); // Calculate the total number of pages

  const skip = (page - 1) * limit; // 

  const users = await User.find().skip(skip).limit(limit)
    .then(data => {
      res.send({ data, currentPage: page, totalPages, totalCount, error: false })
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


exports.update = async (req, res) => {

  const { error } = updaterUserProfile.validate(req.body, { abortEarly: false })

  if (error) {
    return handleError(error, 400, res,)
  }

  const { first_name, last_name, } = req.body

  let data = ({
    first_name,
    last_name,
  })

  const user = await User.findOne({ _id: req.user._id })
  if (user === null) {
    handleError('Only for logged in user access!', 400, res)
  }
  else
    if (user) {
      await User.updateOne({ _id: user._id }, data, {
        new: true
      })
        .then(data => {
          return res.send({ message: `Profile has been successfully updated.`, error: false })
        })
        .catch(err => {
          handleError(err, 400, res)
        })
    }
}
