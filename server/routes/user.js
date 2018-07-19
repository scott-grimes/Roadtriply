const express = require("express");
const router = express.Router(); 
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


router.post('/', (req, res) => {
  console.log("adding user");
  controller
    .addUser(req.body)
    .then(result => {
      if (!result) {
        return res.status(400).send(false);
      }
      console.log('User Added')
      return res.send(result);
    })
});

router.put('/', (req, res) => {
  console.log("updating user");
  res.status(404).send();
});










module.exports = router;