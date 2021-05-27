//hold the express app
const express = require('express');
const User = require('./models/user');
const Books = require('./models/books');
const mongoose = require('mongoose');
const app = express();
require('dotenv/config');
const bodyParser = require("body-parser");
var dateFormat = require("dateformat");
const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');


//connecting to our database
//instead of 'process.env.DB_CONNECTION' ==> enter your mongoDB connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch(() => {
        console.log("Connection failed");
    });


app.use(bodyParser.json()); //makes sure we can work with the response

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
});

//create a new user in to our mongodb - make sure email is unique
app.post('/register', (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;

    User.findOne({ email: email }, function(err, existingUser) {
        if (existingUser == null) {
            user.save((err, result) => {
                if (err) {
                    console.log("there is an error in adding user to database");
                    res.send({ result: "fail" });
                } else {
                    console.log("user created!");
                    res.send({ result: "success" });
                }
            })
        } else {
            res.send({ result: "fail. email exists" });
        }
    })
})



//checking if userName and password are the same as in our mongodb. sending result.
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email, password: password }, function(err, existingUser) {
        if (err) {
            console.log(error)
        } else if (existingUser == null) {
            res.send({ result: "fail" });

        } else {
            let payload = { subject: existingUser._id }
            let token = jwt.sign(payload, process.env.SECRET_KEY)
            res.send({ token })
        }
    })
})

//getting userId from token
function getId(req, res, next) {
    const token = req.headers.authorization.slice(7);
    console.log(token);

    const decotedToken = jwt.decode(token);
    const userId = decotedToken.subject;
    return userId;
}

//create a new book entry in to our mongodb- checkin unique
app.post('/add-book', (req, res, next) => {
    const userId = getId(req, res, next);
    const date = req.body.date.toLocaleString().split(',')[0];
    const author = req.body.author;
    const bookName = req.body.bookName;
    const genre = req.body.genre;
    const rank = req.body.rank;

    Books.findOne({ userId: userId, author: author, bookName: bookName }, function(err, existingBook) {
        if (existingBook == null) {
            Books.create({ userId: userId, author: author, bookName: bookName, date: date, genre: genre, rank: rank }, (err, result) => {
                if (err) {
                    console.log("there is an error in adding user to database");
                    res.sendStatus(500);
                }
                res.send({ result: "success" });
            })
        } else {
            res.send({ result: "fail. book exists" });
        }
    })
})

//send books to port 3000/books to show on the table in our front-end
app.get('/books', async(req, res, next) => {
    const userId = getId(req, res, next);
    result = await Books.find({ userId: userId })
    res.json(result);

})

//delete a book from our table
app.post('/delete-book', (req, res, next) => {
    const userId = getId(req, res, next);
    const author = req.body.author;
    const bookName = req.body.bookName;
    Books.deleteOne({ userId: userId, author: author, bookName: bookName }, (err, result) => {
        if (err) {
            res.sendStatus(500);
        }
        res.sendStatus(200);
    })
})

//send password via email if user forgot
app.post('/forgotPassword', (req, res) => {
    const email = req.body.email;
    let savePassword = '';
    User.findOne({ email: email }, function(err, existingUser) {
        if (err) {
            console.log(err)
        } else if (existingUser == null) {
            res.send({ result: "fail" });

        } else {
            savePassword = existingUser.password;
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.MY_EMAIL, //enter your email
                    pass: process.env.PASSWORD //enter your password
                }
            })
            var mailOptions = {
                from: process.env.MY_EMAIL, //enter your email 
                to: email,
                subject: 'Sending password to book-list',
                text: 'your password is:' + savePassword
            }

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            })
            res.send({ result: "success", email: email, password: savePassword });
        }
    })
})


module.exports = app;