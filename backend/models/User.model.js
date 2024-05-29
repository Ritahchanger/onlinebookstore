const mongoose = require('mongoose')

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
    unique:true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passport:{
    type:String,
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: [String],
    enum: ['user', 'author', 'admin'],
    default: ['user']
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User
