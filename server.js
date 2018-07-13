require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
require('./database/knex');
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
app.post('/test',(req,res)=>{

  let user;
  db.getUser( req.body.fbid )
  .then(res=> {user=res})
  .then(()=>{
     console.log(user)
  console.log(typeof user)
  res.send(JSON.stringify(user));
  })
 
})

// UNAUTHENTICATED

// GET RIDE BY ID
app.get('/ride', (req,res)=>{
  if(!req.query.id){
    res.status(400).send('No ride id specified');
  }else{
    db.getRideById(req.query.id)
    .then(result=>{
      if(!result){
        res.status(400).send('No ride exists with that id');
      }
      else{
        res.status(200).send(result);
      }
    })
  }
});

// GET USER BY ID
app.get('/user', (req,res)=>{
  if(!req.query.id){
    res.status(400).send('No user id specified');
  }else{
    db.getUserById(req.query.id)
    .then(result=>{
      if(!result){
        res.status(400).send('No user exists with that id');
      }
      else{
        res.status(200).send(result);
      }
    })
  }
});


// app.post('/login', passport.authenticate('mySignup',{
//   successRedirect : '/account', // redirect to the secure profile section
//   failureRedirect : '/signup', // redirect back to the signup page if there is an error
        
// }));

// AUTHENTICATED

// GET ALL PASSENGERS ON A RIDE (user must present the drivers fbid)

app.get('/manifest',(req,res)=>{
  const rideid = req.query.id;
  if(!req.body || !rideid){
    res.status(400).send('Invalid Credentials or Ride Id')
  }else{

    db.getAllPassengers(rideid)
    .then(list=>{
      if(!list){
        res.status(400).send('Ride does not exist')
      }
      else{
        res.status(200).send(list)
      }
    })

  }


})

// ADD NEW USER TO DB
app.post('/user',(req,res)=>{

  const {username,fbid,email,phone} = req.body;
  if(!req.body || !username || !fbid || !email || !phone){

    res.status(400).send('Must have credentials to signup')

  }else{

    db.addUser(username,fbid,email,phone)
    .then(rescode=>{
      res.status(rescode).send()
    })

  }
  
})

// SHOW LOGGED IN USERS ACCOUNT
// app.get('/account',isLoggedIn, (req,res)=>{

// res.status(200).send('you are logged in heres your account')
// });

app.post('/ride', isLoggedIn, (req,res)=>{
  
  console.log(req.body);
  const {ridercount, fromloc, toloc, depttime} = req.body;
  if(!ridercount|| !fromloc|| !toloc|| !depttime){

    res.status(400).send('Not enough info given to add ride')

  }else{

    controller.addRide(req,res,ridercount, fromloc, toloc, depttime);

  }

});

// app.post('/logout', isLoggedIn, (req,res)=>{
//   req.session.destroy(function (err) {
//     if(err){
//       console.log(err)
//     }else{
//       res.redirect('/'); 
//     }
//   });
// });

// START SERVER

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));