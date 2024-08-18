const Withdrawal = require('../models/Withdrawals.model')
const User = require('../models/User.model')

const requestWithDrawal = async (req, res) => {

  try {

    const { userId } = req.params

    const { amount, mpesaNumber, paypalEmail } = req.body
    // Validate input
    if (!mpesaNumber && !paypalEmail) {

      return res.status(200).json({

        success: false,

        message: 'Please provide either mpesaNumber or paypalEmail'
        
      })
    }

    if (amount <= 0) {
      return res
        .status(200)
        .json({ success: false, message: 'Amount should be greater than zero' })
    }

    // Retrieve the user from database
    const user = await User.findById(userId)
    if (!user) {
      return res.status(200).json({ success: false, message: 'User not found' })
    }

    // Check if user has sufficient balance
    if (user.amount < amount) {
      return res
        .status(200)
        .json({ success: false, message: 'Insufficient balance' })
    }

    // Create withdrawal object
    const withdrawal = new Withdrawal({
      user: userId,
      amount,
      mpesaNumber,
      paypalEmail
    })

    // Save withdrawal to database
    await withdrawal.save()

    // Update user's balance
    user.amount -= amount
    await user.save()

    return res
      .status(200)
      .json({ success: true, message: 'Withdrawal request successful' })
  } catch (error) {
    console.error('Error requesting withdrawal:', error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

const getWithDrawRequests = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find({}).populate('user', 'firstName secondName passport');

    if (withdrawals.length === 0) {
      return res.status(200).json({status:400,success: false, message: "No withdrawals found in the system." });
    }

    res.status(200).json({status:200,success: true, data: withdrawals });

  } catch (error) {

    res.status(500).json({ success: false, message: "Server error. Unable to fetch withdrawal requests." });

  }
};

const deleteWithdrawalById = async (req, res) => {

  const withdrawalId = req.params.id; // Assuming the withdrawal ID is passed as a parameter
  
  try {
    // Find and delete the withdrawal by ID
    const deletedWithdrawal = await Withdrawal.findByIdAndDelete(withdrawalId);

    if (!deletedWithdrawal) {
      return res.status(200).json({status:200,success: false, message: "Withdrawal not found." });
    }

    res.status(200).json({status:200,success: true, message: `Withdrawal with ID ${withdrawalId} deleted successfully.` });
  } catch (error) {
    console.error("Error deleting withdrawal:", error.message);
    res.status(500).json({ success: false, message: "Server error. Unable to delete withdrawal." });
  }
};


module.exports = { requestWithDrawal,getWithDrawRequests,deleteWithdrawalById}
