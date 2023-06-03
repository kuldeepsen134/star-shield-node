const mongoose = require("mongoose")
const { Schema } = mongoose

const campaignSchema = Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },

  creater_Id: {
    type: String,
  },
},
  {
    timestamps: true
  })


module.exports = mongoose.model("Campaign", campaignSchema)
