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
      // sameSite: 'strict',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    })

    return res
      .status(200)
      .json({ success: true, message: 'Login successfull', userId: user._id })
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
    const { email } = req.body

    // Check if user exists with the provided email
    const user = await User.findOne({ email })

    if (!user) {
      return res
        .status(200)
        .send({ success: false, status: 404, error: 'User not found' })
    }

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
              <p><a href='http://localhost:3000/change-password/${email}'>Reset Password</a></p>
            </div>
          </body>
        </html>
      `
    })

    console.log('Message sent: %s', info.messageId)
    console.log('The message was successfully sent')
    res.status(200).send({
      success: true,
      status: 200,
      msg: 'The message was successfully sent'
    })
  } catch (error) {
    console.log('There was a problem in sending the email:', error)
    res.status(500).send('There was a problem in sending the email')
  }
}

const changePassword = async (req, res) => {
  const { email, newPassword } = req.body

  try {
    // Find the user by email
    const user = await User.findOne({ email })

    // If user not found, return an error
    if (!user) {
      return res
        .status(200)
        .json({ success: false, status: 404, message: 'User not found' })
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update user's password
    user.password = hashedPassword

    // Save the updated user
    await user.save()

    // Respond with success message
    return res
      .status(200)
      .json({
        success: true,
        status: 200,
        message: 'User password updated',
        userId: user._id
      })
  } catch (error) {
    console.error('Error updating password:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}


const validateEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_EMAIL_PASSWORD
      }
    });

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
    });

    console.log('Message sent: %s', info.messageId);
    console.log('The message was successfully sent');
    res.status(200).json({
      status: 200,
      message: 'Email verification message sent successfully'
    });
  } catch (error) {
    console.error('There was an error:', error.message);
    res.status(500).json({
      status: 500,
      message: `There was an error: ${error.message}`
    });
  }
}


module.exports = { Login, SignUp, logout, forgotPassword, changePassword,validateEmail }
