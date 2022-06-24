const express = require("express");
const userRouter = express.Router();
const userController = require('../Controller/user.controller')
userRouter.get('/', userController.landingPage)
userRouter.post('/signup', userController.signup)
module.exports = userRouter