const mongoose = require("mongoose");
const initializeCounter = require("../utils/initializeCounter")
require("dotenv").config();

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("The database was connected successfully");

    // Initialize the counter
    await initializeCounter();
  } catch (err) {
    console.log(`The database connection was not successful: ${err.message}`);
  }
};

module.exports = connectDatabase;
