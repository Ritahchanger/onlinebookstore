const CartController = require("../controllers/CartController");

const router = require("express").Router();



router.post('/post',CartController.addCartItem);

router.get('/:id',CartController.getCartItems);



module.exports = router