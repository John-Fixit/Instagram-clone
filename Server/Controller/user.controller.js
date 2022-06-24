const userModel = require('../Model/user.model')
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
                        res.status(501).send({ message: `Internal error`, status: false})
                    }
                    else {
                        res.status(200).send({ message: `Registration successfull`, status: true })
                    }
                })
            }
        }
    })

}
module.exports = { landingPage, signup }