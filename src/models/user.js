const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  googleId: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
  },

  isEmailVerified: Boolean,
  token: {
    type: String,

  },
},
  {
    timestamps: true
  })


module.exports = mongoose.model("User", userSchema)
