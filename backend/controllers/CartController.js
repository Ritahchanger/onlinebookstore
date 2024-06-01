const Cart = require('../models/CartModel')

const addCartItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body

    // Check if the required data is provided

    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ success: false, error: 'Missing required fields' })
    }

    // Find the user's cart or create a new one if it doesn't exist
    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({ userId, items: [] })
    }

    // Check if the product already exists in the cart
    const existingItemIndex = cart.items.findIndex(item =>
      item.productId.equals(productId)
    )
    if (existingItemIndex !== -1) {
      // If the product already exists, update its quantity
      cart.items[existingItemIndex].quantity += quantity
    } else {
      // If the product doesn't exist, add it to the cart
      cart.items.push({ productId, quantity })
    }

    // Save the updated cart
    await cart.save()

    return res.status(201).json({ success: true, cart })
  } catch (error) {

    return res.status(500).json({ success: false, error: error.message })


  }


}


const getCartItems = async (req, res) => {
    try {
        // Extract user ID from request
        const userId = req.params.id;

        // Check if the user ID is provided
        if (!userId) {
            return res.status(400).json({ success: false, error: "User ID is required" });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        // Check if the cart exists
        if (!cart) {
            return res.status(404).json({ success: false, error: "Cart not found" });
        }

        // Return the cart items
        return res.status(200).json({ success: true, items: cart.items });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ success: false, error: error.message });
    }
}

module.exports = { addCartItem ,getCartItems};
