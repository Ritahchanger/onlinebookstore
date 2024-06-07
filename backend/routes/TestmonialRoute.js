const router = require("express").Router()

const TestmonialController = require("../controllers/TestmonialController");




router.post('/post',TestmonialController.addTestmonial);

router.get('/get',TestmonialController.getTestmonials);



module.exports = router