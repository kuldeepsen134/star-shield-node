const { Group } = require("../models")
const { handleError, handleResponse } = require("../utils/helpers")

exports.create = async (req, res) => {
  try {

    // const { error } = createGroup.validate(req.body, { abortEarly: false })
    // if (error) {
    //   return handleError(error, 400, res,)
    // }

    const { member_IDs, } = req.body

    const member = await Group.find({ _id: member_IDs, admin_Id: req.user._id })


    if (member.lenght > 0) {
      res.status(400).send({ message: 'User already has been joined', error: true })
      return
    }

    let data = ({
      member_IDs,
      admin_Id: req.user._id,
      status: 'followed'
    })

    const newGroup = new Group(data)

    await newGroup.save()

    const datad = { ...newGroup._doc, error: false }

    res.send({ ...datad, message: 'User has been joined', error: false })

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


exports.getFOllower = async (req, res) => {
  console.log('req>>>>', req.user);

  const page = parseInt(req.query.page) || 1; // Get the page number from the query string
  const limit = parseInt(req.query.limit) || 5

  const totalCount = await Group.countDocuments(); // Get the total count of documents in the collection

  const totalPages = Math.ceil(totalCount / limit); // Calculate the total number of pages

  const skip = (page - 1) * limit; // 

  await Group.find({ admin_id: req.user._id }).skip(skip).limit(limit)
    .then(data => {
      res.send({ data, currentPage: page, totalPages, totalCount, error: false })
    }).catch(err => {
      handleError(err, 400, res)
    })
}