const  BooksCategoriesController  = require("../controllers/BooksCategoriesController");


const router = require("express").Router();



router.get("/",BooksCategoriesController.getCategories)

router.post("/",BooksCategoriesController.postCategories)

router.post("/delete/:id",BooksCategoriesController.deleteCategory);


module.exports = router