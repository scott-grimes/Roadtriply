require("dotenv").config();
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
//const { passport } = require("./passport");
const passenger = require("./routes/passenger");
const ride = require("./routes/ride");
const rides = require("./routes/rides");
const user = require("./routes/user");
const port = process.env.PORT || 1337;

// SETUP
const app = express();
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
//app.use(passport.initialize());
//app.use(passport.session());

// ENDPOINTS
app.use("/user", user);
app.use("/ride", ride);
app.use("/rides", rides);
app.use("/passenger", passenger);


app.get("/test", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});


app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => console.log(`Listening on port ${port}`));






// require('dotenv').config();
// const path = require('path')
// const express = require('express');
// const bodyParser = require('body-parser');
// const {knex} = require('../database/knex');
// const db = require('../database/db');
// //const passport = require('passport')
// //require('./database/passport')(passport);

// // SETUP
// const app = express();
// app.use(bodyParser.json());
// const port = process.env.PORT || 1337;

// // MIDDLEWARE
// function isLoggedIn(req, res, next) {
//   return next();
//   if (req.isAuthenticated())
//       return next();
//   res.redirect('/login');
// }

// // ENDPOINTS
// app.get('/test',(req,res)=>{
//   db.getNumFreeSlots( req.query.id )
//   .then((ans)=>{
//      console.log(ans)
//   console.log(typeof ans)
//   res.send(ans);
//   })
// })

// // UNAUTHENTICATED

// // Search for all rides meeting the given specifications
// // returns the rides, plus a list of all the passenger ids associated with the rides
// app.get('/rides', (req,res)=>{
//   let rides;
 
//   const {fromloc, toloc, depttime} = req.query;

//   if(!fromloc || !toloc || !depttime){
//     res.status(400).send('Quer(ies) missing!')
//     return;
//   }

//   db.searchRides(fromloc, toloc, depttime)
//   .then(result=>{
//     if(!result){
//       res.status(400).send('No ride exists with that id');
//     }
//     rides = result;
//   })
//   .then(()=>{
//     res.status(200).send(rides);
//   });
// });

// // GET RIDE BY ID (includes # free slots)
// app.get('/ride', (req,res)=>{
//   let ride;
//   if(!req.query.id){
//     res.status(400).send('No ride id specified');
//     return;
//   }
//   db.getRideById(req.query.id)
//   .then(result=>{
//     if(!result){
//       res.status(400).send('No ride exists with that id');
//     }
//     ride = result;
//   })
//   .then(()=>db.getNumFreeSlots(ride.id))
//   .then(freeslots=>{
//     ride['freeslots'] = freeslots;
//     res.status(200).send(ride);
//   });
// });

// // GET USER BY ID
// app.get('/user', (req,res)=>{
//   if(!req.query.id){
//     res.status(400).send('No user id specified');
//     return;
//   }

//   db.getUserById(req.query.id)
//   .then(result=>{
//     if(!result){
//       res.status(400).send('No user exists with that id');
//     }
//     else{
//       res.status(200).send(result);
//     }
//   });
// });


// app.post('/login', (req,res)=>{
//     const {email, fbid} = req.body;

//     if(!email || !fbid){
//       res.status(400).send();
//       return;
//     }
//     knex('users')
//     .where({'fbid':fbid,'email':email})
//     .select('*')
//     .then(result=>{
//       res.send(result)
//     })


// });

// // app.post('/login', passport.authenticate('mySignup',{
// //   successRedirect : '/account', // redirect to the secure profile section
// //   failureRedirect : '/signup', // redirect back to the signup page if there is an error
        
// // }));

// // AUTHENTICATED

// // GET ALL PASSENGERS ON A RIDE (user must present the drivers fbid)

// app.get('/manifest',(req,res)=>{
//   const rideid = req.query.id;
//   if(!req.body || !rideid){
//     res.status(400).send('Invalid Credentials or Ride Id')
//   }else{

//     db.getAllPassengers(rideid)
//     .then(list=>{
//       if(!list){
//         res.status(400).send('Ride does not exist')
//       }
//       else{
//         res.status(200).send(list)
//       }
//     })

//   }


// })

// // ADD NEW RIDER TO A RIDE


// // ADD NEW USER TO DB
// app.post('/user',(req,res)=>{

//   const {username,fbid,email,phone} = req.body;
//   if(!req.body || !username || !fbid || !email || !phone){
//     res.status(400).send('Must have credentials to signup')
//   }else{
//     db.addUser(username,fbid,email,phone)
//     .then(user=>{
//       if(!user){
//         res.status(400).send(null);
//         return;
//       }
//       res.status(201).send(user)
//     })

//   }
  
// })

// // ADD NEW PASSENGER TO RIDE
// app.post('/addpassenger',(req,res)=>{

//   const {passengerid, rideid} = req.body;
//   if(!req.body || !passengerid || !rideid){

//     res.status(400).send('Invalid credentials or ride id')

//   }else{
//     console.log('adding ',passengerid,rideid)
//     db.addPassenger(passengerid, rideid)
//     .then(added=>{
//       console.log(added)
//       if(!added){
//         res.status(200).send(false);
//         return;
//       }
//       res.status(200).send(true)
//     })

//   }
  
// });

// // ADD NEW PASSENGER TO RIDE
// app.post('/approvepassenger', (req, res) => {

//   const { passengerid, rideid } = req.body;
//   if (!req.body || !passengerid || !rideid) {

//     res.status(400).send('Invalid credentials or ride id')

//   } else {
//     console.log('approving ', passengerid, rideid)
//     db.approvePassenger(passengerid, rideid)
//       .then(approved => {
//         console.log(approved);
//         if (!approved) {
//           res.status(200).send(false);
//           return;
//         }
//         res.status(200).send(true)
//       })

//   }

// });

// // REMOVE PASSENGER FROM RIDE
// app.post("/removepassenger", (req, res) => {
//   const { passengerid, rideid } = req.body;
//   if (!req.body || !passengerid || !rideid) {
//     res.status(400).send("Invalid credentials or ride id");
//   } else {
//     console.log("removing ", passengerid, rideid);
//     db.removePassenger(passengerid, rideid).then(removed => {
//       if (!removed) {
//         res.status(200).send(false);
//         return;
//       }
//       res.status(200).send(true);
//     });
//   }
// });



// // SHOW LOGGED IN USERS ACCOUNT
// // app.get('/account',isLoggedIn, (req,res)=>{

// // res.status(200).send('you are logged in heres your account')
// // });

// app.post('/ride', isLoggedIn, (req,res)=>{
  
//   const {driverid, ridercount, fromloc, toloc, depttime} = req.body;
//   if(!ridercount|| !fromloc|| !toloc|| !depttime || !driverid){

//     res.status(400).send('Not enough info given to add ride')

//   }else{

//     db.addRide(driverid, ridercount, fromloc, toloc, depttime)
//     .then((result)=>{
//       if(!result){
//         res.status(400).send(false)
//         return;
//       }
//       res.status(201).send(true)
//     });


//   }

// });

// // get all of a users rides, where the user is the driver
// app.post('/ridesbydriver',(req,res)=>{
//   if(!req.body || !req.body.id){
//     res.status(400).send('Invalid Request')
//     return;
//   }


//   // NEED AUTH IN HERE
  
//   db.getRidesByDriverId(req.body.id)
//   .then(response=>{
//     res.send(response)
//   })
//   .catch(err=>{console.log(err); res.status(400).send(err)})


// });

// // get all of the users rides, where the user is a rider
// app.post('/ridesbyuser',(req,res)=>{
//   if(!req.body || !req.body.id){
//     res.status(400).send('Invalid Request')
//     return;
//   }

//   // NEED AUTH IN HERE
  
//   db.getRidesByPassengerId(req.body.id)
//     .then(response => {
//       console.log(response);
//       res.send(response);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(400).send(err);
//     });


// });




// app.get('/account', (req,res)=>{
  
// });
// app.get('/logout', (req,res)=>{
//   // req.session.destroy(function (err) {
//   //   if(err){
//   //     console.log(err)
//   //   }else{
//   //     res.redirect('/'); 
//   //   }
//   // });
//   res.send();
// });

// app.post('/logout', (req,res)=>{
//   // req.session.destroy(function (err) {
//   //   if(err){
//   //     console.log(err)
//   //   }else{
//   //     res.redirect('/'); 
//   //   }
//   // });
//   res.send();
// });

// // START SERVER


// app.use(express.static(path.join(__dirname, '../client/dist')));
// app.get('*',(req,res)=>{
//   res.redirect('/')
// })
// app.listen(port, () => console.log(`Listening on port ${port}`));