const mongoose = require("mongoose");

require("dotenv").config();




const connectDatabase =  async () =>{

    try{

        await mongoose.connect(process.env.database_connection)

        console.log("The database was connected successfully")

    }catch(err){

        console.log(`The database connection was not successfull:  ${err.message}`);

    }

}

module.exports = connectDatabase