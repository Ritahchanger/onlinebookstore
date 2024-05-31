const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      addedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart
