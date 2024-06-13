const CartController = require('../controllers/CartController')

const router = require('express').Router()

router.post('/post', CartController.addCartItem)

router.get('/get/:id', CartController.getCartItems)

router.get('/', CartController.getAllCartItems)

router.delete(
  '/delete/cartItem/:userId/:cartItemId',
  CartController.deleteCartItem
)

router.post('/purchase/:userId', CartController.purchaseCart)

router.get('/purchase/:userId/get', CartController.getPurchasedItemsByUserId)

router.post('/success', async (req, res) => {
  const { bookIds } = req.body

  try {
    await CartController.updatePurchaseCount(bookIds)
    res.json({ success: true, message: 'Purchase count updated successfully' })
  } catch (error) {
    console.error('Failed to update purchase count:', error)
    res
      .status(500)
      .json({ success: false, message: 'Failed to update purchase count' })
  }
})

module.exports = router
