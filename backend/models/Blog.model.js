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
    filePath:{
        type:String,
    },
    createdOn:{
        type:String
    }

})

const Blog = mongoose.model("Blog",BlogPostSchema);

module.exports = Blog