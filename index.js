const express = require('express');
const app = express();
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.text())

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(express.urlencoded({
  extended: true
}));

const path = require('path');
const public = path.join(__dirname, 'public');
app.use(express.static(public));

const mustache = require('mustache-express');
app.engine('mustache', mustache());
app.set('view engine', 'mustache');

const router = require('./routes/ip3Routes');
const { loggedIn } = require('./auth/auth');
app.get('*', loggedIn);
app.use('/', router);

const mongoose = require('mongoose');

const dbConnect = 'mongodb+srv://ip3Diary:gyntyc-xobBuw-nonpi3@cluster0.qtsqa.mongodb.net/ip3Diary';
mongoose.connect(dbConnect, { useUnifiedTopology: true })
  .then(() => {
    console.log("server running on port 3000")
    app.listen(3000)
    
  });

