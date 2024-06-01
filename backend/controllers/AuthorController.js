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
  try {
    // Aggregate to get total sales per author and their most selling book
    const result = await Book.aggregate([
      {
        $group: {
          _id: '$author',
          totalSales: { $sum: '$sales' },
          mostSellingBook: { $first: '$title' } // Get the first title as most selling book
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 10 }
    ])

    // Fetch users with selected fields
    const users = await User.find({}, 'firstName secondName username')

    // Create a map to store user information
    const authorMap = {}
    users.forEach(user => {
      authorMap[user._id] = {
        username: user.username,
        firstName: user.firstName,
        secondName: user.secondName
      }
    })

    result.forEach(author => {
      const user = authorMap[author._id]
      author.username = user.username
      author.firstName = user.firstName
      author.secondName = user.secondName
      author.mostSellingBookTitle = author.mostSellingBook
      delete author.mostSellingBook
    })

    res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error('Error retrieving most selling authors:', error)
    res.status(500).json({ status: 200, error: 'An error occurred' })
  }
}







module.exports = { getBooksByAuthors, getBooks, getAuthorById }
