const router = require("express").Router();

const UsersController = require("../controllers/UsersController")





router.get('/all',UsersController.getUsers)
router.get('/authors',UsersController.getAuthors)
router.get('/admins',UsersController.getAdmins)







module.exports = router;