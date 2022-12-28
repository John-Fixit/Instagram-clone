const express = require("express");
const app = express();
const userRouter = require('./Routes/user.route')
const cors = require('cors')
const bodyParser = require('body-parser');
const server = require('socket.io')
app.use(bodyParser.urlencoded({extended: true,limit:"100mb"}))
app.use(bodyParser.json({limit:'100mb'}))
app.use(cors())
const mongoose = require('mongoose');
const messageRouter = require("./Routes/messageRoute");
require("dotenv").config();
const url = process.env.URL
mongoose.connect(url,(err)=>{
    if(err){
        console.log(`mongoose not connected!`);
    }
    else{
        console.log(`mongoose connected successfully!`);
    }
})
app.use('/user', userRouter)
app.use('/message', messageRouter)
const PORT = process.env.PORT || 3000
const socket_io = app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
})

module.exports = socket_io
const io = server(socket_io, {cors: {origin: '*'}})
global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    global.chatSocket = socket;
    
    socket.on('add_user', (userId)=>{
        onlineUsers.set(userId, socket.id)
    })

    socket.on('send_msg', (msgData)=>{
        const sendUserSocket = onlineUsers.get(msgData.to)
        if(sendUserSocket){
            socket.to(sendUserSocket).emit('recieve_msg', {message: msgData.message})
        }
    })

    socket.on('disconnect', ()=>{
       console.log(`user disconnected with id: ${socket.id}`)
    })
})
