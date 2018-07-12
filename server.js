require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
require('./database/sequelize');
const passport = require('passport')
const db = require('./database/db');
//require('./database/passport')(passport);

// SETUP
const app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 1337;

// MIDDLEWARE
function isLoggedIn(req, res, next) {
  return next();
  if (req.isAuthenticated())
      return next();
  res.redirect('/login');
}

// ENDPOINTS

// UNAUTHENTICATED

app.get('/ride', (req,res)=>{
  res.status(200).send('heres a ride!')
});

app.get('/user', (req,res)=>{
  res.status(200).send('heres a user!')
});

app.get('/signup',(req,res)=>{
  res.status(200).send('heres the signup page');
})

app.post('/signup',(req,res)=>{
  console.log(req.body)
  db.addUser()
  .then(result=>{
    if(result){
      res.status(200).send('user signed up');
    }else{
      res.status(400).send('user signup failed');
    }
  })
  
})

// app.post('/login', passport.authenticate('mySignup',{
//   successRedirect : '/account', // redirect to the secure profile section
//   failureRedirect : '/signup', // redirect back to the signup page if there is an error
        
// }));

// AUTHENTICATED

app.get('/account',isLoggedIn, (req,res)=>{
res.status(200).send('you are logged in heres your account')
});

app.post('/logout', isLoggedIn, (req,res)=>{
  res.status(200).send('logout success')
});

// START SERVER

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));