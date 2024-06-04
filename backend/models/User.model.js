const mongoose = require('mongoose')

function formatDate (date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  secondName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNo: {
    type: String
  },
  amount: {
    type: Number
  },
  passport: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    enum: ['user', 'author', 'admin'],
    default: ['user']
  },
  createdOn: {
    type: String,
    default: () => formatDate(new Date())
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User
