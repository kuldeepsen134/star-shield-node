const { campaign } = require("../models")
const { handleError } = require("../utils/helpers")

exports.create = (req, res) => {
  const { title, description } = req.body

  const data = {
    title,
    description,
    creater_Id: req.user.id
  }

  const newCampiagn = new campaign(data)

  newCampiagn.save().then(data => {
    res.send({ data })
  }).catch(err => {
    handleError(err, 400, res)
  })
}