const { Profile } = require("../models")

exports.create = async (req, res) => {
  try {
    // const { error } = registerUser.validate(req.body, { abortEarly: false })

    // if (error) {
    //   return handleError(error, 400, res,)
    // }


    const { gender, city, zip_code, state, alternate_contact, yearly_salary, graduation, } = req.body

    let data = ({
      gender,
      city,
      state,
      zip_code,
      alternate_contact,
      yearly_salary,
      graduation,
      user_id: req.user._id,
      status: 'completed'
    })

    const newUser = new Profile(data)

    await newUser.save()

    const datad = { ...newUser._doc, error: false }

    res.send({ data: datad, message: 'Your profile has been submitted', error: false })
  }

  catch (error) {
    res.status(400).send({ error: error.message })
  }
}

exports.findAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the page number from the query string
  const limit = parseInt(req.query.limit) || 5

  const totalCount = await Profile.countDocuments(); // Get the total count of documents in the collection

  const totalPages = Math.ceil(totalCount / limit); // Calculate the total number of pages

  const skip = (page - 1) * limit; // 

  const Profiles = await Profile.find().skip(skip).limit(limit)
    .then(data => {
      res.send({ data, currentPage: page, totalPages, totalCount, error: false })
    }).catch(err => {
      handleError(err, 400, res)
    })
}

exports.findOne = async (req, res) => {
  await Profile.findOne({ _id: req.params.id })
    .then(data => {
      handleResponse(res, data, 200)
    }).catch(err => {
      handleError(err, 400, res)
    })
}
