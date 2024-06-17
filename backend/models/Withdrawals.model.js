const mongoose = require('mongoose');

const WithdrawalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  requestTime: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
  },
  mpesaNumber: {
    type: String,
    unique: true,
  },
  paypalEmail: {
    type: String,
    unique: true,
  },
  isPaymentConfirmed: {
    type: Boolean,
    default: false
  }
});

const Withdrawal = mongoose.model('Withdrawal', WithdrawalSchema);

module.exports = Withdrawal;
