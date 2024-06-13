const Counter = require('../models/Counter.model');

async function initializeCounter() {
  const counter = await Counter.findOne({ name: 'userId' });
  if (!counter) {
    await new Counter({ name: 'userId', seq: 0 }).save();
  }
}

module.exports = initializeCounter;
