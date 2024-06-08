const express = require('express')

const Book = require('../models/Book.model')

function formatCurrentDate () {
  const now = new Date()

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }

  return now.toLocaleDateString('en-US', options)
}

const getBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ uploadedAt: -1 });

    if (!books.length)
      return res
        .status(404)
        .json({ status: 404, success: false, data: 'No books found' });

    return res.status(200).json({ status: 200, success: true, data: books });
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` });
  }
};


const getBooksByAuthors = async (req, res) => {
  try {
    const authorId = req.params.id
    const books = await Book.find({ author: authorId })

    if (!books.length) {
      return res.status(404).json({
        status: 404,
        success: true,
        data: 'No books found for this author'
      })
    }

    return res.status(200).json({
      status: 200,
      success: true,
      data: books
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}

const addBooks = async (req, res) => {
  try {
    const { title, author, price, description } = req.body

    const formattedDate = formatCurrentDate()

    const book = req.files['book'][0].filename

    const coverImage = req.files['coverImage'][0].filename

    if (!book || !coverImage) {
      return res.status(400).json({
        success: false,
        error: 'Both filename and coverImage are required.'
      })
    }
    const newBook = new Book({
      title,
      author,
      price,
      description,
      book,
      coverImage,
      uploadedAt: formattedDate
    })

    const savedBook = await newBook.save()

    return res.status(201).json({ status: 201, success: true, data: savedBook })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const getFileDetails = async (req, res) => {
  try {
    const bookFilename = req.files['book'][0].filename

    const coverImageFilename = req.files['coverImage'][0].filename

    console.log(`The book filename is ${bookFilename}`)

    console.log(`The book coverImage filename is ${coverImageFilename}`)
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const updateBookSales = async (req, res) => {
  try {
    const { id } = req.params

    const { sales } = req.body

    const user = await Book.findByIdAndUpdate(
      id,
      { $inc: { sales: sales } }, // Increment the existing sales by the new sales value
      { new: true } // To return the updated document
    )

    res.status(200).json({ success: true, data: user })
  } catch (error) {
    res.status(500).json({ status: 200, error: 'An error occurred' })
  }
}




// Define the controller function
const approveBook = async (req, res) => {
    try {
        const { authorId, bookId } = req.body; // Assuming you pass the authorId and bookId in the request body

        // Check if the user has the necessary permissions to approve the book
        // This could involve checking if the user is an admin or has specific roles/permissions
        // For simplicity, let's assume the user is authorized to approve the book

        // Find the book by ID
        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        // Check if the author ID matches the author of the book
        if (book.author.toString() !== authorId) {
            return res.status(403).json({ success: false, message: 'Unauthorized to approve this book' });
        }

        // Update the book document to set upproved field to true
        book.upproved = true;
        await book.save();

        // Return success response
        return res.status(200).json({ success: true, message: 'Book approved successfully' });
    } catch (error) {
        console.error(`Error approving book: ${error.message}`);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


const getApprovedBooks = async (req, res) => {
  try {
    const books = await Book.find({ upproved: true });

    if (!books.length) {
      return res.status(404).json({ status: 404, success: true, data: 'No approved books found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Approved books retrieved successfully',
      data: books
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}


const getNewRelease = async (req,res) =>{
  try {
    const books = await Book.find({ upproved: true }) 
        .populate('author', 'firstName secondName')
        .sort({ uploadedAt: -1 }) 
        .limit(10); 

    if(!books){
      res.status(200).json({
        status: 404,
        success:false,
        message:'No books'
    });
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: books
  });
} catch (error) {
    res.status(500).json({
        status: 500,
        success: false,
        message: 'Failed to fetch books',
        error: error.message
    });
}
}

const getBookWithHighestRating = async (req, res) => {
  try {
      const book = await Book.findOne({ upproved: true }) 
          .sort({ ratings: -1 })
          .limit(1); 
      if (!book) {
          return res.status(200).json({
              status: 404,
              success: false,
              message: 'No book found with the highest rating',
          });
      }

      res.status(200).json({
          status: 200,
          success: true,
          data: book,
      });
  } catch (error) {
      res.status(500).json({
          status: 500,
          success: false,
          message: 'Failed to fetch book with the highest rating',
          error: error.message,
      });
  }
};


module.exports = {
  getBooks,
  getBooksByAuthors,
  addBooks,
  getFileDetails,
  updateBookSales,
  approveBook,
  getApprovedBooks,
  getNewRelease,
  getBookWithHighestRating
}


