const router = require("express").Router();

const AuthenticationController = require("../controllers/AuthenticationController")



router.post('/login',AuthenticationController.Login)
router.post('/signup',AuthenticationController.SignUp);
router.post('/logout',AuthenticationController.logout);




module.exports=router;