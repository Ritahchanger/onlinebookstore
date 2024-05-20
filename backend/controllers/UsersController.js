const User = require('../models/User.model')

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

const updateUserRole = async () => {
  const { id } = req.params

  const { role } = req.body

  if (!['user', 'author', 'admin'].includes(role)) {
    return res
      .status(200)
      .json({ status: 400, message: 'Invalid role provided', success: false })
  }
  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(200).json({
        success: false,
        status: 404,
        message: 'User not found'
      })

      user.roles = [role]

      await user.save()

      return res
        .status(200)
        .json({ status: 200, message: `User role updated to ${role}` })
    }
  } catch (error) {}
}

module.exports = { getUsers, getAuthors, getAdmins, updateUserRole }
