const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const path = require("path");
const { emitKeypressEvents } = require('readline');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './public')));

let db = new sqlite3.Database('./database/users.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else
    console.log('Connected to the users database.');
});

db.run('CREATE TABLE IF NOT EXISTS usr(userID INTEGER PRIMARY KEY, email TEXT, password TEXT)');
//Display interface
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//redirects to signup page from index
app.post('/signup', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/signup.html'));
});

//redirects to password reset page from index
app.post('/password', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/password.html'));
});


// Insert
app.post('/add', function (req, res) {
  db.serialize(() => {
    db.run('INSERT INTO usr(email,password) VALUES(?,?)', [req.body.email, req.body.password], function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log("New employee has been added");
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
  });
});


// login
app.post('/login', function (req, res) {
  db.serialize(() => {
    db.each('SELECT email EMAIL, password PASSWORD FROM usr WHERE email =? AND password =?', [req.body.email, req.body.password], function (err, row) {
      if (err) {
        alert("Incorrect login details, please try again")
        res.send("Error encountered while displaying");
        return console.error(err.message);
      }
      //TEMPORARILY REDIRECTS TO ACCOUNT PAGE
      res.sendFile(path.join(__dirname, '../public/account.html'));
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
      console.log("Read  from DB userID: " + row.userID + " email: " + row.email + " password: " + row.password);
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

app.listen(3000, () => {
  console.log("Server listening on port: 3000");
});