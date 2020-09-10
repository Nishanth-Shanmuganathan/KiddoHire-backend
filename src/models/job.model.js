const mongoose = require('mongoose')

const jobSchema = mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  minimumExperience: {
    type: Number,
    required: true
  },
  maximumExperience: {
    type: Number,
    required: true
  },
  minimumSalary: {
    type: Number,
    required: true
  },
  maximumSalary: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  totalRounds: {
    type: Number,
    required: true
  },
  rounds: {
    type: [{
      date: Date,
      description: String
    }],
    required: true
  },
  applicants: {
    type: [{
      applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      jobMatch: Number,
      status: {
        type: [{
          cleared: Boolean,
          stage: String
        }]
      }
    }],
    default: []
  },
  shortlisted: [{
    applicant: mongoose.Schema.Types.ObjectId,
    accepted: Boolean
  }]
})

// jobSchema.plugin(validator)
// jobSchema.virtual('queries', {
//   ref: 'Query',
//   localField: '_id',
//   foreignField: 'author'
// })
// jobSchema.methods.toJSON = function () {
//   const userObject = this.toObject()
//   delete userObject.password
//   delete userObject.token
//   return userObject
// }
module.exports = mongoose.model('Job', jobSchema)
