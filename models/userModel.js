const bcrypt = require('bcryptjs');

var knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './database/ip3Diary.db' },
    useNullAsDefault: true
})

class UserDAO {
    init() {
        //creates users table on first time set up with 1 admin row
        knex.schema.hasTable("users").then(function (exists) {
            if (!exists) {
                knex.schema.createTable("users", (table) => {
                    table.increments("id").primary()
                    table.string("email").unique()
                    table.string("hash")
                    table.string("forename")
                    table.string("surname")
                    table.boolean("admin")
                })
                    .then(() =>
                        knex("users").insert([
                            { email: "Admin@ip3.com", hash: "Password123", forename: "Admin", surname: "Admin", admin: 1 },
                        ])
                    )
            }
        })
    }
    async create(req, res) {
        //user input to variables
        const forename = req.body.fname;
        const surname = req.body.lname;
        const email = req.body.email;
        const password = req.body.password;
        const password2 = req.body.password2;


        //signup validation schema
        const Joi = require('@hapi/joi');
        const schema = Joi.object()
            .options({ abortEarly: false })
            .keys({
                forename: Joi.string()
                    .pattern(new RegExp('^(([A-Za-z]+)(\s[A-Za-z]+)?)$'))
                    .min(3)
                    .max(20)
                    .required()
                    .messages({
                        "string.base": `"forename" should be a type of 'text'`,
                        "string.empty": `"forename" cannot be empty`,
                        "string.pattern.base": '"forename" must contain only letters',
                        "string.min": `"forename" should have a minimum length of {#limit}`,
                        "string.max": `"forename" should have a maximum length of {#limit}`,
                        "any.required": `"forename" is a required field`
                    }),
                surname: Joi.string()
                    .pattern(new RegExp('^(([A-Za-z]+)(\s[A-Za-z]+)?)$'))
                    .min(2)
                    .max(20)
                    .required()
                    .messages({
                        "string.base": `"surname" should be a type of 'text'`,
                        "string.empty": `"surname" cannot be empty`,
                        "string.pattern.base": '"surname" must contain only letters',
                        "string.min": `"surname" should have a minimum length of {#limit}`,
                        "string.max": `"surname" should have a maximum length of {#limit}`,
                        "any.required": `"surname" is a required field`
                    }),
                email: Joi.string()
                    .email()
                    .min(6)
                    .trim()
                    .required()
                    .messages({
                        "string.base": `"email" should be a type of 'email'`,
                        "string.empty": `"email" cannot be empty`,
                        "string.min": `"email" should have a minimum length of {#limit}`,
                        "any.required": `"email" is a required field`
                    }),
                password: Joi.string()
                    .pattern(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'))
                    .required()
                    .messages({
                        "string.base": `"password" should be a type of 'text'`,
                        "string.empty": `"password" cannot be empty`,
                        "string.min": `"password" should have a minimum length of 8`,
                        "string.pattern.base": '"password" should be at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters',
                        "any.required": `"password" is a required field`
                    }),
                password2: Joi.any()
                    .equal(Joi.ref('password'))
                    .required()
                    .messages({
                        "string.empty": `"password" cannot be empty`,
                        "any.only": 'passwords do not match',
                        "any.required": `"password" is a required field`
                    })
            });

        //Checks for input errors
        const { error } = schema.validate({ forename: forename, surname: surname, email: email, password: password, password2: password2 });

        if (error) {
            res.status(400).send(error.message);
        } else {
            //registers user
            try {
                const hash = await bcrypt.hash(password, 10);
                await knex('users').insert({ email: email, hash: hash, forename: forename, surname: surname, admin: 0 });
                console.log("User added");
                res.redirect('index.html');
            } catch (e) {
                if (e.errno === 19) {
                    res.send("account already exists");
                    console.log(e);
                } else {
                    console.log('Something broke!');
                }
            }
        }
    }
    async login(req, res) {

        try {
            //user input to variables
            const email = req.body.email;
            const password = req.body.password;
            const user = await knex('users').first('*').where({ email: email });
            //logs in user
            if (user) {
                const validPass = await bcrypt.compare(password, user.hash);
                if (validPass) {
                    res.redirect('account.html')
                } else {
                    res.send('Wrong password!');
                }
            } else {
                res.send('User not found!');
            }

        } catch (e) {
            // console.log(e); // Uncomment if needed for debug
            res.status(400).send('Something broke!');
        }
    }
}
const dao = new UserDAO();
dao.init();

module.exports = dao;