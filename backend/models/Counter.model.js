const mongoose = require('mongoose');

// Counter Schema to keep track of the last user ID
const CounterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  seq: {
    type: Number,
    default: 0
  }
});

const Counter = mongoose.model('Counter', CounterSchema);

module.exports = Counter;
