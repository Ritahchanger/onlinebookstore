const fs = require("fs");

const path = require("path")

const Book = require("../models/Book.model")

const uploadDirectory = path.join(__dirname, '../upload/authors/');

const User = require('../models/User.model')


const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude the password field

    if (users.length === 0) {
      return res.status(404).json({ status: 404, success: false, data: 'No users found' });
    }

    return res.status(200).json({ status: 200, success: true, data: users});
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` });
  }
};


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
    const { id } = req.params
    const { role } = req.body

    const user = await User.findById(id)

    if (!user) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'User not found in the system'
      })
    }

    const roles = ['admin', 'author', 'user']

    if (!roles.includes(role)) {
      return res.status(400).json({
        status: 400,
        success: false,
        message: 'The role is not found in the system'
      })
    }

    if (user.roles.includes(role)) {
      return res.status(200).json({
        status: 200,
        success: true,
        message: `The user already has the ${role} role`
      })
    }

    user.roles.push(role)

    await user.save()

    return res.status(201).json({
      status: 201,
      success: true,
      message: `The user's role has been updated to ${role}`
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

const updatePassport = async (req, res) => {
  const { id } = req.params;


  const passport = req.file.filename;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.passport) {
      const oldPassportPath = path.join(uploadDirectory, user.passport);

      fs.unlink(oldPassportPath, (err) => {
        if (err) {
          console.error('Error deleting old passport file:', err);
        }
      });
    }

  
    user.passport = passport;

    await user.save();

    return res.status(200).json({ success: true, message: 'Passport updated successfully',data:passport });

    
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` });
  }
};



const getUserById = async (req, res) => {
  try {
    const { id } = req.params

    const singleUser = await User.findById(id)

    if (!singleUser) {
      return res
        .status(200)
        .json({ status: 404, success: false, message: 'User not found' })
    }

    return res
      .status(200)
      .json({ status: 200, success: true, data: singleUser })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}


const getUserCookie = (req, res) => {
  try {
    // Retrieve the user data cookie from the request
    const userDataCookie = req.cookies.token;

    // Respond with the user data cookie
    res.status(200).json({ user: userDataCookie });
  } catch (err) {
    // If an error occurs, handle it and send an error response
    res.status(500).json({success:false,error: err.message });
  }
};


// Today

const deleteUser = async (req,res) =>{

  const { id } = req.params.id;

  try{

    const userToDelete = await User.findById(id)

    if(!userToDelete){
      return res.status(200).json({success:false,status:404, message: 'User not found' });
    }

    const booksAuthored = await Book.find({author:id});

    if(booksAuthored.length > 0){
      await Book.deleteMany({author:id})
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({status:200,success:true,message:"User and their books deleted successfully"});

  }catch(error){
    return res.status(500).json({ success: false, error: `${error.message}` })
  }

}


const updateUserProfileInformation = async () =>{

  try{


  }catch(error){

    
  }


}




module.exports = {
  getUsers,
  getAuthors,
  getAdmins,
  updateUserRole,
  updatePassport,
  getUserById,
  deleteUser,
  getUserCookie,
}
