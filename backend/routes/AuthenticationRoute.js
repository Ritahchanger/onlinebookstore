const router = require("express").Router();

const AuthenticationController = require("../controllers/AuthenticationController")



router.post('/login',AuthenticationController.Login)
router.post('/signup',AuthenticationController.SignUp);
router.post('/logout',AuthenticationController.logout);
router.post('/forgot-password',AuthenticationController.forgotPassword);
router.post('/change-password',AuthenticationController.changePassword);


router.get('/',(req,res)=>{
    return res.status(200).json({message:"gotten"})
})




module.exports=router;