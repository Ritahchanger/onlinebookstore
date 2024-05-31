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
    const books = await Book.find({})

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
    const { title, author, price, reviews, ratings, description } = req.body

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
      reviews,
      ratings,
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

module.exports = { getBooks, getBooksByAuthors, addBooks, getFileDetails }
