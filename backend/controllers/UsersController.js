const User = require('../models/User.model')

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password') // Exclude the password field

    if (users.length === 0) {
      return res
        .status(404)
        .json({ status: 404, success: false, data: 'No users found' })
    }

    return res.status(200).json({ status: 200, success: true, data: users })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}

const getAuthors = async (req, res) => {
  try {
    const authors = await User.find({ roles: 'author' }).select('-password')

    if (authors.length === 0) {
      return res
        .status(404)
        .json({ status: 404, success: true, data: 'No authors found' })
    }

    return res.status(200).json({ status: 200, success: true, data: authors })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}

const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ roles: 'admin' }).select('-password')

    if (admins.length === 0) {
      return res
        .status(404)
        .json({ status: 404, success: true, data: 'No admins found' })
    }
    return res.status(200).json({ status: 200, success: true, data: authors })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}



const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'User not found in the system'
      });
    }

    const roles = ['admin', 'author', 'user'];

    if (!roles.includes(role)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'The role is not found in the system'
      });
    }

    if (user.roles.includes(role)) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: `The user already has the ${role} role`
      });
    }

    user.roles.push(role);

    await user.save();

    return res.status(201).json({
      status: 201,
      success: true,
      message: `The user's role has been updated to ${role}`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};



const updatePassport = async (req, res) => {
  
  const { id } = req.params

  const passport = req.file.filename
  try {
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    user.passport = passport

    await user.save()

    return res
      .status(200)
      .json({ success: true, message: 'Passport updated successfully' })
  } catch (error) {

    return res.status(500).json({ success: false, error: `${error.message}` })

  }
}



const getUserById = async (req,res) =>{


  try{

    const { id } = req.params;

    const singleUser = await User.findById(id);

    if(!singleUser){

      return res.status(200).json({status:404, success:false, message:'User not found' })

    }

    return res.status(200).json({status:200, success: true, data:singleUser });


  }catch(error){
    return res.status(500).json({ success: false, error: `${error.message}` })
  }

}


module.exports = {
  getUsers,
  getAuthors,
  getAdmins,
  updateUserRole,
  updatePassport,
  getUserById,
}
