const { Group } = require("../models")
const { handleError, handleResponse } = require("../utils/helpers")

exports.create = async (req, res) => {
  try {

    // const { error } = createGroup.validate(req.body, { abortEarly: false })
    // if (error) {
    //   return handleError(error, 400, res,)
    // }

    const { member_IDs, } = req.body

    let data = ({
      member_IDs,
      admin_Id: req.user._id
    })

    const newGroup = new Group(data)

    await newGroup.save()

    const datad = { ...newGroup._doc, error: false }

    res.send(datad)

  }

  catch (error) {
    res.status(400).send({ error: error.message })
  }
}

exports.findAll = async (req, res) => {
  await Group.find().then(data => {
    handleResponse(res, data, 200)
  }).catch(err => {
    handleError(err, 400, res)
  })
}