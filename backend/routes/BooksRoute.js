const router = require("express").Router();

const multer = require("multer");

const path = require("path")

const BookController = require("../controllers/BookController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDirectory = path.join(__dirname, '../uploads/');
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});
const upload = multer({ storage : storage });



router.post("/post", upload.array('files', 2), BookController.addBooks);




router.get('/',BookController.getBooks)
router.get('/authors/:id',BookController.getBooksByAuthors)






module.exports = router