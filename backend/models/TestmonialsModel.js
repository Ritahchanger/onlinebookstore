const mongoose = require('mongoose')

const TestmonialSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  secondName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  passport: {
    type: String
  }
})

const Testmonial = mongoose.model('Testmonial', TestmonialSchema)

module.exports = Testmonial
