const express = require('express');
const app = express();

const path = require("path");
const public = path.join(__dirname,'public');
app.use(express.static(public));


app.listen(3000, () => {
  console.log("Server listening on port: 3000");
});


const sqlite3 = require('sqlite3').verbose();


const { emitKeypressEvents } = require('readline');


app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//initiates database
let db = new sqlite3.Database('./database/users.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else
    console.log('Connected to the users database.');
});

//sets up database
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS usr(userID INTEGER PRIMARY KEY, email TEXT, password TEXT, admin BOOLEAN, UNIQUE(email))')
    //sets up users as admins
    .run('INSERT OR IGNORE INTO usr VALUES(NULL,"lucy","lucy",1)')
    .run('INSERT OR IGNORE INTO usr VALUES(NULL,"gordon","gordon",1)')
    .run('INSERT OR IGNORE INTO usr VALUES(NULL,"jordan","jordan",1)')
    .run('INSERT OR IGNORE INTO usr VALUES(NULL,"jamie","jamie",1)')
    .run('INSERT OR IGNORE INTO usr VALUES(NULL,"arrun","arrun",1)')
    .run('INSERT OR IGNORE INTO usr VALUES(NULL,"jacob","jacob",1)');
});

//Display interface
app.get('/', function (req, res) {
  res.redirect('index.html');
});

//redirects to signup page from index
app.post('/signup', function (req, res) {
  res.redirect('signup.html');
});

//redirects to password reset page from index
app.post('/password', function (req, res) {
  res.redirect('password.html');
});



// Insert
app.post('/add', function (req, res) {
  db.serialize(() => {
    if (req.body.password == req.body.password2) {
      db.run('INSERT INTO usr(userID,email,password,admin) VALUES(NULL,?,?,0)', [req.body.email, req.body.password], function (err) {
        if (err) {
          return console.log(err.message);
        }
        console.log("New user has been added");
        res.sendFile(path.join(__dirname, '../public/index.html'));
      });
    } else {
      console.log("passwords dont match");
    }
  });
});

//LOGIN
app.post('/login', function (req, res) {
  db.serialize(() => {
    db.each('SELECT email EMAIL, password PASSWORD FROM usr WHERE email =? AND password =?', [req.body.email, req.body.password], function (err) {
      if (err) {
        res.send("Error encounteredf while updating");
        return console.error(err.message);
      }
      res.send("Entry updated sucessfully");
      console.log("Entry updated sucessfully");
    });
  });
});

//Update
app.post('/update', function (req, res) {
  db.serialize(() => {
    db.run('UPDATE usr SET password = ? WHERE email = ?', [req.body.password, req.body.email], function (err) {
      if (err) {
        res.send("Error encountered while updating");
        return console.error(err.message);
      }
      res.send("Entry updated successfully");
      console.log("Entry updated successfully");
    });
  });
});

//Delete
app.post('/delete', function (req, res) {
  db.serialize(() => {
    db.run('DELETE FROM usr WHERE email = ?', req.body.email, function (err) {
      if (err) {
        res.send("Error encountered while deleting");
        return console.error(err.message);
      }
      res.send("Entry deleted");
      console.log("Entry deleted");
    });
  });
});

//Show All
app.post('/showAll', function (req, res) {
  db.serialize(() => {
    db.each("SELECT * FROM usr", function (err, row) {
      console.log("Read  from DB userID: " + row.userID + " email: " + row.email + " password: " + row.password + " admin: " + row.admin);
    });
    res.send(`results in terminal window `);
  });
});

//Close
app.get('/close', function (req, res) {
  db.close((err) => {
    if (err) {
      res.send('There is some error in closing the database');
      return console.error(err.message);
    }
    console.log('Closing the database connection.');
    res.send('Database connection successfully closed');
  });
});

