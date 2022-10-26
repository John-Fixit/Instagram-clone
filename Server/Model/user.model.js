const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userShema = new mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    password: String,
    profilePicture: String,
    allMessage: [],
    followers:[],
    userPosts:[]
})
const userPostSchema = new mongoose.Schema({
    username: String,
    userId: String,
    postLink: String,
    postCaption: String,
    postLocation: String,
    postTime: {},
    profilePicture: String,
    noOfLikes : [],
    allComments:[]
})
let saltRound = 10;
userShema.pre("save", function(next){
    bcrypt.hash(this.password, saltRound, (err, hashedPassword)=>{
        if(err){
            console.log(`Error dey`);
        }else{
            this.password = hashedPassword;
            next()
        }
    })
})
userShema.methods.validatePassword = function(password, callback){
    bcrypt.compare(password, this.password, (err, same)=>{
        if(!err){
            callback(err, same)
        }else{
            next()
        }
    })
}
const userModel = mongoose.model("users_tb", userShema)
const userPostModel = mongoose.model('userPost_tb', userPostSchema)
module.exports = {userModel, userPostModel}