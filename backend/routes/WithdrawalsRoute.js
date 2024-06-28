const router = require("express").Router()

const WithdrawalsController = require("../controllers/WithdrawalsController")



router.post('/post/:userId',WithdrawalsController.requestWithDrawal)

router.get('/get',WithdrawalsController.getWithDrawRequests)

router.delete('/delete/:id',WithdrawalsController.deleteWithdrawalById);









module.exports = router