const router = require("express").Router();

const multer = require("multer");

const path = require("path");


const BlogController = require("../controllers/BlogController");

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


router.post('/post',upload.single('file'),BlogController.postBlogs);



router.get('/get',BlogController.getBlogs)


router.delete('/delete/:id',BlogController.deleteBlog)






module.exports = router;