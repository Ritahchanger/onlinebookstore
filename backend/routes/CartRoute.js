const CartController = require("../controllers/CartController");

const router = require("express").Router();



router.post('/post',CartController.addCartItem);

router.get('/get/:id',CartController.getCartItems);

router.get('/',CartController.getAllCartItems);


router.delete('/delete/cartItem/:userId/:cartItemId',CartController.deleteCartItem);

router.post('/purchase/:userId',CartController.purchaseCart);


router.get('/purchase/:userId/get',CartController.getPurchasedItemsByUserId);



module.exports = router