const { messageModel } = require("../Model/message.model")

const sendMessage = (req, res)=>{
    const {from, to, message} = req.body
    messageModel.create({message: {text: req.body.message}, users: [from, to], sender: from}, (err, result)=>{
        if(err){
            res.json({message: 'Network error, please check your connection!', status: false})
            console.log(err)
        }
        else{
            res.json({message: 'message sent!', status: true})
            console.log(result)
        }
    })
}
const getMessage = (req, res)=>{
    const {from, to} = req.body
    messageModel.find({users: {$all: [from, to]}}, (err, data)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(data)
            let formatedMessage = data.map((msg)=>{
                return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                    time: msg.createdAt.toLocaleTimeString()
                }
            })
            console.log(formatedMessage)
            res.json({formatedMessage, status: true})
        }
    })
}




module.exports = {
    getMessage,
    sendMessage
}