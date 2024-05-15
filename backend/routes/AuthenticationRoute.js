const router = require("express").Router();

const AuthenticationController = require("../controllers/AuthenticationController")



router.post('/login',AuthenticationController.Login)
router.post('/signup',AuthenticationController.SignUp);
router.post('/logout',AuthenticationController.logout);
router.post('/forgot-password',AuthenticationController.forgotPassword);




module.exports=router;