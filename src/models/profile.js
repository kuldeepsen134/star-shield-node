const mongoose = require("mongoose")
const { Schema } = mongoose

const profileSchema = Schema({
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  zip_code: {
    type: String,
  },
  alternative_contact: {
    type: String,
  },
  status: {
    type: String,
  },
},
  {
    timestamps: true
  })

module.exports = mongoose.model("Profile", profileSchema)
