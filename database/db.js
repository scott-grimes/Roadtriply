const {knex} = require('./knex');
const self = module.exports = {

  // Returns a user based on their fbid
  getUserByFbid : (fbid)=> {
    return knex('users')
    .where('fbid', fbid)
    .select().first();
  },

  // Returns a user based on their id
  getUserById : (id)=> {
    return knex('users')
    .where('id', id)
    .select().first();
  },

  // Add User
  addUser :  (username,fbid,email,phone) => {
    return self.getUserByFbid(fbid)
    .then(user=>{
      if(user){
        throw('User already exists');
      }}
    )
    .then(()=>knex.insert({username,fbid,email,phone}).into('users'))
    .then(()=>200)
    .catch(()=>409)
  },

  // Returns a list of all rides a driver is scheduled for
  getRidesByDriverId: (driverid)=>{
    let user;
    return self.getUserById(driverid)
    .then(res=>{
      if(!res){
        throw('User already exists');
      }
      user = res;
    })
    .then(()=>knex('rides')
    .where('driverid', user.fbid)
    .select());
  },

  // Returns the ride by given ID
  getRideById : (id)=>{
    return knex('rides')
    .where('id', id)
    .select().first();
  },

  // Returns a list of all the passengers a given ride has (conf/unconfirmed)
  getAllPassengers : (rideid)=>{
    return self.getRideById(rideid)
    .then(res=>{
      if(!res){
        throw('Ride does not exist');
      }
    })
    .then(()=>
      knex('manifests')
      .where('rideid', rideid)
      .select()
    )
    .catch(()=>null)
  },

  // Returns num of free slots a ride has
  getNumFreeSlots : (rideid)=>{
    let ride;
    return self.getRideById(rideid)
    .then(res=>{
      if(!res){
        throw('Ride does not exist');
      }
      ride = res;
    })
    .then(()=>
      knex('manifests')
      .where({'rideid': rideid, 'statuscode':1})
      .select()
    )
    .then((confirmedPassengers)=>{
      return ride.ridercount - confirmedPassengers.length;
    })
    .catch(()=>null)
  },

  // add the passenger to the ride specified, if there is enough space
  addPassenger : (passengerid, rideid)=>{
    return self.getNumFreeSlots(rideid)
    .then((freeslots=>{
      if(!freeslots){
        throw('No Space or Ride does not exist')
      }
    }))
    .then(()=>knex.insert({passengerid,rideid, statuscode:0}).into('manifests'))
    .then(()=>200)
    .catch(()=>400)
  },

  approvePassenger : (passengerid, rideid)=>{
    return self.getNumFreeSlots(rideid)
    .then((freeslots=>{
      if(!freeslots){
        throw('No Space to add user')
      }
    }))
    .then(()=>knex('manifests').where({passengerid,rideid}).update({statuscode:1}))
    .then(()=>200)
    .catch(()=>400)
  },



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