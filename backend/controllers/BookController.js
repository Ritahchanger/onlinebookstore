const express = require('express')

const Book = require('../models/Book.model')

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({})

    if (!books)
      return res
        .status(404)
        .json({ status: 404, success: false, data: 'No books found' })

    return res.status(200).json({ status: 200, success: true, data: books })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}

const getBooksByAuthors = async (req, res) => {
    try {
      const authorId = req.params.id;
  
      const books = await Book.find({ author: authorId });
  
      if (books.length === 0) {
        return res
          .status(404)
          .json({
            status: 404,
            success: true,
            data: 'No books found for this author'
          });
      }
  
      return res
        .status(200)
        .json({
          status: 200,
          success: true,
          data: books
        });
    } catch (error) {
      return res.status(500).json({ success: false, error: `${error.message}` });
    }
  }


const addBooks = async () =>{

    try{

    }catch(error){
        return res.status(500).json({ success: false, error: `${error.message}` });
    }

}

module.exports = { getBooks, getBooksByAuthors }
