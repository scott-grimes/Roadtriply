const {sequelize} = require('./sequelize');


// Add User
const addUser =  (username, fbid) => {

  return sequelize.User.create({
    username:username,
    fbid:fbid
  }).then(()=>{
    console.log('user created')
    return true;
  }
).catch((err)=>{
  console.log(err)
  console.log('Could not create new user')
  return false;
});
};


//sequelize.query()

// Login User
 


// Logout User


// Add ride

const addRide = (driverid, ridercount, fromloc, toloc, depttime )=>{

  return sequelize.Ride.create({
    driverid: driverid,
    ridercount: ridercount,
    toloc: toloc,
    fromloc: fromloc,
    depttime: new Date(depttime)
  }).then(()=>{
    console.log('ride created')
    return true;
  }
).catch((err)=>{
  console.log(err)
  console.log('Could not create new ride')
  return false;
})
}


// Get Ride



// Get rides



// 
module.exports = { addUser, addRide};