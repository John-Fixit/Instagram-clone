const express = require("express");
const app = express();
const userRouter = require('./Routes/user.route')
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true,limit:"100mb"}))
app.use(bodyParser.json({limit:'100mb'}))
app.use(cors())
const mongoose = require('mongoose')
require("dotenv").config();
const url = process.env.URL
mongoose.connect(url,(err)=>{
    if(err){
        console.log(`an error occurred`);
    }
    else{
        console.log(`mongoose connected successfully`);
    }
})
app.use('/user', userRouter)
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
})
