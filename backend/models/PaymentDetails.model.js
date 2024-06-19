const mongoose = require('mongoose');

const PaymentDetailsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, 
  requestTime: {
    type: Date,
    default: Date.now
  },
  mpesaNumber: {
    type: String,
    unique: true,
  },
  paypalEmail: {
    type: String,
    unique: true,
  },
});

const PaymentDetail = mongoose.model('PaymentDetail', PaymentDetailsSchema);

module.exports = PaymentDetail;
