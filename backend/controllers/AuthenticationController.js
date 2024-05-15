const express = require('express')

const User = require('../models/User.model')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const nodemailer = require("nodemailer")

require('dotenv').config()

const Login = async (req, res) => {
  const { password, email } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(200)
        .json({ success: false, emailFound: false, message: 'Email not found' })
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(200).json({
        success: false,
        passwordFound: false,
        message: 'The password did not match'
      })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    })

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    return res.status(200).json({ success: true, message: 'Login successfull' })
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

const logout = async (req, res) => {
  try {
    res.cookie('token', '', {
      maxAge: 0
    })

    res.status(200).json({ message: 'Logged out successfully' })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}




const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user:"bedanc.chege@gmail.com",
        pass: "onay wumy uyhl cvkr"
      }
    });

    const info = await transporter.sendMail({
      from: '"BEMI EDITORS LIMITED" <peterdennis573@gmail.com>',
      to: email,
      subject: 'Password Reset Request',
      text: 'Request to change my password from the bookstore application',
      html: "<b>Password Reset Request</b><p>Please follow the link to reset your password.</p</br>  <a href='https://onlinebookstore1.vercel.app/login'"
    });

    console.log('Message sent: %s', info.messageId);
    console.log('The message was successfully sent');
    res.status(200).send({ msg: 'The message was successfully sent' });
  } catch (error) {
    console.log('There was a problem in sending the email:', error);
    res.status(500).send('There was a problem in sending the email');
  }
};





module.exports = { Login, SignUp, logout,forgotPassword}
