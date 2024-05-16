const router = require("express").Router()

const UsersController = require("../controllers/UsersController");










router.get('/',UsersController.getUsers);




module.exports = router