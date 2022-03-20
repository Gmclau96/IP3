const userDao = require("../models/userModel.js");

exports.get_login = function (req, res) {
    res.redirect("index.html");
};

//handle login
exports.post_login = function (req, res) {
    db.serialize(() => {
        db.each('SELECT email EMAIL, hash HASH FROM usr WHERE email =? AND hash =?', [req.body.email, req.body.password], function (err) {
            if (err) {
                return console.error(err.message);
            }
            console.log("Login Successful");
            //Routes temporarlity to account page
            res.redirect('account.html');
        });
    });
};

exports.get_signup = function (req, res) {
    res.redirect("signup.html");
};

//post sign up
exports.post_signup = function (req, res) {
    const email = req.body.email;
    const password = req.body.password2;
    const forname = req.body.fname;
    const surname = req.body.lname;

    if (!email || !password) {
        res.send(401, "no user or no password");
        return;
    }
    // userDao.lookup(email, function (err, u) {
    //   if (u) {
    //     res.send(401, "User exists:", email);
    //     return;
    //   }
    userDao.create(email, password, forname, surname);
    console.log("register user", email, "password", password);
   res.redirect('index.html');
    
    // });
};

exports.get_password = function (req, res) {
    res.redirect('password.html');
};

exports.get_account = function (req, res) {
    res.redirect("account.html");
};

exports.get_lists = function (req, res) {
    res.redirect("lists.html");
};

exports.get_calendar = function (req, res) {
    res.redirect("calendar.html");
};

exports.get_notes = function (req, res) {
    res.redirect("notes.html");
};

exports.get_recipes = function (req, res) {
    res.redirect('recipes.html');
};