const express = require('express')
const User = require('../models/User.model')
const Book = require('../models/Book.model')

const path = require('path')

const uploadDirectory = path.join(__dirname, '../upload/books/')

const nodemailer = require('nodemailer')

const fs = require('fs')

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
    const books = await Book.find({})
      .populate('author', 'firstName secondName')
      .sort({ uploadedAt: -1 })

    if (!books.length)
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
    const { title, author, price, description, category } = req.body

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
      category,
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
    const { authorId, bookId } = req.body // Assuming you pass the authorId and bookId in the request body

    // Check if the user has the necessary permissions to approve the book
    // This could involve checking if the user is an admin or has specific roles/permissions
    // For simplicity, let's assume the user is authorized to approve the book

    // Find the book by ID
    const book = await Book.findById(bookId)

    if (!book) {
      return res.status(404).json({ success: false, message: 'Book not found' })
    }

    // Check if the author ID matches the author of the book
    if (book.author.toString() !== authorId) {
      return res
        .status(403)
        .json({ success: false, message: 'Unauthorized to approve this book' })
    }

    // Update the book document to set upproved field to true
    book.upproved = true
    await book.save()

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: 'Book approved successfully' })
  } catch (error) {
    console.error(`Error approving book: ${error.message}`)
    return res
      .status(500)
      .json({ success: false, message: 'Internal server error' })
  }
}

const getApprovedBooks = async (req, res) => {
  try {
    const books = await Book.find({ upproved: true })

    if (!books.length) {
      return res
        .status(404)
        .json({ status: 404, success: true, data: 'No approved books found' })
    }

    return res.status(200).json({
      success: true,
      message: 'Approved books retrieved successfully',
      data: books
    })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

const getNewRelease = async (req, res) => {
  try {
    const books = await Book.find({ upproved: true })
      .populate('author', 'firstName secondName')
      .sort({ uploadedAt: -1 })
      .limit(10)

    if (!books) {
      res.status(200).json({
        status: 404,
        success: false,
        message: 'No books'
      })
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: books
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to fetch books',
      error: error.message
    })
  }
}

const getBookWithHighestRating = async (req, res) => {
  try {
    const book = await Book.findOne({ upproved: true })
      .sort({ ratings: -1 })
      .limit(1)
    if (!book) {
      return res.status(200).json({
        status: 404,
        success: false,
        message: 'No book found with the highest rating'
      })
    }

    res.status(200).json({
      status: 200,
      success: true,
      data: book
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Failed to fetch book with the highest rating',
      error: error.message
    })
  }
}

const getBooksByCategory = async (req, res) => {
  const { category } = req.params
  try {
    // Find approved books by category
    const books = await Book.find({ category, upproved: true })

    if (!books) {
      res.status(200).json({ status: 404, success: true, message: 'No books' })
    }

    res.status(200).json({ success: true, data: books })
  } catch (error) {
    console.error(`Error fetching books by category: ${error}`)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

const getAllUnapproved = async (req, res) => {
  try {
    const unapprovedBooks = await Book.find({ upproved: false }).populate(
      'author',
      'firstName secondName'
    )
    if (!unapprovedBooks) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'Books not fetched'
      })
    }
    res.status(200).json({
      status: 200,
      success: true,
      data: unapprovedBooks
    })
  } catch (error) {
    res.status(500).json({
      status: 500,
      success: false,
      message: 'Server Error',
      error: error.message
    })
  }
}

// DELETE BOOK

const deleteBook = async (req, res) => {
  try {
    const { id, userId } = req.params

    // Fetch the user by userId (assuming you have a User model)
    const user = await User.findById(userId)

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No such user with the provided userId'
      })
    }

    // Find the book by ID
    const bookToDelete = await Book.findById(id)

    // Check if the book exists
    if (!bookToDelete) {
      return res.status(404).json({
        success: false,
        message: 'No such book with the provided Id'
      })
    }

    // Delete the cover image if it exists
    if (bookToDelete.coverImage) {
      const coverImagePath = path.join(uploadDirectory, bookToDelete.coverImage)
      try {
        await fs.promises.unlink(coverImagePath)
        console.log(`Deleted cover image: ${coverImagePath}`)
      } catch (error) {
        console.error(`Error deleting cover image ${coverImagePath}:`, error)
        // Continue with deletion even if file deletion fails
      }
    }

    // Delete the book file (PDF) if it exists
    if (bookToDelete.book) {
      const bookFilePath = path.join(uploadDirectory, bookToDelete.book)
      try {
        await fs.promises.unlink(bookFilePath)
        console.log(`Deleted book file: ${bookFilePath}`)
      } catch (error) {
        console.error(`Error deleting book file ${bookFilePath}:`, error)
        // Continue with deletion even if file deletion fails
      }
    }

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.COMPANY_EMAIL,
        pass: process.env.COMPANY_EMAIL_PASSWORD
      }
    })

    // Send email to the user
    const info = await transporter.sendMail({
      from: '"BEMI EDITORS LIMITED" <peterdennis573@gmail.com>',
      to: user.email,
      subject: 'RESPONSE TO BOOK DELETION',
      text: 'Book deletion alert!',
      html: `
        <html>
          <head>
            <style>
              /* CSS styles */
              body {
                font-family: Arial, sans-serif;
                font-size: 16px;
              }
              .container {
                margin: 20px;
                padding: 20px;
                border: 1px solid #ccc;
                border-radius: 5px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
                margin-bottom: 20px;
              }
              p {
                margin-bottom: 10px;
              }
              a {
                display: inline-block;
                background-color: #4CAF50;
                color: #fff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
              }
              a:hover {
                background-color: #45a049;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>BOOK DELETION NOTIFICATION</h1>
              <p>The book "${bookToDelete.title}" has been deleted from our system.This is because the book does not coincide with our rules and laws that govern publishing and editing of books and also industial standards</p>
              <p>Thank you.</p>
            </div>
          </body>
        </html>
      `
    })

    console.log('Message sent: %s', info.messageId)
    console.log('The message was successfully sent')

    // Delete the book from the database
    await Book.findByIdAndDelete(id)

    return res.status(200).json({
      success: true,
      message: 'Book and associated files deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting book:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
}

module.exports = {
  getBooks,
  getBooksByAuthors,
  addBooks,
  getFileDetails,
  updateBookSales,
  approveBook,
  getApprovedBooks,
  getNewRelease,
  getBookWithHighestRating,
  getBooksByCategory,
  getAllUnapproved,
  deleteBook
}
