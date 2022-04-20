const userDao = require('../models/userModel.js')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()

const authenticate = function (req, res, next) {

    const token = req.cookies.jwt;

    //checks for token
    if (token) {
        jwt.verify(token, process.env.Secret, (error, decodedToken) => {
            if (error) {
                res.redirect("/login");
                console.log(error.message);
            } else {
                next()
            }
        })
    }
    else {
        res.redirect("/login");
    }
}


//To see who is logged in
const loggedIn = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.Secret, async (error, decodedToken) => {
            if (error) {
                console.log(error.message);
                res.locals.user = null;
                next();
            } else {
                let user = await userDao.findById(decodedToken._id)
                console.log(user);
                res.locals.user = user;
                next()
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { authenticate, loggedIn };