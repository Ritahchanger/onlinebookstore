const express = require('express')

const User = require('../models/User.model')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const Login = async (req, res) => {}

const SignUp = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body

  try {
    const existingUsername = await User.findOne({ username })

    if (existingUsername) {
      return res
        .status(400)
        .json({
          success: false,
          usernameFound: true,
          message: 'Username already exists'
        })
    }

    const existingEmail = await User.findOne({ email })

    if (existingEmail) {
      return res
        .status(400)
        .json({
          success: false,
          emailFound: true,
          message: 'Email already exists'
        })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword
    })

    await newUser.save()

    res
      .status(200)
      .json({ success: true, message: 'User created successfully' })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

module.exports = { Login, SignUp }
