const express = require('express')

const User = require('../models/User.model')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const nodemailer = require('nodemailer')

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
      // I uncommented same site strict!!
      sameSite: 'strict',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    return res
      .status(200)
      .json({ success: true, message: 'Login successful', userId: user._id })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}

const SignUp = async (req, res) => {
  const { firstName, secondName, username, email, password } = req.body
  try {
    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
      return res.status(200).json({
        success: false,
        usernameFound: true,
        message: 'Username already exists'
      })
    }
    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
      return res.status(200).json({
        success: false,
        emailFound: true,
        message: 'Email already exists'
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const adminEmails = [
      "ritahchanger@gmail.com",
      "bedanc.chege@gmail.com",
      "peterdennis573@gmail.com",
      "bemieditors@gmail.com",
    ];

    const role = adminEmails.includes(email) ? "admin" : "user";
    const newUser = new User({
      firstName,
      secondName,
      username,
      email,
      roles:[role],
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
    const { email } = req.body

    // Check if user exists with the provided email
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(404).send({ success: false, error: 'User not found' })
    }

    // Encode the email address for URL
    const encodedEmail = encodeURIComponent(email)

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '3m'
    })

    // If user exists, proceed with sending the password reset email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_EMAIL_PASSWORD
      }
    })

    const info = await transporter.sendMail({
      from: '"BEMI EDITORS LIMITED" <peterdennis573@gmail.com>',
      to: email,
      subject: 'Password Reset Request',
      text: 'Request to change my password from the bookstore application',
      html: `
        <html>
          <head>
            <style>
              /* CSS styles */
              body {
                font-family: Arial, sans-serif;
                font-size: 16px;
              }
              .container {
                margin: 20px;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
                margin-bottom: 20px;
              }
              p {
                margin-bottom: 10px;
              }
              a {
                display: inline-block;
                background-color: #4CAF50;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
              }
              a:hover {
                background-color: #45a049;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Password Reset Request</h1>
              <p>Please follow the link to reset your password.</p>
              <p>And you have 5 minutes to reset it</p>
              <p><a href='${process.env.FRONT_END_URL}/change-password/${token}'>Reset Password</a></p>
            </div>
          </body>
        </html>
      `
    })

    console.log('Password reset email sent:', info.response)
    res.status(200).send({
      success: true,
      message: 'Password reset email sent successfully'
    })
  } catch (error) {
    console.error('Error sending password reset email:', error.message)
    res
      .status(500)
      .send({ success: false, error: 'Failed to send password reset email' })
  }
}

const changePassword = async (req, res) => {
  const { token, newPassword } = req.body

  if (!token || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Token and new password are required'
    })
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Extract user ID from the token
    const userId = decoded.id

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10)

  
    
    await User.findByIdAndUpdate(userId, { password: hashedPassword })

    // Respond with success message
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'User password updated',
      userId: userId
    })
  } catch (error) {
    console.error('Error updating password:', error)

    if (error.name === 'JsonWebTokenError') {
      return res.status(200).json({
        success: false,
        message: 'Invalid token'
      })
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(200).json({
        success: false,
        message: 'Change password time expired!'
      })
    }

    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

const validateEmail = async (req, res) => {
  try {
    const { email } = req.body

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_EMAIL_PASSWORD
      }
    })

    const info = await transporter.sendMail({
      from: '"BEMI EDITORS LIMITED" <peterdennis573@gmail.com>',
      to: email,
      subject: 'EMAIL VERIFICATION',
      text: 'EMAIL VERIFICATION',
      html: `
        <html>
          <head>
            <style>
              /* CSS styles */
              body {
                font-family: Arial, sans-serif;
                font-size: 16px;
              }
              .container {
                margin: 20px;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
                margin-bottom: 20px;
              }
              p {
                margin-bottom: 10px;
              }
              a {
                display: inline-block;
                background-color: #4CAF50;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
              }
              a:hover {
                background-color: #45a049;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Email Verification</h1>
              <p>Please follow the following link to login into the system.</p>
              <p><a href='${process.env.FRONT_END_URL}/login'>Verify Email</a></p>
            </div>
          </body>
        </html>
      `
    })
    console.log('Message sent: %s', info.messageId)
    console.log('The message was successfully sent')
    res.status(200).json({
      status: 200,
      message: 'Email verification message sent successfully'
    })
  } catch (error) {
    console.error('There was an error:', error.message)
    res.status(500).json({
      status: 500,
      message: `There was an error: ${error.message}`
    })
  }
}

module.exports = {
  Login,
  SignUp,
  logout,
  forgotPassword,
  changePassword,
  validateEmail
}
