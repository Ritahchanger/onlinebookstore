const Cart = require('../models/CartModel')

const PurchasedItem = require("../models/Purchase.model")

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
            return res.status(200).json({status:400, success: false, error: "User ID is required" });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId }).populate("items.productId");

        // Check if the cart exists
        if (!cart) {
            return res.status(200).json({ status:404, success: false, error: "Cart not found" });
        }

        // Return the cart items
        return res.status(200).json({ success: true, items: cart.items });
    } catch (error) {
        // Handle errors
        return res.status(500).json({ success: false, error: error.message });
    }


}

const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({});

    if (cartItems.length === 0) {
      return res
        .status(404)
        .json({ status: 404, success: true, data: 'No cartItems found' })
    }

    return res.status(200).json({ status: 200, success: true, data: cartItems })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}


const deleteCartItem = async (req, res) => {
  try {
    const { userId, cartItemId } = req.params;

    // Check if the user ID and cart item ID are provided
    if (!userId || !cartItemId) {
      return res.status(400).json({ success: false, error: 'User ID and cart item ID are required' });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, error: 'Cart not found' });
    }

    // Find the index of the cart item in the user's cart
    const itemIndex = cart.items.findIndex(item => item._id.equals(cartItemId));

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, error: 'Cart item not found in the user\'s cart' });
    }

    // Remove the cart item from the user's cart
    cart.items.splice(itemIndex, 1);

    // Save the updated cart
    await cart.save();

    return res.status(200).json({ success: true, message: 'Cart item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

};

const purchaseCart = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart is empty or does not exist' });
    }

    // Move cart items to the PurchasedItems collection
    const purchasedItems = new PurchasedItem({
      userId,
      items: cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        addedAt: item.addedAt
      }))
    });

    await purchasedItems.save();

    // Delete the cart
    await Cart.deleteOne({ userId });

    return res.status(200).json({ success: true, message: 'Purchase successful and cart deleted', purchasedItems });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }

};


const getPurchasedItemsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ success: false, error: 'User ID is required' });
    }

    // Find all purchased items for the specified userId and populate the book details
    const purchasedItems = await PurchasedItem.find({ userId }).populate({
      path: 'items.productId',
      model: 'Book', // Specify the model name
      select: 'title description coverImage book', // Select fields to populate
    });

    if (!purchasedItems || purchasedItems.length === 0) {
      return res.status(404).json({ success: false, error: 'No purchased items found for the specified user' });
    }

    return res.status(200).json({ success: true, data: purchasedItems });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};







module.exports = { addCartItem ,getCartItems,getAllCartItems,deleteCartItem,purchaseCart,getPurchasedItemsByUserId};
