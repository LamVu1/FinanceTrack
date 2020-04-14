const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;
const users = require('./routes/api/users');
const transactions = require('./routes/api/transactions');

const passport = require('passport');

//app to respond to json request and other software
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(passport.initialize());
require('./config/passport')(passport);


mongoose
    .connect(db, { useNewUrlParser: true})
    .then(()=>{console.log("Connected to mongoDB")})
    .catch(err => console.log(err))




app.get('/', (req, res)=>{
    res.send('Hello eWorld')
});

app.use("/api/users", users)
app.use("/api/transactions", transactions)

const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`Listening on Port ${PORT}`)
});


