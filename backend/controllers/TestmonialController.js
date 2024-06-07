const Testmonial = require('../models/TestmonialsModel')

const User = require('../models/User.model')

const addTestmonial = async (req, res) => {
  try {
    const { user, description } = req.body

    // Check if there is already a testimonial with the same user ID
    const existingTestimonial = await Testmonial.findOne({ user })

    if (existingTestimonial) {
      return res.status(200).json({
        success: false,
        status: 400,
        message: 'Testimonial already exists for this user',
        userTestfied: true
      })
    }

    const theUser = await User.findOne({ _id: user })

    // Create a new Testimonial
    const newTestimonial = new Testmonial({
      user,
      firstName: theUser.firstName,
      secondName: theUser.secondName,
      description,
      passport: theUser.passport
    })

    // Save the testimonial to the database
    const savedTestimonial = await newTestimonial.save()

    res.status(200).json({
      success: true,
      status: 201,
      message: 'Testimonial added successfully!',
      testmonial: savedTestimonial
    })
  } catch (error) {
    res.status(500).json({
      message: 'Failed to add testimonial',
      error: error.message
    })
  }
}

const getTestmonials = async (req, res) => {
  try {
    const testmonials = await Testmonial.find({})

    if (!testmonials) {
      return res
        .status(200)
        .json({ status: 404, success: false, data: testmonials })
    }
    return res
      .status(200)
      .json({ status: 200, success: true, data: testmonials })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = { addTestmonial, getTestmonials }
