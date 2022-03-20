const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const res = require('express/lib/response');


const db = new sqlite3.Database('./database/users.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else
        console.log('Connected to the users database.');
});

class UserDAO {
    init() {
        db.serialize(() => {
            db.run('CREATE TABLE IF NOT EXISTS usr(userID INTEGER PRIMARY KEY, email TEXT, hash TEXT, forename TEXT, surname TEXT, admin BOOLEAN, UNIQUE(email))')
                //sets up users as admins
                .run('INSERT OR IGNORE INTO usr VALUES(NULL,"Admin@ip3.com","Admin","forename","surname",1)')
        });
    }
    create(email, password, forename, surname) {

        const hash = bcrypt.hash(password, 10);
        db.serialize(() => {
            db.run('INSERT INTO usr(userID,email,hash,forename,surname,admin) VALUES(NULL,?,?,?,?,0)', [email, hash, forename, surname])
        });

    }
    // lookup(user, cb) {
    //     this.db.find({ 'user': user }, function (err, entries) {
    //         if (err) {
    //             return cb(null, null);
    //         } else {
    //             if (entries.length == 0) {
    //                 return cb(null, null);
    //             }
    //             return cb(null, entries[0]);
    //         }
    //     });
    // }
}
const dao = new UserDAO();
dao.init();

module.exports = dao;