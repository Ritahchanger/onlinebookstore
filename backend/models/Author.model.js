const express = require("express");
const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({

    user:{

        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
        
    }

})

const Author = mongoose.model("Author",authorSchema);

module.exports = Author;