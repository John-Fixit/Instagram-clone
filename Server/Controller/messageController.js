const { messageModel } = require("../Model/message.model")

const sendMessage = (req, res)=>{
    const {from, to, message} = req.body
    messageModel.create({message: {text: message}, users: [from, to], sender: from}, (err, result)=>{
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
                    time: msg.createdAt.toLocaleTimeString(),
                    time: msg.createdAt.toDateString() + ' ' + msg.createdAt.toLocaleTimeString()
                }
            })
           
            res.json({formatedMessage, status: true})
        }
    })
}




module.exports = {
    getMessage,
    sendMessage
}