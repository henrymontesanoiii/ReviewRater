const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
});
app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/html/home.html'))
});

app.listen(port);
console.log('Server started at http://localhost:' + port);