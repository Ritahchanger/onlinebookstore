const mongoose = require("mongoose");

const BlogPostSchema = mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})

const Blog = mongoose.model("Blog",BlogPostSchema);

module.exports = Blog