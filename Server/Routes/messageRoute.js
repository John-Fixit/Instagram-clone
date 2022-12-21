const express = require('express');
const messageRouter = express.Router();
const messageController = require('../Controller/messageController');

messageRouter.post('/sendMsg', messageController.sendMessage)
messageRouter.post('/getMsg', messageController.getMessage)