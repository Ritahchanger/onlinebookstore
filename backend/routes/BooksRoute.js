const router = require("express").Router();

const BookController = require("../controllers/BookController")





router.get('/',BookController.getBooks)
router.get('/authors/:id',BookController.getBooksByAuthors)






module.exports = router