const userDao = require("../models/userModel.js");
const notesDao = require("../models/notesModel.js");

exports.get_login = function (req, res) {
    res.redirect("index.html");
};

//handle login
exports.post_login = async function (req, res) {
    userDao.login(req, res);
};

exports.get_signup = function (req, res) {
    res.redirect("signup.html");
};

//post sign up
exports.post_signup = async function (req, res) {
    userDao.create(req, res);
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

exports.post_notes = async function (req, res) {
    notesDao.upload(req, res);
}

exports.get_recipes = function (req, res) {
    res.redirect('recipes.html');
};