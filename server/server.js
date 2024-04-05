const express = require('express');
const path = require('path');
const session = require('express-session');
var firebase = require("firebase/app");
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

//Login
app.post('/login', async (req, res) => {
    try {
        console.log('Received POST request to /login');
        console.log('Request body:', req.body);

        const username = req.body.username;
        const password = req.body.password;
        const userSnapshot = await db.collection("reviewer").where("username", "==", username).where("password", "==", password).get();

        if (userSnapshot.empty) {
            return res.status(401).send("Invalid credentials");
        } else {
            const userData = userSnapshot.docs[0].data();
            res.status(200).json(userData);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send("Internal Server Error");
    }
});

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

//Edit Comment
app.post('/edit', async (req, res) => {
    try {
        console.log('Received POST request to /edit');
        console.log('Request body:', req.body);
        const product = req.body.product;
        const reviewer = req.body.reviewer;
        const description = req.body.description;
        const newDescription = req.body.newText;
        var query = await admin.firestore().collection('comments')
            .where('description', '==', description)
            .get().then(result => {
                result.forEach((doc) => {
                    response = db.collection('comments').doc(doc.id).update({'description': newDescription});
                });
            });
        res.sendStatus(200);
    } catch (error) {
        console.log('Error editing comment:', error);
        res.sendStatus(error);
    }
});

//Delete Comment
app.post('/delete', async (req, res) => {
    try {
        console.log('Received POST request to /delete');
        console.log('Request body:', req.body);
        const product = req.body.product;
        const reviewer = req.body.reviewer;
        const description = req.body.description;
        let response = '';
        var query = await admin.firestore().collection('comments')
            .where('description', '==', description)
            .get().then(result => {
                result.forEach((doc) => {
                    response = db.collection('comments').doc(doc.id).delete();
                });
            });
        res.send(200);
    } catch (error) {
        console.log('Error deleting comment:', error);
        res.sendStatus(error);
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
app.post('/login', async (req, res) => {
    try {
        console.log('Received POST request to /login');
        console.log('Request body:', req.body);

        const username = req.body.username;
        const password = req.body.password;
        const userSnapshot = await db.collection("reviewer").where("username", "==", username).where("password", "==", password).get();

        if (userSnapshot.empty) {
            return res.status(401).send("Invalid credentials");
        } else {
            const userData = userSnapshot.docs[0].data();
            res.status(200).json(userData);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send("Internal Server Error");
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
            if (prodArr[j].name == "Lay's Chips") {
                productName == prodArr[j].name;
                res.send(prodArr[j]);
            }
        }
    } catch (error) {
        res.send(error);
    }
});

//comments endpoint
app.get('/comms', async (req, res,) => {
    try {
        const comsCol = db.collection("comments");
        const comsResponse = await comsCol.get();
        const commentList = comsResponse.docs.map(doc => doc.data());
        let comments = [];
        for (let i = 0; i < commentList.length; i++) {
            if (commentList[i].product == productName) {
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

