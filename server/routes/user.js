const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcrypt");
const controller = require('../controller');


router.get('/',(req,res)=>{
  console.log(req.query)
  if(req.query.id){
    console.log("get user by id");
    controller
      .getUserById(req.query)
      .then(result => {
        if (!result) {
          res.status(400).send(false);
        }
        console.log('User Found')
        return res.send(result);
      })
  }

  else if(req.query.name){
    res.status(404).send()
    return
  }else{
    res.status(400).send();
  }

  
 
});


router.post("/", (req, res) => {
  console.log("adding user");
  const { email, phone, username} = req.body;
  bcrypt.hash(req.body.password, 10).then(hash => {
    controller
      .addUser({ username, email,phone, password: hash })
      .then(result => {
        console.log("success");
        passport.authenticate("local", (err, user, info) => {
          if (err) {
            console.log(err);
            res.send(false);
            return;
          }
          if (!user) {
            console.log("user login failed");
            return res.send(false);
          }
          req.logIn(user, err => {
            if (err) {
              console.log(err);
              return next(err);
            }
            return res.send({ id: user.id, username: user.username });
          });
        })(req, res);
      })
      .catch(err => {
        console.log(err);
        return res.send(false);
      });
  });
});

router.put('/', (req, res) => {
  console.log("updating user");
  res.status(404).send();
});










module.exports = router;