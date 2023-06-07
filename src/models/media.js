const mongoose = require("mongoose")
const { Schema } = mongoose

const mediaSchema = Schema({
  
  original_file_name: {
    type: String,
  },
  file_name: {
    type: String,
  },

  type: {
    type: String,
  },
  file_URL: {
    type: String,
  },
  file_size: {
    type: String,
  },

  post_id: {
    type: String,
  },
},
  {
    timestamps: true
  })


module.exports = mongoose.model("Media", mediaSchema)
