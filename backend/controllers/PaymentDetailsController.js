const PaymentDetail = require('../models/PaymentDetails.model')

const User = require('../models/User.model')
const updatePaypalEmail = async (req, res) => {
  const { userId } = req.params;
  const { paypalEmail } = req.body;

  try {
    // Check if paypalEmail is provided
    if (!paypalEmail) {
      return res.status(400).json({ error: 'PayPal email is required' });
    }

    // Validate email format using regex
    if (!/\S+@\S+\.\S+/.test(paypalEmail)) {
      return res.status(400).json({ error: 'Invalid PayPal email format' });
    }

    // Find the PaymentDetail record for the given user
    const detail = await PaymentDetail.findOne({ user: userId });

    // If PaymentDetail record is not found, return 404 error
    if (!detail) {
      return res.status(404).json({ error: 'PaymentDetail record not found' });
    }

    // Check if the provided paypalEmail is already used by another user
    const existingDetail = await PaymentDetail.findOne({ paypalEmail });
    const userWithEmail = await User.findOne({ email: paypalEmail });

    // If the email is associated with the same user, update the PayPal email
    if (userWithEmail && userWithEmail._id.toString() === userId) {
      detail.paypalEmail = paypalEmail;

      // Save the updated detail
      await detail.save();

      // Return success message and updated detail
      return res.status(200).json({ message: 'PayPal email updated successfully', detail });
    }

    // If the email is associated with another user, return conflict error
    if (existingDetail && existingDetail.user.toString() !== userId) {
      return res.status(409).json({ error: 'PayPal email must be unique' });
    }

    if (userWithEmail && userWithEmail._id.toString() !== userId) {
      return res.status(409).json({ error: 'PayPal email must be unique' });
    }

    // Update the paypalEmail in the found PaymentDetail record
    detail.paypalEmail = paypalEmail;

    // Save the updated detail
    await detail.save();

    // Return success message and updated detail
    return res.status(200).json({ message: 'PayPal email updated successfully', detail });
  } catch (error) {
    // Handle MongoDB duplicate key error (code 11000)
    if (error.code === 11000) {
      return res.status(409).json({ error: 'PayPal email must be unique' });
    }

    // Handle other unexpected errors
    console.error('Error updating PayPal email:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

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

    const detail = await PaymentDetail.findOne({ user: userId })

    if (!detail) {
      const newWithdrawalAccount = new PaymentDetail({
        user: userId
      })
      await newWithdrawalAccount.save()
      return res.status(201).json({
        success: true,
        status: 201,
        message: 'PaymentDetail account successfully created',
        detail: newWithdrawalAccount
      })
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'PaymentDetail account already exists',
      detail: detail
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


const getPaymentDetails = async (req, res) => {
  try {
    const { userId } = req.params

    const detail = await PaymentDetail.findOne({ user: userId })
    if (!detail) {
      return res
        .status(404)
        .json({ message: 'PaymentDetail details not found' })
    }

    const { paypalEmail, mpesaNumber } = detail

    res.status(200).json({ paypalEmail, mpesaNumber })
  } catch (error) {
    console.error('Error fetching payment details:', error)
    res.status(500).json({ message: 'Failed to fetch payment details' })
  }
}

const updateMpesaNumber = async (req, res) => {
  const { userId } = req.params;
  const { mpesaNumber } = req.body;

  try {
    // Check if mpesaNumber is provided
    if (!mpesaNumber) {
      return res.status(400).json({ error: 'M-Pesa number is required' });
    }

    // Find the PaymentDetail record for the given user
    const detail = await PaymentDetail.findOne({ user: userId });

    // If PaymentDetail record is not found, return 404 error
    if (!detail) {
      return res.status(404).json({ error: 'PaymentDetail record not found' });
    }

    // Check if the provided mpesaNumber is already used by another user
    const existingDetail = await PaymentDetail.findOne({ mpesaNumber });
    const userWithPhoneNo = await User.findOne({ phoneNo: mpesaNumber });

    // Check if the mpesaNumber is associated with the same user
    if (userWithPhoneNo && userWithPhoneNo._id.toString() === userId) {
      detail.mpesaNumber = mpesaNumber;

      // Save the updated detail
      await detail.save();

      // Return success message and updated detail
      return res.status(200).json({ message: 'M-Pesa number updated successfully', detail });
    }

    // Check if the mpesaNumber is already used by another user
    if (existingDetail && existingDetail.user.toString() !== userId) {
      return res.status(409).json({ error: 'M-Pesa number must be unique' });
    }

    if (userWithPhoneNo && userWithPhoneNo._id.toString() !== userId) {
      return res.status(409).json({ error: 'M-Pesa number must be unique' });
    }

    // Update the mpesaNumber in the found PaymentDetail record
    detail.mpesaNumber = mpesaNumber;

    // Save the updated detail
    await detail.save();

    // Return success message and updated detail
    return res.status(200).json({ message: 'M-Pesa number updated successfully', detail });
  } catch (error) {
    // Handle MongoDB duplicate key error (code 11000)
    if (error.code === 11000) {
      return res.status(409).json({ error: 'M-Pesa number must be unique' });
    }

    // Handle other unexpected errors
    console.error('Error updating M-Pesa number:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  updatePaypalEmail,
  postUserId,
  updateMpesaNumber,
  getPaymentDetails
}
