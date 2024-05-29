const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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
  filePath: {
    type: String,
    required: true 
  },
  coverImage: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  uploadedAt: {
    type: Date,
    default: Date.now 
  }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
