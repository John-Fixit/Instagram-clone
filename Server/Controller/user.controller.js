
const {userModel, userPostModel} = require('../Model/user.model')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary')
require('dotenv').config()
const SECRET = process.env.JWT_SECRET

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });

const landingPage = (req, res) => {
    console.log(`I dey work John Fixit`);
}
const signup = (req, res) => {
    const userDetails = req.body;
    userModel.findOne({ email: req.body.email }, (err, result) => {
        if (err) {
            console.log(`An error occured registration not yet done`);
            res.status(501).send({ message: `Internal error, registration not yet done`, status: false })
        }
        else {
            if (result) {
                console.log(`The email is already used`);
                res.send({ message: `Unsuccesful, the email is already used`, status: false })
            }
            else {
                let form = new userModel(userDetails)
                form.save((err) => {
                    if (err) {
                        res.status(501).send({ message: `Internal error`, status: false })
                    }
                    else {
                        res.status(200).send({ message: `Registration successfull`, status: true })
                    }
                })
            }
        }
    })
}
const signin = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    userModel.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log(`There is an error`);
            res.status(501).send({ message: `Internal serval error` })
        }
        else {
            if (!user) {
                console.log(`You don't have account with me kindly proceed to signup`);
                res.status(200).send({ message: `You don't have account with me kindly proceed to signup`, status: false })
            }
            else {
                user.validatePassword(password, (err, same) => {
                    if (err) {
                        console.log(`There is an error`);
                    }
                    else {
                        if (same) {
                            console.log(`Its correct`);
                            const token = jwt.sign({ email }, SECRET, { expiresIn: '6h'})
                            res.send({ message: `correct password`, status: true, token })
                        }
                        else {
                            console.log(`Invalid password`)
                            res.send({ message: `Password is Incorrect`, status: false })
                        }
                    }
                })
            }
        }
    })
}
const home = (req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, SECRET, (err,result)=>{
        if(err){
            res.send({status: false, message: `unathorized user`})
        }
        else{
            userModel.findOne({email: result.email}, (err, userDetails)=>{
                if(err){
                    console.log(`Internal server error`);
                    res.send({message:`Internal server error`, status: false})
                }
                else{
                    userModel.find((err, result)=>{
                        if(err){
                            console.log(`There's an error`);
                        }else{
                            userPostModel.find((err, allPosts)=>{
                                if(err){
                                    console.log(`There's an error`);
                                }
                                else{
                                    res.send({message:`authorization verified`, status: true, userDetails, result, allPosts})
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
const upload=(req, res)=>{
    const userId = req.body.userId
    const uploadedImage = req.body.myImage
    cloudinary.v2.uploader.upload(uploadedImage, (err, result)=>{
        if(err){
            console.log(`image not yet uploaded, try again`);
            res.send({message: `image not yet uploaded, try again`})
        }
        else{
            const registerImage = result.secure_url
            userModel.findOneAndUpdate({'_id': `${userId}`}, {'profilePicture': `${registerImage}`}, (err, result)=>{
                if(err){
                    console.log(`unable to update`);
                }
                else{
                    // console.log(result);
                    const userProfilePicture = result.profilePicture
                    res.send({message:`upload successfully`, userProfilePicture, })
                }
            })
        }
    })
}
const follow=(req, res)=>{
    const followerUsername = req.body.username
    const followerEmail = req.body.useremail
    const followerDetails = {followerUsername, followerEmail}
    console.log(followerDetails);
    const ownerId = req.body.ownerId
    userModel.findOneAndUpdate({'_id': `${ownerId}`}, { $push:{'followers': followerDetails}}, (err, result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({message: `${followerDetails.followerUsername} is now following you`, status: true})
        }
    })
}
const createPost=(req, res)=>{
    const responseFromClient = req.body.myFile
    cloudinary.v2.uploader.upload(responseFromClient, (err, result)=>{
        if(err){
            console.log(err);
            console.log(`Not uploaded yet`);
            res.send({message:`An error occur in the uploading, please try again`, status: false})
        }else{
            const secureUrl = result.secure_url
            res.send({secureUrl, status: true})
        }
    })
}
const savePost=(req, res)=>{
    const postCaption = req.body.postCaption
    const postLink = req.body.postLink
    const postLocation = req.body.postLocation
    const postTime = req.body.postTime
    const userId = req.body.userId
    const like = req.body.like
    const userPost = {postCaption, postLink, postLocation, postTime, like}
    const userPostDetails = req.body
    console.log(userPostDetails);
    userModel.findOneAndUpdate({'_id': `${userId}`}, {$push:{'userPosts': userPost}}, (err, result)=>{
        if(err){
            console.log(`unable to post`);
            res.send({message:`Unable to share your post`, status: false})
        }else{
            res.send({message:`Your post will be published shortly`, status: true, result})
        }
    })
    let form = new userPostModel(userPostDetails)
    form.save((err)=>{
        if(err){
            console.log(`Error dey`);
        }
        else{
                userPostModel.find((err, result)=>{
                    if(err){
                        console.log(`there's error`);
                    }
                    else{
                        // console.log(result);
                    }
                })
        }
    })
}
const like=(req, res)=>{
    const likeDetail = req.body
    // console.log(likeDetail);
    userPostModel.findOneAndUpdate({'postLink': `${likeDetail.postLink}`}, { $push:{'noOfLikes': likeDetail}}, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(result);
        }
    })
    userModel.findOne({'_id': likeDetail.user_id}, (err, thisUser)=>{
        if(err){
            console.log(err);
        }else{
            // console.log(thisUser);
            userModel.thisUser.findOneAndUpdate({'postLink': likeDetail.postLink}, {$push:{'like':likeDetail}},(err, myLikeResult)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(`Thank God I saw it`);
                }
            })  
        }
    })
}
module.exports = { landingPage, signup, signin, home, upload, follow, createPost, savePost, like }