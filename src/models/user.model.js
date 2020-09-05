const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileName: {
    type: String,
    required: true
  },
  username: String,
  token: String,
  role: String
})

userSchema.plugin(validator)

module.exports = mongoose.model('User', userSchema)
