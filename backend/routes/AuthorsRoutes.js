const router = require("express").Router()

const AuthorController = require("../controllers/AuthorController");



router.get('/books/:id',AuthorController.getBooksByAuthors)
router.get('/books/',AuthorController.getBooks)
router.get('/books/',AuthorController.getBooks)

router.get('/:id',AuthorController.getAuthorById)





module.exports = router