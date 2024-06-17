const router = require('express').Router()

const WithdrawalsController = require("../controllers/WithdrawalsController")


router.put('/update-paypal-email/:id',WithdrawalsController.updatePaypalEmail)

router.post('/post',WithdrawalsController.postUserId)

module.exports = router
