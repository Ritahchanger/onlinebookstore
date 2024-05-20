const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  booksTypes: {
    type: String,
    required: true
  },
  books: {
    type: [String],
    required: true
  }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
