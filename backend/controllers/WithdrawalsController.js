const Withdrawal = require('../models/Withdrawals.model')

const updatePaypalEmail = async (req, res) => {
  const { id } = req.params
  const { paypalEmail } = req.body

  if (!paypalEmail) {
    return res.status(400).json({ error: 'PayPal email is required' })
  }

  if (!/\S+@\S+\.\S+/.test(paypalEmail)) {
    return res.status(400).json({ error: 'Invalid PayPal email format' })
  }

  try {
    const withdrawal = await Withdrawal.findById(id)

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
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'User ID is required'
      });
    }

    const withdrawalAccount = await Withdrawal.findOne({ user: userId });

    if (!withdrawalAccount) {
      const newWithdrawalAccount = new Withdrawal({
        user: userId
      });
      await newWithdrawalAccount.save();
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'Withdrawal account successfully created',
        withdrawal: newWithdrawalAccount
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Withdrawal account already exists',
      withdrawal: withdrawalAccount
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Server error',
      error: error.message
    });
  }
};
module.exports = { updatePaypalEmail,postUserId }
