const router = require("express").Router();

const UsersController = require("../controllers/UsersController")

const multer = require("multer");

const path = require("path")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDirectory = path.join(__dirname, '../upload/authors/');
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
});

const upload = multer({ storage : storage });

router.get('/all',UsersController.getUsers)

router.get('/authors',UsersController.getAuthors)

router.get('/admins',UsersController.getAdmins)

router.put('/:id/update-role',UsersController.updateUserRole)

router.put('/:id/update-profile',upload.single('file'),UsersController.updatePassport)


router.get('/userId/:id',UsersController.getUserById)



router.get('/credentials',UsersController.getUserCookie)



router.get('/delete/:id',UsersController.getUserCookie)


// ACCOUNTS TERMINATION


router.post('/add/termination/account',UsersController.addAccountToTerminate)

router.get('/get/termination/accounts',UsersController.getAccountsToTerminate)

router.delete('delete/:id/termination/account',UsersController.terminateAccount)


// USER PROFILE UPDATES

router.put('/:id/update/phoneNo',UsersController.updateUserContact)

router.put('/:id/update/password',UsersController.updatePassword)

router.patch('/:id/update/names',UsersController.updateNames)

router.put('/:id/update/email',UsersController.updateEmail)



module.exports = router;