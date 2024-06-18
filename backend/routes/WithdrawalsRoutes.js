const router = require('express').Router()

const WithdrawalsController = require('../controllers/WithdrawalsController')

router.put(
  '/update-paypal-email/:userId',
  WithdrawalsController.updatePaypalEmail
)

router.post('/post', WithdrawalsController.postUserId)

router.put(
  '/update-mpesa-phone-no/:userId',
  WithdrawalsController.updateMpesaNumber
)

module.exports = router
