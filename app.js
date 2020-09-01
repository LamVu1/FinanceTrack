  const express = require('express');
  const path = require('path');
  const app = express();
  const db = require('./config/keys').mongoURI;
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const passport = require('passport');


  const users = require('./routes/api/users');
  const transactions = require('./routes/api/transactions');



  mongoose
      .connect(db, { useNewUrlParser: true})
      .then(()=>{console.log("Connected to mongoDB")})
      .catch(err => console.log(err))


  if (process.env.NODE_ENV === 'production') {
      app.use(express.static('frontend/build'));
      app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
      })
    }


    app.use(passport.initialize());
    require('./config/passport')(passport);

  //app to respond to json request and other software
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());








  app.get('/', (req, res)=>{
      res.send('Hello eWorld')
  });

  app.use("/api/users", users)
  app.use("/api/transactions", transactions)

  const PORT = process.env.PORT || 5000;


  app.listen(PORT, ()=>{
      console.log(`Listening on Port ${PORT}`)
  });


