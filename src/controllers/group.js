const { Group } = require("../models")
const { handleError, handleResponse } = require("../utils/helpers")

exports.create = async (req, res) => {
  const { member_IDs, } = req.body

  await Group.find({ member_IDs: member_IDs, admin_Id: req.user._id })
    .then(async (member) => {
      if (member.length > 0) {
        res.status(400).send({
          error: true,
          message: "User already has been joined."
        })
        return
      }
      else {
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

    }).catch((err) => {
      res.status(400).send({
        error: true,
        message: err.message
      })
    })
}

exports.findAll = async (req, res) => {
  await Group.find().then(data => {
    handleResponse(res, data, 200)
  }).catch(err => {
    handleError(err, 400, res)
  })
}

exports.getFOllower = async (req, res) => {

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

exports.findOne = async (req, res) => {
  await Group.findOne({ member_IDs: req.params.id, admin_Id: req.user._id }).then((data => {
    res.status(200).send({
      data: data,
      error: false
    })
  })).catch((err) => {
    res.status(400).send({
      error: true,
      message: err.message
    })
  })
}