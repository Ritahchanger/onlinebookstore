const Withdrawal = require('../models/Withdrawals.model')

const updatePaypalEmail = async (req, res) => {
  const { userId } = req.params
  const { paypalEmail } = req.body

  if (!paypalEmail) {
    return res.status(400).json({ error: 'PayPal email is required' })
  }

  if (!/\S+@\S+\.\S+/.test(paypalEmail)) {
    return res.status(400).json({ error: 'Invalid PayPal email format' })
  }

  try {
    const withdrawal = await Withdrawal.findOne({ user: userId })

    if (!withdrawal) {
      return res.status(404).json({ error: 'Withdrawal record not found' })
    }

    withdrawal.paypalEmail = paypalEmail

    await withdrawal.save()
    res
      .status(200)
      .json({ message: 'PayPal email updated successfully', withdrawal })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'PayPal email must be unique' })
    }
    res.status(500).json({ error: 'Server error' })
  }
}

// Adjust the path as needed

const postUserId = async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'User ID is required'
      })
    }

    const withdrawalAccount = await Withdrawal.findOne({ user: userId })

    if (!withdrawalAccount) {
      const newWithdrawalAccount = new Withdrawal({
        user: userId
      })
      await newWithdrawalAccount.save()
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Withdrawal account successfully created',
        withdrawal: newWithdrawalAccount
      })
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Withdrawal account already exists',
      withdrawal: withdrawalAccount
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Server error',
      error: error.message
    })
  }
}

const updateMpesaNumber = async (req, res) => {
  try {
    const { userId } = req.params
    const { mpesaNumber } = req.body

    // Validate input
    if (!userId) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'User ID is required'
      })
    }

    if (!mpesaNumber) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Mpesa number is required'
      })
    }

    // Find the withdrawal account by userId
    const withdrawalAccount = await Withdrawal.findOne({ user: userId })

    if (!withdrawalAccount) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Withdrawal account not found'
      })
    }
    // Update the Mpesa number
    withdrawalAccount.mpesaNumber = mpesaNumber
    await withdrawalAccount.save()

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Mpesa number updated successfully',
      withdrawal: withdrawalAccount
    })
  } catch (error) {
    console.log(`There was an error accessing the server! => ${error.message}`)
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Server error',
      error: error.message
    })
  }
}

const getPaymentDetails = async (req, res) => {
  try {
    const { userId } = req.params

    const withdrawal = await Withdrawal.findOne({ user: userId })
    if (!withdrawal) {
      return res.status(404).json({ message: 'Withdrawal details not found' })
    }

    const { paypalEmail, mpesaNumber } = withdrawal

    res.status(200).json({ paypalEmail, mpesaNumber })
  } catch (error) {
    console.error('Error fetching payment details:', error)
    res.status(500).json({ message: 'Failed to fetch payment details' })
  }
}

module.exports = { updatePaypalEmail, postUserId, updateMpesaNumber }
