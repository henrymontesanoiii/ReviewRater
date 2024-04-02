const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const admin = require('firebase-admin');
const credentials = require('../key.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const db = admin.firestore();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.post('/create', async (req, res) => {
    try {
        console.log('Received POST request to /create');
        console.log('Request body:', req.body);

        const id = req.body.email;
        const userJson = {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
            username: req.body.username
        };
        const response = await db.collection("reviewer").add(userJson);
        console.log('User added to Firestore:', response);

        res.send(response);
    } catch(error){
        console.error('Error creating user:', error);
        res.send(error);
    }
});


app.get('/read/all', async (req, res) => {
    try {
        const reviewerRef = db.collection("reviewer");
        const response = await reviewerRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch(error) {
        res.send(error);
    }
});

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
});
app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/html/home.html'))
});

app.listen(port);
console.log('Server started at http://localhost:' + port);