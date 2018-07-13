const {knex} = require('./knex');
module.exports = {
// Add User
 addUser :  (username,fbid,email,phone) => {
  return getUser(fbid)
  .then(user=>{
    if(user){
      throw('User already exists');
    }}
  )
  .then(knex.insert({username,fbid,email,phone}).into('users'))
  .then(()=>200)
  .catch(()=>409)
  
},

// Returns a user based on their fbid
 getUser : (fbid)=> {
  return knex('users')
  .where('fbid', fbid)
  .select().first();
},


//sequelize.query()

// Login User
 


// Logout User


// Add ride

 addRide :(driverid, ridercount, fromloc, toloc, depttime )=>{
return;
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
 };