const express = require('express');
const path = require('path');
const session = require('express-session');
let productName = "Lay's Chips";

const app = express();
const PORT = process.env.PORT || 3000;

const admin = require('firebase-admin');
const credentials = require('../key.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const db = admin.firestore();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//Session Cookie
app.use(session({
    secret: 'some secret',
    cookie: {maxAge: 3600000},
    saveUninitialized: false
  }))

//Create New Account
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
    } catch (error) {
        console.error('Error creating user:', error);
        res.send(error);
    }
});

//Create New Comment
app.post('/newcomment', async (req, res) => {
    try {
        console.log('Received POST request to /newcomment');
        console.log('Request body:', req.body);

        const commentJson = {
            product: req.body.product,
            description: req.body.description,
            rating: req.body.rating,
            reviewer: req.body.reviewer,
        };
        const response = await db.collection("comments").add(commentJson);
        console.log('Comment added to Firestore:', response);

        res.send(response);
    } catch (error) {
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
    } catch (error) {
        res.send(error);
    }
});

//products endpoint
app.get('/prod', async (req, res) => {
    try {
        const prodCol = db.collection("products");
        const prodResponse = await prodCol.get();
        let prodArr = [];
        prodResponse.forEach(doc => {
            prodArr.push(doc.data());
        });
        for (let j = 0; j < prodArr.length; j++) {
            if (prodArr[j].name == "Lay's Chips"){
                productName == prodArr[j].name;
                res.send(prodArr[j]);    
            }
          }
    } catch (error) {
        res.send(error);
    }
});

//comments endpoint
app.get('/comms', async (req, res, ) => {
    try {
        const comsCol = db.collection("comments");
        const comsResponse = await comsCol.get();
        const commentList = comsResponse.docs.map(doc => doc.data());
        let comments = [];
        for (let i = 0; i < commentList.length; i++) { 
            if (commentList[i].product==productName){
                comments.push(commentList[i]);
            }
        }

    res.send(comments);
    } catch (error) {
        res.send(error);
    }
});

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/html/login.html'));

});
app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
});
app.get('/details', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/html/details.html'));
});

app.listen(PORT);
console.log(`App is now running on http://localhost:${PORT}`);

