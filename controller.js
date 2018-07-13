const db = require('./database/db')
module.exports = {

    addUser : (req,res,username,fbid)=>{
      db.addUser(username, fbid)
      .then(result=>{
        console.log(result)
        if(result){
          res.status(200).send('user signed up');
        }else{
          res.status(400).send('user signup failed');
        }
      });
    },


    addRide : (req,res,ridercount, fromloc, toloc, depttime)=>{

      req.id = 'fakeuserid';
      driverid = req.id;

      db.addRide(driverid, ridercount, fromloc, toloc, depttime)
      .then(result=>{
        console.log(result)
        if(result){
          res.status(200).send('user signed up');
        }else{
          res.status(400).send('user signup failed');
        }
      });
    }

























}

