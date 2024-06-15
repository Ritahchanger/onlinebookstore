const fs = require('fs')

const path = require('path')

const Book = require('../models/Book.model')

const uploadDirectory = path.join(__dirname, '../upload/authors/')

const User = require('../models/User.model')

const AccountTermination = require('../models/AccountTerminationModel')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const nodemailer = require('nodemailer')

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password') // Exclude the password field

    if (users.length === 0) {
      return res
        .status(404)
        .json({ status: 404, success: false, data: 'No users found' })
    }

    return res.status(200).json({ status: 200, success: true, data: users })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}

const getAuthors = async (req, res) => {
  try {
    const authors = await User.find({ roles: 'author' }).select('-password')

    if (authors.length === 0) {
      return res
        .status(404)
        .json({ status: 404, success: true, data: 'No authors found' })
    }

    return res.status(200).json({ status: 200, success: true, data: authors })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ roles: 'admin' }).select('-password')

    if (admins.length === 0) {
      return res
        .status(404)
        .json({ status: 404, success: true, data: 'No admins found' })
    }
    return res.status(200).json({ status: 200, success: true, data: authors })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}

const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params
    const { role } = req.body

    const user = await User.findById(id)

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'User not found in the system'
      })
    }

    const roles = ['admin', 'author', 'user']

    if (!roles.includes(role)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'The role is not found in the system'
      })
    }

    if (user.roles.includes(role)) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: `The user already has the ${role} role`
      })
    }

    user.roles.push(role)

    await user.save()

    return res.status(201).json({
      status: 201,
      success: true,
      message: `The user's role has been updated to ${role}`
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

const removeUserRole = async (req, res) => {
  try {
    const { id } = req.params
    const { role } = req.body

    const user = await User.findById(id)

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'User not found in the system'
      })
    }

    const roles = ['admin', 'author', 'user']

    if (!roles.includes(role)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'The role is not found in the system'
      })
    }

    if (!user.roles.includes(role)) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: `The user does not have the ${role} role`
      })
    }

    user.roles = user.roles.filter(r => r !== role)

    await user.save()

    return res.status(200).json({
      status: 200,
      success: true,
      message: `The ${role} role has been removed from the user`
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}



const updatePassport = async (req, res) => {
  const { id } = req.params

  const passport = req.file.filename

  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    if (user.passport) {
      const oldPassportPath = path.join(uploadDirectory, user.passport)

      fs.unlink(oldPassportPath, err => {
        if (err) {
          console.error('Error deleting old passport file:', err)
        }
      })
    }

    user.passport = passport

    await user.save()

    return res.status(200).json({
      success: true,
      message: 'Passport updated successfully',
      data: passport
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const singleUser = await User.findById(id).select(
      '-password -email  -phoneNo'
    )

    if (!singleUser) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: 'User not found' })
    }

    return res
      .status(200)
      .json({ status: 200, success: true, data: singleUser })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}
const getUserInformation = async (req, res) => {
  try {
    const { id } = req.params

    const singleUser = await User.findById(id)
    if (!singleUser) {
      return res
        .status(404)
        .json({ status: 404, success: false, message: 'User not found' })
    }

    return res
      .status(200)
      .json({ status: 200, success: true, data: singleUser })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const getUserCookie = (req, res) => {
  try {
    // Retrieve the user data cookie from the request
    const userDataCookie = req.cookies.token

    // Respond with the user data cookie
    res.status(200).json({ user: userDataCookie })
  } catch (err) {
    // If an error occurs, handle it and send an error response
    res.status(500).json({ success: false, error: err.message })
  }
}

// newsletter

const subscribe = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const user = await User.findOneAndUpdate(
      { email: email },
      { $set: { newsLetter: true } },
      { new: true }
    )

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res
      .status(200)
      .json({ message: 'Successfully subscribed to newsletter', user })
  } catch (error) {
    res.status(500).json({ success: false, error: err.message })
  }
}


const getSubscribedUsers = async (req, res) => {
  try {
    const subscribedUsers = await User.find({ newsLetter: true });

    if (!subscribedUsers.length) {
      return res.status(404).json({ message: 'No subscribed users found' });
    }

    res.status(200).json({ success: true, users: subscribedUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};


// newslleter

// Today

const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const userToDelete = await User.findById(id)

    if (!userToDelete) {
      return res
        .status(200)
        .json({ success: false, status: 404, message: 'User not found' })
    }

    const booksAuthored = await Book.find({ author: id })

    if (booksAuthored.length > 0) {
      await Book.deleteMany({ author: id })
    }

    await User.findByIdAndDelete(id)

    res.status(200).json({
      status: 200,
      success: true,
      message: 'User and their books deleted successfully'
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}

// Account Termination

const addAccountToTerminate = async (req, res) => {
  try {
    // Extract the required fields from the request body
    const { user, reason } = req.body

    // Create a new account termination record
    const newTerminationAccount = await AccountTermination.create({
      user: user, // Assuming 'user' contains the user ID
      reason: reason
    })

    // Return a success response
    return res.status(200).json({ success: true, data: newTerminationAccount })
  } catch (error) {
    // Return an error response if something goes wrong
    return res.status(500).json({ success: false, error: error.message })
  }
}

const getAccountsToTerminate = async (req, res) => {
  try {
    const accounts = await AccountTermination.find({}).populate(
      'user',
      'firstName secondName email'
    )

    if (!accounts) {
      return res.status(200).json({
        status: 404,
        success: false,
        message: 'There are no accounts for termination'
      })
    }

    return res.status(200).json({ status: 200, success: true, data: accounts })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const terminateAccount = async (req, res) => {
  try {
    const { id, terminationAccountId } = req.params

    const user = await User.findById(id)

    if (!user) {
      return res
        .status(200)
        .json({ status: 404, success: false, message: 'User not found!' })
    }
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
      to: user.email,
      subject: 'ACCOUNT TERMINATION',
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
              <p>The request to terminate your account has been received and account terminated successfully!</p>
              <p>Thank you for using BEMI EDITORS LIMITED</p>
              <p>You are still invited to use the system again!!</p>
            </div>
          </body>
        </html>
      `
    })

    await User.findByIdAndDelete(id)

    await AccountTermination.findByIdAndDelete(terminationAccountId)

    console.log('Message sent: %s', info.messageId)

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'The account terminated successfully'
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

// USER UPDATES

const updateUserContact = async (req, res) => {
  try {
    const { id } = req.params
    const { phoneNo } = req.body

    const user = await User.findById(id)

    if (!user) {
      return res
        .status(200)
        .json({ status: 404, success: false, error: `User not found` })
    }

    // Basic validation for phone number format
    if (!phoneNo || !/^\d{10}$/.test(phoneNo)) {
      return res.status(200).json({
        status: 400,
        success: false,
        error: 'Invalid phone number format'
      })
    }

    user.phoneNo = phoneNo
    await user.save()

    return res.status(200).json({
      status: 200,
      success: true,
      message: 'Phone updated successfully'
    })
  } catch (error) {
    console.error('Error updating user phone:', error)
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}

// UDATE USER PASSWORD

const updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body
  const { id } = req.params // Assuming you have middleware to extract user ID from JWT

  try {
    // Find the user by ID
    const user = await User.findById(id)

    // Check if the user exists
    if (!user) {
      return res
        .status(200)
        .json({ status: 404, success: false, message: 'User not found' })
    }

    // Verify the current password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password)
    if (!passwordMatch) {
      return res.status(200).json({
        status: 400,
        success: false,
        message: 'Incorrect current password',
        passwordDontMatch: true
      })
    }

    // Generate a hash for the new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10)

    // Update the user's password
    user.password = newPasswordHash
    await user.save()

    return res
      .status(200)
      .json({ success: true, message: 'Password updated successfully' })
  } catch (error) {
    console.error('Error updating password:', error)
    return res
      .status(500)
      .json({ success: false, error: 'Internal server error' })
  }
}

const updateNames = async (req, res) => {
  const { id } = req.params
  const { firstName, secondName } = req.body

  try {
    // Find the user by ID
    const user = await User.findById(id)

    if (!user) {
      return res.status(200).json({
        status: 404,
        success: false,
        message: 'User not found'
      })
    }

    // Update fields if provided in the request body
    if (firstName) {
      user.firstName = firstName
    }
    if (secondName) {
      user.secondName = secondName
    }

    // Save the updated user information
    await user.save()

    res.status(200).json({
      success: true,
      message: 'User information updated successfully',
      data: user
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const updateEmail = async (req, res) => {
  try {
    const { currentEmail, newEmail } = req.body

    const { id } = req.params

    const findUser = await User.findOne({ _id: id })

    if (findUser.email !== currentEmail) {
      return res.status(200).json({
        status: 404,
        success: false,
        message: 'Wrong email'
      })
    }
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
      to: currentEmail,
      subject: 'EMAIL CHANGE',
      text: 'EMAIL CHANGE VERIFICATION',
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
              p a:hover {
                background-color: #45a049;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Password Reset Request</h1>
              <p>Please click the button below to authenticate email change</p>
              <p><a href='${process.env.FRONT_END_URL}/profile/${currentEmail}/user_id/:${findUser.userId}'>VERIFY</a></p>
            </div>
          </body>
        </html>
      `
    })

    console.log('Message sent: %s', info.messageId)

    res.status(200).json({
      success: true,
      message: 'User email updated successfully'
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

const changeEmail = async (req, res) => {
  const { userId } = req.params
  const { newEmail } = req.body // Assuming new email is sent in the request body

  try {
    // Find user by ID and update email
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email: newEmail },
      { new: true } // To return the updated user document
    )

    if (!updatedUser) {
      return res.status(200).json({ success: false, message: 'User not found' })
    }

    return res.status(200).json({
      success: true,
      message: 'User email updated successfully',
      user: updatedUser
    })
  } catch (error) {
    console.error(`Error updating user email: ${error.message}`)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

const updateUserDescription = async (req, res) => {
  const { userId } = req.params
  const { description } = req.body

  try {
    // Attempt to find the user by userId
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found. Unable to update description.'
      })
    }

    // Update the user's description
    user.description = description

    // Save the updated user document
    await user.save()

    return res.status(200).json({
      success: true,
      message: 'User description updated successfully.',
      data: user
    })
  } catch (error) {
    console.error('Error updating user description:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to update user description. Please try again later.'
    })
  }
}

module.exports = {
  getUsers,
  getAuthors,
  getAdmins,
  updateUserRole,
  updatePassport,
  getUserById,
  deleteUser,
  getUserCookie,
  addAccountToTerminate,
  terminateAccount,
  getAccountsToTerminate,
  terminateAccount,
  updateUserContact,
  updatePassword,
  updateNames,
  updateEmail,
  getUserInformation,
  updateUserDescription,
  changeEmail,
  subscribe,
  getSubscribedUsers,
  removeUserRole
}
