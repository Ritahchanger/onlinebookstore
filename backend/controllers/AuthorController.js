const Book = require('../models/Book.model')

const User = require('../models/User.model')

const getBooksByAuthors = async (req, res) => {
  const authorId = req.params.id

  try {
    const books = await Book.find({ author: authorId })

    if (!books.length) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'No books found for this author'
      })
    }

    return res.status(200).json({
      status: 200,
      success: true,
      data: books
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params

    const author = await User.findById(id)

    if (!author) {
      return res
        .status(200)
        .json({ status: 404, success: false, data: 'Author Not found' })
    }
    return res.status(200).json({ status: 200, success: true, data: author })
  } catch (error) {
    console.log(
      `An error occurred in fetching data from the backend ${error.message}`
    )
  }
}

const getBooks = async (req, res) => {
  res.send('Hello')
}

module.exports = { getBooksByAuthors, getBooks, getAuthorById }
