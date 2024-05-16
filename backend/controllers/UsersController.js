const User = require('../models/User.model')

const getUsers = async (req, res) => {
  try {
    const users = await User.find({})

    if (!users)
      return res
        .status(200)
        .json({ status: 404, success: false, message: 'users not found' })

    return res.status(200).json({ success: true, data: users })
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message })
  }
}




module.exports = { getUsers }