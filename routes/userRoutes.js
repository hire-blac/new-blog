const { Router } = require("express");
const userController = require('../controllers/userControllers');
const {loggedIn} = require("../middlewares/authMiddleware");

// initialize router object
const router = Router();

// routes

// get signup page
router.get("/users/signup", userController.signup_page);
router.post("/users/signup", userController.signup_post);

// get login page
router.get("/users/login", userController.login_page);
router.post("/users/login", userController.login_post);

router.get('/users/my-profile', loggedIn, userController.my_profile);

router.get('/users/:id', userController.user_profile);

// exprt router
module.exports = router;