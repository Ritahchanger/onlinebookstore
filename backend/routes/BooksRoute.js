const router = require("express").Router();

const multer = require("multer");

const path = require("path")

const BookController = require("../controllers/BookController")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // const uploadDirectory = path.join(__dirname, '../uploads/');
        const uploadDirectory = path.join(__dirname, '../upload/books/');
        cb(null, uploadDirectory);
    },
    
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});
const upload = multer({ storage : storage });



router.post("/add", upload.fields([{name:'book',maxCount:1},{name:'coverImage',maxCount:1}]),BookController.addBooks);

router.get('/',BookController.getBooks)


router.post('/', upload.fields([{ name: 'book', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }]), BookController.getFileDetails);


router.get('/authors/:id',BookController.getBooksByAuthors)

router.post('/:id/update_sales',BookController.updateBookSales)






module.exports = router