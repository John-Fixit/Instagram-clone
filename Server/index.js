const express = require("express");
const app = express();
const userRouter = require('./Routes/user.route')
const cors = require('cors')
const bodyParser = require('body-parser');
const server = require('socket.io')
app.use(bodyParser.urlencoded({extended: true,limit:"100mb"}))
app.use(bodyParser.json({limit:'100mb'}))
app.use(cors())
const mongoose = require('mongoose')
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
const PORT = process.env.PORT || 3000
const socket_io = app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
})

module.exports = socket_io
const io = server(socket_io, {cors: {origin: '*'}})
global.onlineUser=new Map();

io.on('connection', (socket)=>{
    global.chatSocket = socket;
    
    io.on('add_user', (userId)=>{
        onlineUser.set(userId, socket.id)
    })

    io.on('send-msg', (msgData)=>{
        console.log(msgData)
        const sendUserSocket = onlineUser.get(msgData.to)
        if(sendUserSocket){
            io.to(sendUserSocket).emit('recieve-msg', {message: msgData.msg})
        }
    })

    io.on('disconnect', ()=>{
       console.log(`user disconnected with id: ${socket.id}`)
    })
})
