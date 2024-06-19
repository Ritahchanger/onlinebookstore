const router = require("express").Router()

const WithdrawalsController = require("../controllers/WithdrawalsController")



router.post('/post/:userId',WithdrawalsController.requestWithDrawal)










module.exports = router