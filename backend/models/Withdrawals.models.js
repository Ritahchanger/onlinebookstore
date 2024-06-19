const mongoose = require('mongoose');

const WithdrawalSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  requestedTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
    required: true,
  },
  mpesaNumber: {
    type: String,
  },
  paypalEmail: {
    type: String,
  },
});

const Withdrawal = mongoose.model('Withdrawal', WithdrawalSchema);

module.exports = Withdrawal; // Export the model, not the schema
