const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price:{
    type:Number,
    required:true,
  },
  reviews: {
    type: Number,
    default: 0 
  },
  ratings: {
    type: Number,
    default: 0 
  },
  description: {
    type: String,
    required: true 
  },
  book: {
    type: String,
    required: true 
  },
  sales:{
    type:Number,
  },
  coverImage: {
    type: String,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now 
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
