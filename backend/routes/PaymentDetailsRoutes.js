const router = require('express').Router()

const PaymentDetailsController = require('../controllers/PaymentDetailsController')

router.put(
  '/update-paypal-email/:userId',
  PaymentDetailsController.updatePaypalEmail
)

router.post('/post', PaymentDetailsController.postUserId)

router.put(
  '/update-mpesa-phone-no/:userId',
  PaymentDetailsController.updateMpesaNumber
)

router.get(
  '/payment-details/:userId',
  PaymentDetailsController.getPaymentDetails
)

module.exports = router
