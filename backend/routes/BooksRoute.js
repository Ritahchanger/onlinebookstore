const router = require("express").Router();

const BookController = require("../controllers/BookController")



router.get("/get",(req,res)=>{
    return res.status(200).json({message:"Books has been gotten"})
})





module.exports = router