const {knex} = require('./knex');
const moment = require('moment');

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
    .then((userid)=>self.getUserById(userid))
    .catch((err)=>null)
  },

  // Returns a list of all rides a driver is scheduled for, along with all of the passengers in the db for each

  getRidesByDriverId: (driverid)=>{
    let user;
    return self.getUserById(driverid)
    .then(res=>{
      if(!res){
        throw('User does not exist');
      }
      user = res;
      console.log('found user in db', user)
    })
    .then(()=>knex('rides')
    .where('driverid', user.id)
    .select())
    .then(list=>{
      
      let p = Promise.resolve();

      list.forEach((ride,index)=>{
        
        p = p.then(()=>{
          return self.getAllPassengers(ride.id)
          .then((passengers)=>{
            list[index]['passengers'] = passengers;
          })
        })

        
      })
      
     return p.then(()=>list);
      
    });
  },

  // Returns the ride by given ID
  getRideById : (id)=>{
    return knex('rides')
    .where('id', id)
    .select().first();
  },

  // returns all rides meeting the given criteria
  // returns the count of free slots in each ride
  searchRides : ( fromloc, toloc, depttimeStr )=>{
    let starttime = moment.utc(depttimeStr);
    
    starttime = starttime.add(1,'minutes');
    starttime = starttime.toDate();

    var endtime = moment.utc(starttime)
    endtime = endtime.add(1,'days')
    endtime = endtime.toDate();
    
    return knex('rides')
    .whereBetween('depttime', [starttime, endtime])
    .andWhere({'fromloc': fromloc, 'toloc':toloc})
    .select()
    .then(ridelist=>{

        let p = Promise.resolve();

        ridelist.forEach((ride,ind)=>{
          
          p = p.then( ()=>self.getNumFreeSlots(ride.id)
          .then(freeslots=>{
            ridelist[ind]['freeslots'] = freeslots;
          }));
        });
        return p.then(()=>ridelist);
    });
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
    .then(()=>knex.find('mainifests').where({passengerid,rideid}).select())
    .then((alreadyAsked)=>{console.log(alreadyAsked)})
    .then(()=>knex.insert({passengerid,rideid, statuscode:0}).into('manifests'))
    .then(()=>true)
    .catch(()=>false)
  },

 // add the passenger to the ride specified, if there is enough space
 removePassenger : (passengerid, rideid)=>{
  return self.getNumFreeSlots(rideid)
  .then((freeslots=>{
    if(!freeslots){
      throw('No Space to add user')
    }
  }))
  .then(()=>knex('manifests').where({passengerid,rideid}).update({statuscode:0}))
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

  // get rides a user has requested
// Returns a list of all the passengers a given ride has (conf/unconfirmed)
getRidesByPassengerId : (passengerid)=>{
  return knex('manifests')
    .where('passengerid', passengerid)
    .select()
    .then(manifests=>{
        // adds info from the ride to our manifest

        let p = Promise.resolve()

        manifests.forEach((manifest,index)=>{
          p = p.then(()=>self.getRideById(manifest.rideid)
          .then(ride=>{
            let {fromloc, toloc, depttime} = ride;
            manifests[index].ride = {fromloc,toloc,depttime};
            }));
            
     
    });
    return p.then(()=>manifests);
  })
  .catch(()=>null)
},


// Add ride

 addRide :(driverid, ridercount, fromloc, toloc, depttimeStr )=>{
  const depttime = new Date(depttimeStr);
  return knex.insert({driverid, ridercount, fromloc, toloc, depttime}).into('rides')
  .then((res)=>true)
  .catch((err)=>{console.log(err); return false;});
  
}

 };