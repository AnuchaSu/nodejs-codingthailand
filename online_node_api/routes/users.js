var express = require("express");
var router = express.Router();
const passportJWT = require('../middleware/passportJWT')
const { body } = require('express-validator')
const userController = require("../controller/userController");

/* GET users listing. */
router.get("/", userController.index);

router.post("/login", userController.login);

router.post("/register", [
    body('name').not().isEmpty().withMessage('please enter name'),
    body('email').not().isEmpty().withMessage('please enter email').isEmail().withMessage('syntax is not unvaliable'),
    body('password').not().isEmpty().withMessage('please enter password').isLength({min:3}).withMessage('More than 3 character'),
],userController.register);

router.get('/me',[passportJWT.isLogin],userController.me)
module.exports = router;
