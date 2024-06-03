const router = require("express").Router()

const AuthorController = require("../controllers/AuthorController");



router.get('/books/:id',AuthorController.getBooksByAuthors)

router.get('/books/unapproved/:id',AuthorController.getUnapprovedBooksByAuthor)

router.get('/books/approved/:id',AuthorController.getApprovedBooksByAuthor)

router.get('/selling/books/',AuthorController.getBooks)

router.get('/:id',AuthorController.getAuthorById)

module.exports = router