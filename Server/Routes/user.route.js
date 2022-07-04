const express = require("express");
const userRouter = express.Router();
const userController = require('../Controller/user.controller')
userRouter.get('/', userController.landingPage)
userRouter.post('/signup', userController.signup)
userRouter.post('/signin', userController.signin)
userRouter.get('/home', userController.home)
userRouter.post('/upload', userController.upload)
userRouter.post('/follow', userController.follow)
userRouter.post('/createPost', userController.createPost)
userRouter.post('/savePost', userController.savePost)
userRouter.post('/like', userController.like)
userRouter.post('/comment', userController.comment)
module.exports = userRouter