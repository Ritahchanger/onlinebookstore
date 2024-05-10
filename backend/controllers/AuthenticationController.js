const express = require('express')

const User = require('../models/User.model')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

require('dotenv').config()

const Login = async (req, res) => {
  const { password, email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(200)
        .json({ success: false, emailFound: false, message: 'User not found' })
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res
        .status(200)
        .json({
          success: false,
          passwordFound: false,
          message: 'The password did not match'
        })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    res.cookie('token',token,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        expires:new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    return res
      .status(200)
      .json({ success: true, message: 'Login successfull'})
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

const SignUp = async (req, res) => {
  const { firstName, secondName, username, email, password } = req.body

  try {
    const existingUsername = await User.findOne({ username })

    if (existingUsername) {
      return res.status(400).json({
        success: false,
        usernameFound: true,
        message: 'Username already exists'
      })
    }

    const existingEmail = await User.findOne({ email })

    if (existingEmail) {
      return res.status(400).json({
        success: false,
        emailFound: true,
        message: 'Email already exists'
      })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      firstName,
      secondName,
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
