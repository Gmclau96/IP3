const bcrypt = require('bcryptjs');
const res = require('express/lib/response');
const path = require('path');

var knex = require('knex')({
    client: 'sqlite3',
    connection: { filename: './database/users.db' },
    useNullAsDefault: true
})

class UserDAO {
    init() {
        //creates usr table on first time set up with 1 admin row
        knex.schema.hasTable("usr").then(function (exists) {
            if (!exists) {
                knex.schema.createTable("usr", (table) => {
                    table.increments("id").primary()
                    table.string("email").unique()
                    table.string("hash")
                    table.string("forename")
                    table.string("surname")
                    table.boolean("admin")
                })
                    .then(() =>
                        knex("usr").insert([
                            { email: "Admin@ip3.com", hash: "Admin", forename: "Admin", surname: "Admin", admin: 1 },
                        ])
                    )
            }
        })
    }
    async create(req, res) {
        //user input to variables
        const email = req.body.email;
        const password = req.body.password;
        const password2 = req.body.password2;
        const forename = req.body.fname;
        const surname = req.body.lname;

        if (password != password2) {
            res.send("passwords dont match");
        } else {
            //registers user
            try {
                const hash = await bcrypt.hash(password, 10);
                await knex('usr').insert({ email: email, hash: hash, forename: forename, surname: surname, admin: 0 });
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
            const user = await knex('usr').first('*').where({ email: email });
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
            res.status(400).json('Something broke!');
        }
    }
}
const dao = new UserDAO();
dao.init();

module.exports = dao;