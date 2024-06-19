const Withdrawal = require('../models/Withdrawals.model');
const User = require('../models/User.model');

const requestWithDrawal = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, mpesaNumber, paypalEmail } = req.body;

    // Validate input
    if (!mpesaNumber && !paypalEmail) {
      return res.status(400).json({ success: false, message: 'Please provide either mpesaNumber or paypalEmail' });
    }

    if (amount <= 0) {
      return res.status(400).json({ success: false, message: 'Amount should be greater than zero' });
    }

    // Retrieve the user from database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if user has sufficient balance
    if (user.amount < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }

    // Create withdrawal object
    const withdrawal = new Withdrawal({
      user: userId,
      amount,
      mpesaNumber,
      paypalEmail,
    });

    // Save withdrawal to database
    await withdrawal.save();

    // Update user's balance
    user.amount -= amount;
    await user.save();

    return res.status(200).json({ success: true, message: 'Withdrawal request successful' });
  } catch (error) {
    console.error('Error requesting withdrawal:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { requestWithDrawal };
