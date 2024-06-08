const Book = require('../models/Book.model')

const User = require('../models/User.model')

const getBooksByAuthors = async (req, res) => {
  const authorId = req.params.id

  try {

    const books = await Book.find({}).sort({ uploadedAt: -1 });

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



const getUnapprovedBooksByAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const unapprovedBooks = await Book.find({ author:id, upproved: false });

    if (!unapprovedBooks.length) {
      return res.status(404).json({ status: 404, success: false, message: 'No unapproved books found for this author' });
    }

    return res.status(200).json({ status: 200, success: true, data: unapprovedBooks });
  } catch (error) {
    return res.status(500).json({ status: 500, success: false, error: error.message });
  }
};

const getApprovedBooksByAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const unapprovedBooks = await Book.find({ author:id, upproved: true });

    if (!unapprovedBooks.length) {
      return res.status(404).json({ status: 404, success: false, message: 'No Approved books found for this author' });
    }

    return res.status(200).json({ status: 200, success: true, data: unapprovedBooks });
  } catch (error) {
    return res.status(500).json({ status: 500, success: false, error: error.message });
  }
};

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

// const getBooks = async (req, res) => {
//   try {
    
//     const result = await Book.aggregate([
//       {
//         $group: {
//           _id: '$author',
//           totalSales: { $sum: '$sales' },
//           mostSellingBook: { $first: '$title' } // Get the first title as most selling book
//         }
//       },
//       { $sort: { totalSales: -1 } },
//       { $limit: 10 }
//     ])

//     // Fetch users with selected fields
//     const users = await User.find({}, 'firstName secondName username')

//     // Create a map to store user information
//     const authorMap = {}
//     users.forEach(user => {
//       authorMap[user._id] = {
//         username: user.username,
//         firstName: user.firstName,
//         secondName: user.secondName
//       }
//     })

//     result.forEach(author => {
//       const user = authorMap[author._id]
//       author.username = user.username
//       author.firstName = user.firstName
//       author.secondName = user.secondName
//       author.mostSellingBookTitle = author.mostSellingBook
//       delete author.mostSellingBook
//     })

//     res.status(200).json({ success: true, data: result })
//   } catch (error) {
//     console.error('Error retrieving most selling authors:', error)
//     res.status(500).json({ status: 200, error: 'An error occurred' })
//   }
// }


const getBooks = async (req, res) => {
  try {
    // Aggregate books by author to find the total sales and the most selling book
    const result = await Book.aggregate([
      {
        $group: {
          _id: '$author',
          totalSales: { $sum: '$sales' },
          mostSellingBook: { $first: '$title' }, // Get the first title as most selling book
          mostSellingBookDetails: { $first: '$$ROOT' } // Get the first book document for details
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 10 }
    ]);

    // Fetch users with selected fields
    const users = await User.find({}, 'firstName secondName username');

    // Create a map to store user information
    const authorMap = {};
    users.forEach(user => {
      authorMap[user._id.toString()] = {
        username: user.username,
        firstName: user.firstName,
        secondName: user.secondName
      };
    });

    // Populate result with user information and book details
    result.forEach(author => {
      const user = authorMap[author._id.toString()];
      if (user) {
        author.username = user.username;
        author.firstName = user.firstName;
        author.secondName = user.secondName;
        author.mostSellingBookId=author.mostSellingBookDetails._id;
        author.mostSellingBookTitle = author.mostSellingBookDetails.title;
        author.mostSellingBookPrice = author.mostSellingBookDetails.price;
        author.mostSellingBookCoverImage = author.mostSellingBookDetails.coverImage;
        author.mostSellingBookDescription = author.mostSellingBookDetails.description;
      }
      delete author.mostSellingBookDetails;
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('Error retrieving most selling authors:', error);
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
};








module.exports = { getBooksByAuthors, getBooks, getAuthorById,getUnapprovedBooksByAuthor,getApprovedBooksByAuthor}
