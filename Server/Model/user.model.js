const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userShema = mongoose.Schema({
    fullname: String,
    username: String,
    email: String,
    password: String
})
const saltRound = 10;
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
const userModel = mongoose.model("users_tb", userShema)
module.exports = userModel