const express = require('express')
const router = express.Router()

const axios = require('axios')

require('dotenv').config()

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env
const base = 'https://api-m.sandbox.paypal.com'

const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error('MISSING_API_CREDENTIALS')
    }
    const auth = Buffer.from(
      `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`
    ).toString('base64')
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: 'POST',
      body: 'grant_type=client_credentials',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('Failed to generate Access Token:', error)
  }
}

const createOrder = async (req, res) => {
  try {
    const { cost, description } = req.body

    // Validate the request body
    if (!cost || !description) {
      return res.status(400).json({ error: 'Missing required fields.' })
    }

    console.log(
      'Shopping data information passed from the frontend createOrder() callback:',
      req.body
    )

    const accessToken = await generateAccessToken()
    const url = `${base}/v2/checkout/orders`
    const payload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: cost
          },
          description: description
        }
      ],

      application_context: {
        return_url: `{${process.env.FRONT_END_URL}/account}`,
        cancel_url: `${process.env.FRONT_END_URL}/cancel-order`,
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        brand_name: 'BEMI EDITORS AND PUBLISHERS LIMITED'
      }
    }

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })

    const jsonResponse = await response.json()
    res.status(response.status).json(jsonResponse)
  } catch (error) {
    console.error('Failed to create order:', error)
    res.status(500).json({ error: 'Failed to create order.' })
  }
}

const capturePayment = async (orderId) => {
  try {
    // Generate access token
    const access_token = await generateAccessToken();

    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    const response = await axios.post(
      url,
      {}, // Empty data object since no data is being sent
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );

    // Return response data
    return response.data;
  } catch (error) {
    // Handle errors
    console.error("Error capturing payment:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Route to complete an order by capturing payment
router.post('/complete-order', async (req, res) => {
  try {

    // Capture payment for the specified order
    await capturePayment(req.body.token);

    // Respond with success message
    res.status(200).json({ message: "Products purchased successfully" });
  } catch (error) {
    // Handle errors and respond with error message
    res.status(500).json({ message: error.message });
  }
});


router.post('/orders', createOrder)

module.exports = router
