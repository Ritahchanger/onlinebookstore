const router = require("express").Router()

const NewsLetterController = require("../controllers/NewsLetterController");


router.post('/',NewsLetterController.sendBulkEmail)




module.exports = router;