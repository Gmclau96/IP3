const express = require('express');
const path = require('path');
const router = require('./routes/ip3Routes');
const app = express();

app.listen(3000, () => {
  console.log('Server started on port 3000. Ctrl^c to quit.');
});

const public = path.join(__dirname, 'public');
app.use(express.static(public));
app.use(express.urlencoded({
  extended: true
}));

app.use('/', router);