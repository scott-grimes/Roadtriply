require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
require('./database/knex');
const passport = require('passport')
const db = require('./database/db');
const controller = require('./controller');
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
app.post('/test',(req,res)=>{

  let user = 
  db.getUser( req.body.fbid )
  .then(res=> {user=res})
  .then(()=>{
     console.log(user)
  console.log(typeof user)
  res.send(JSON.stringify(user));
  })
 
})

// UNAUTHENTICATED

app.get('/ride', (req,res)=>{
  res.status(200).send('heres a ride!')
});
 
app.get('/user', (req,res)=>{
  res.status(200).send('heres a user!')
});

app.post('/signup',(req,res)=>{

  console.log(req.body)
  const {username, fbid } = req.body;
  if(!req.body || !username || !fbid ){

    res.status(400).send('Must have credentials to signup')

  }else{

    controller.addUser(req,res,username,fbid);

  }
  
})

// app.post('/login', passport.authenticate('mySignup',{
//   successRedirect : '/account', // redirect to the secure profile section
//   failureRedirect : '/signup', // redirect back to the signup page if there is an error
        
// }));

// AUTHENTICATED

app.get('/account',isLoggedIn, (req,res)=>{

res.status(200).send('you are logged in heres your account')
});

app.post('/ride', isLoggedIn, (req,res)=>{
  
  console.log(req.body);
  const {ridercount, fromloc, toloc, depttime} = req.body;
  if(!ridercount|| !fromloc|| !toloc|| !depttime){

    res.status(400).send('Not enough info given to add ride')

  }else{

    controller.addRide(req,res,ridercount, fromloc, toloc, depttime);

  }

});

app.post('/logout', isLoggedIn, (req,res)=>{
  req.session.destroy(function (err) {
    if(err){
      console.log(err)
    }else{
      res.redirect('/'); 
    }
  });
});

// START SERVER

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));