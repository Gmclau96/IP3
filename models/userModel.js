const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');
const dotenv = require('dotenv');
dotenv.config()

//user table schema with regex validation
const userColumns = new mongoose.Schema({
    forename: {
        type: String,
        required: [true, 'Please enter a forename \n'],
        lowercase: true,
        minLength: 2,
        maxLength: 20,
        validate: [/^[A-Za-z]+$/, 'Enter a valid forename \n']
    },
    surname: {
        type: String,
        required: [true, 'Please enter a surname \n'],
        lowercase: true,
        minLength: 2,
        maxLength: 25,
        validate: [/^[A-Za-z]+$/, 'Enter a valid surname \n']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email \n'],
        lowercase: true,
        minLength: 7,
        maxLength: 40,
        unique: true,
        validate:
            [/^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$/,
                "Please Enter a valid email address \n"]
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [8, 'Minimum of 8 characters'],
        validate: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            "Must be: 8 characters min, \n contain 1 uppercase letter, \n 1 lowercase letter and 1 number, \n special characters are allowed."]
    },
    admin: {
        type: Boolean,
        default: false
    }
})

//uses bcrypt before saving to hash password
userColumns.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


//logs user in
userColumns.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const validPass = await bcrypt.compare(password, user.password);
        if (validPass) {
            return user;
        }
        throw Error("Incorrect password")
    }
    throw Error("incorrect email");
}

//registers user to user table
const userDao = mongoose.model('user', userColumns);


//inserts admin if not exists
userDao.findOne({ email: "Admin@ip3.com" }, function (err, found) {
    if (err) console.log(err);
    if (found) {
        console.log("Admin already exists");
        //hashes the admin password from the .env file
        this.process.env.AdminPassword  =  bcrypt.hash(process.env.AdminPassword, 10);
    } else {
        const admin = userDao.create({ forename: "Admin", surname: "Admin", email: "Admin@ip3.com", password: process.env.AdminPassword, admin: true });
    }
});

module.exports = userDao;