const mongoose = require("mongoose")
const { Schema } = mongoose

const postSchema = Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  creater_Id: {
    type: String,
  },
  files: [
    {
      originalName: {
        type: String,
        required: true,
      },
      fileName: {
        type: String,
        required: true,
      },
      filePath: {
        type: String,
        required: true,
      },
      mimetype: {
        type: String,
        required: true,
      },
      size: {
        type: Number, // Changed the type to Number for file size
        required: true,
      },
    },
  ],
},
{
  timestamps: true,
});

module.exports = mongoose.model("Post", postSchema)
