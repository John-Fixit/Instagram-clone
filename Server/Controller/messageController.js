const { messageModel } = require("../Model/message.model")
const cloudinary = require('cloudinary')
require('dotenv').config()

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const sendMessage = (req, res)=>{
    const {from, to, message} = req.body
    messageModel.create({message: {text: message, msgType: 'text'}, users: [from, to], sender: from}, (err, result)=>{
        if(err){
            res.json({message: 'Network error, please check your connection!', status: false})
        }
        else{
            res.json({message: 'message sent!', status: true})
        }
    })
}
const getMessage = (req, res)=>{
    const {from, to} = req.body
    messageModel.find({users: {$all: [from, to]}}, (err, data)=>{
        if(err){
            res.json({message: 'Error occurred!', status: false})
        }
        else{
            let formatedMessage = data.map((msg)=>{
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                    msgType: msg.message.msgType,
                    time: msg.createdAt.toDateString() + ' ' + msg.createdAt.toLocaleTimeString()
                }
            })
           
            res.json({formatedMessage, status: true})
        }
    })
}

const sendImgAsMsg =(req, res)=>{
    const {from, to, imgUrl} = req.body
    if(!!imgUrl){      
            cloudinary.v2.uploader.upload(imgUrl, (err, result)=>{
                if(err){
                    res.json({message: 'Network error, please check your connection!', status: false})
                    console.log(err)
                }
                else{
                    messageModel.create({message:{text: result.secure_url, msgType: 'image'}, users: [from, to], sender: from}, (err, result)=>{
                            if(err){
                                res.json({message: 'Network error, please check your connection!', status: false})
                            }
                            else{
                                res.json({message: 'message sent', status: true})
                            }
                    })
                }
            })
    }
}


module.exports = {
    getMessage,
    sendMessage,
    sendImgAsMsg
}