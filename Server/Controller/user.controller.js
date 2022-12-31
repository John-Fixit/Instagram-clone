
const { userModel, userPostModel } = require('../Model/user.model')
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
    console.log(`I am working`);
}
const signup = (req, res) => {
    const userDetails = req.body;
    userModel.findOne({ username: req.body.username }, (err, result) => {
        if (err) {
            res.status(501).send({ message: `Internal error, registration not yet done`, status: false })
        }
        else {
            if (result) {
                res.send({ message: `Unsuccesful, the username already exist`, status: false })
            }
            else {
                userModel.findOne({ email: req.body.email }, (err, result) => {
                    if (err) {
                        res.status(501).send({ message: `Internal error, registration not yet done`, status: false })
                    }
                    else {
                        if (result) {
                            res.send({ message: `Unsuccesful, the email already exist`, status: false })
                        }
                        else {
                            let form = new userModel(userDetails)
                            form.save((err) => {
                                if (err) {
                                    res.status(501).send({ message: `Internal error`, status: false })
                                }
                                else {
                                    res.status(200).send({ message: `Registration successfull, kindly go ahead to signin!`, status: true })
                                }
                            })
                        }
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
            res.status(501).send({ message: `Internal serval error` })
        }
        else {
            if (!user) {
                res.send({ message: `sorry! seems like you don't have account yet, kindly proceed to signup`, status: false })
            }
            else {
                user.validatePassword(password, (err, same) => {
                    if (err) {
                        console.log(`There is an error`);
                        res.send({message: `Internsl server error, please try again!`, status: false})
                    }
                    else {
                        if (same) {
                            const token = jwt.sign({ email }, SECRET, { expiresIn: '6h' })
                            res.send({ message: `correct password`, status: true, token })
                        }
                        else {
                            res.send({ message: `Password is Incorrect`, status: false })
                        }
                    }
                })
            }
        }
    })
}
const home = (req, res) => {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, SECRET, (err, result) => {
        if (err) {
            console.log(`unathorized user`);
            res.send({ status: false, message: `unathorized user` })
        }
        else {
            userModel.findOne({ email: result.email }, (err, userDetails) => {
                if (err) {
                    console.log(`Internal server error`);
                    res.send({ message: `Internal server error`, status: false })
                }
                else {
                    userModel.find((err, result) => {
                        if (err) {
                            console.log(`There's an error`);
                        } else {
                            userPostModel.find((err, allPosts) => {
                                if (err) {
                                    console.log(`There's an error`);
                                }
                                else {
                                    res.send({ message: `authorization verified`, status: true, userDetails, result, allPosts })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
const upload = (req, res) => {
    const userId = req.body.userId
    const uploadedImage = req.body.myImage
    cloudinary.v2.uploader.upload(uploadedImage, (err, result) => {
        if (err) {
            console.log(`image not yet uploaded, try again`);
            res.send({ message: `image not yet uploaded, try again`, status: false })
        }
        else {
            const registerImage = result.secure_url
            userModel.findOneAndUpdate({ '_id': `${userId}` }, { 'profilePicture': `${registerImage}` }, (err, result) => {
                if (err) {
                    res.send({ message: `unable to add profile picturr`, status: false})
                }
                else {
                    const userProfilePicture = result.profilePicture
                    res.send({ message: `Profile Picture added`, status: true })
                }
            })
        }
    })
}
const follow = (req, res) => {
    console.log(req.body);
    const followerDetails = { followerUsername: req.body.username, followerEmail:req.body.useremail, followerId: req.body.userId }

    const followingDetails = {friendUsername: req.body.ownerUsername, friendEmail: req.body.ownerEmail, friendId: req.body.ownerId}
    console.log(followerDetails);
    userModel.findOneAndUpdate({ '_id': `${req.body.ownerId}` }, { $push: { 'followers': followerDetails } }, (err, result) => {
        if (err) {
            res.send({message: 'Network error', status: false})
        }
        else {
            userModel.findOneAndUpdate({ '_id': `${req.body.userId}` }, { $push: { 'following': followingDetails } }, (err, result) => {
                if (err) {
                    res.send({message: 'Network error', status: false})
                }
                else {
                    res.send({ message: `You are now following ${req.body.ownerUsername}`, status: true })
                }
            })
        }
    })
}
const createPost = (req, res) => {
    const responseFromClient = req.body.myFile
    cloudinary.v2.uploader.upload(responseFromClient, (err, result) => {
        if (err) {
            console.log(err);
            console.log(`Not uploaded yet`);
            res.send({ message: `An error occur in the uploading, please try again`, status: false })
        } else {
            const secureUrl = result.secure_url
            res.send({ secureUrl, status: true })
        }
    })
}
const savePost = (req, res) => {
    const postCaption = req.body.postCaption
    const postLocation = req.body.postLocation
    const postTime = req.body.postTime
    const userId = req.body.userId
    const like = req.body.like
    const comments = req.body.comments
    const responseFromClient = req.body.convertedFile
    cloudinary.v2.uploader.upload(responseFromClient, (err, result) => {
        if (err) {
            console.log(err);
            console.log(`Not uploaded yet`);
            res.send({ message: `An error occur in the uploading, please try again`, status: false })
        } else {
            const userPost = { postCaption, postLink: result.secure_url, postLocation, postTime, like, comments }
            const userPostDetails = { postCaption, userId, postLocation, username: req.body.username, postTime, profilePicture: req.body.profilePicture, like, comments, postLink: result.secure_url }
            userModel.findOneAndUpdate({ '_id': `${userId}` }, { $push: { 'userPosts': userPost } }, (err, result) => {
                if (err) {
                    console.log(`unable to post`);
                    res.send({ message: `Unable to share your post`, status: false })
                } else {
                    let form = new userPostModel(userPostDetails)
                    form.save((err) => {
                        if (err) {
                            console.log(err)
                            console.log(`Error dey`);
                        }
                        else {         
                            res.send({ message: `Your post will be published shortly`, status: true})
                        }
                    })
                }
            })
        }
    })
   
}
const like = (req, res) => {
    const username = req.body.username;
    const postLink = req.body.postLink
    const userId = req.body.user_id;
    let likeDetail = { username }
    userPostModel.findOneAndUpdate({ 'postLink': `${postLink}` }, { $push: { 'noOfLikes': likeDetail } })
    userModel.findOne({ '_id': userId }, (err, thisUser) => {
        if (err) {
            res.send({message: `Network error`, status: false})
        } else {
            let post = thisUser.userPosts.find(pst => pst.postLink == postLink);
            post.like.push(likeDetail)
            userModel.findOneAndUpdate({ '_id': userId }, { 'userPosts': thisUser.userPosts }, (err, likeResult) => {
                if (err) {
            res.send({message: `Network error`, status: false})
            
                } else {
            res.send({message: `successfull`, status: true})
                   
                }
            })
        }
    })
}
const comment = (req, res) => {
    const username = req.body.username;
    const userComment = req.body.userComment
    const postLink = req.body.postLink
    const userId = req.body.user_id;
    const profilePicture = req.body.profilePicture
    const commentDetail = { username, userComment, profilePicture }
    userPostModel.findOneAndUpdate({ 'postLink': postLink }, { $push: { 'allComments': commentDetail } }, (err, update) => {
        if (err) {
            console.log(`error occur `);
        } else {
            console.log(`update  successfully`);
        }
    })
    userModel.findOne({ '_id': userId }, (err, thisUser) => {
        if (err) {
            console.log(`I don't see the user`);
        }
        else {
            let found = thisUser.userPosts.find(pst => pst.postLink == postLink)
            if (found) {
                found.comments.push(commentDetail)
                console.log(thisUser.userPosts);
                userModel.findOneAndUpdate({ '_id': userId }, { 'userPosts': thisUser.userPosts }).then((update)=>{
                    console.log(update);
                    res.send({message: `you commented on ${thisUser.username}`})
                })
            }
        }
    })
}

const getUserDetail=(req, res)=>{
    const username = req.params.username
    userModel.find((err, result)=>{
        if(err){
            res.json({message: 'Network error, please check your connection', status: false})
        }
        else{
            let projectedUser = result.find((user)=>(user.username).toString() == username)
            res.json({projectedUser, status: true})
        }
    })
}


module.exports = { landingPage, signup, signin, home, upload, follow, createPost, savePost, like, comment, getUserDetail }