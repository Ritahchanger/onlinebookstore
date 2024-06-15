const mongoose = require('mongoose')
const Counter = require('./Counter.model')

// Function to format date
function formatDate (date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

// Function to get the next user ID
async function getNextUserId () {
  const counter = await Counter.findOneAndUpdate(
    { name: 'userId' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )

  const nextId = counter.seq.toString().padStart(4, '0')
  return nextId
}

// User Schema
const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true
  },
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
    required: true
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
  description: {
    type: String
  },
  roles: {
    type: [String],
    enum: ['user', 'author', 'admin'],
    default: ['user']
  },
  createdOn: {
    type: String,
    default: () => formatDate(new Date())
  },
  newsLetter: {
    type: Boolean,
    default: false
  }
})

// Middleware to generate userId before saving the document
UserSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.userId = await getNextUserId()
  }
  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
