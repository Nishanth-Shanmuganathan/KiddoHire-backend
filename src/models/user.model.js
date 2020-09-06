const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    // unique: true
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
  role: String,
  emailVerified: Boolean,
  completion: {
    type: Number,
    default: 10
  }
})

// userSchema.plugin(validator)
// userSchema.virtual('queries', {
//   ref: 'Query',
//   localField: '_id',
//   foreignField: 'author'
// })
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.token
  return userObject
}
module.exports = mongoose.model('User', userSchema)
