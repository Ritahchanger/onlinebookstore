const mongoose = require("mongoose");


const BookSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author',
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    views:{
        type:Number,
        default:0
    }

})

const Book = mongoose.model("Book",BookSchema);

module.exports = Book;