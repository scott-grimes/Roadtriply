const {knex} = require('./knex');
const moment = require('moment');

const self = module.exports = {

  // Returns a user based on their fbid
  getUserByFbid : (fbid)=> {
    return knex('users')
    .where('fbid', fbid)
    .select().first()
    .then(res=>{console.log('got user',res); return res;});
  },

  // Returns a user based on their id
  getUserById : (id)=> {
    return knex('users')
    .where('id', id)
    .select().first()
      .then(res => {
        console.log('got user', res); return res;});
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
    .then((userid)=>{console.log('added user', userid); return self.getUserById(userid)})
    .catch((err)=>{console.log(err) return null});
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
      
     return p.then(()=>{console.log('got rides by driver id',list); return list});
      
    });
  },

  // Returns the ride by given ID
  getRideById : (id)=>{
    return knex('rides')
    .where('id', id)
    .select().first()
      .then(res => {
        console.log('got ride', res); return res});
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
          
          p = p.then( ()=>knex('manifests').where({'rideid': ride.id})
          .select()
          .then(manifest=>{
              let confirmedPassengers = manifest.reduce((sum,ride)=>ride.statuscode+sum,0);
              ridelist[ind].freeslots = ridelist[ind].ridercount - confirmedPassengers;
              ridelist[ind].passengers = manifest.map(e=>{return {passengerid:e.passengerid, statuscode:e.statuscode}});
          }));
        });
        return p.then(()=>{console.log('got ridelist', ridelist) return ridelist;});
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
      .then((res)=>{console.log('got all passengers',res); return res;})
    )
    .catch((err)=>{console.log(err) return null})
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
      console.log('got num free slots')
      return ride.ridercount - confirmedPassengers.length;
    })
    .catch((err)=>{console.log(err); return null})
  },

  // add the passenger to the ride specified, if there is enough space
  addPassenger : (passengerid, rideid)=>{
    return self.getNumFreeSlots(rideid)
    .then((freeslots=>{
      if(!freeslots){
        throw('No Space or Ride does not exist')
      }
    }))
    .then(()=>knex('manifests').where({passengerid,rideid}).select())
    .then((alreadyAsked)=>{if(alreadyAsked.length>0){throw('User Already Requested A Ride')}})
    .then(()=>knex.insert({passengerid,rideid, statuscode:0}).into('manifests'))
    .then(()=>{console.log('inserted new passenger into db'); return true})
    .catch((err)=>{console.log(err); return false})
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
  .then(()=>{console.log('removed passenger'); return 200;})
  .catch((err)=>{console.log(err); return 400})
},

  approvePassenger : (passengerid, rideid)=>{
    return self.getNumFreeSlots(rideid)
    .then((freeslots=>{
      if(!freeslots){
        throw('No Space to add user')
      }
    }))
    .then(()=>knex('manifests').where({passengerid,rideid}).update({statuscode:1}))
    .then(()=>{console.log('approved passenger'); return 200})
    .catch((err)=>{console.log(err); return 400;})
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
    return p.then(()=>{console.log('got rides by pass id'); return manifests});
  })
  .catch((err)=>{console.log(err); return null})
},


// Add ride

 addRide :(driverid, ridercount, fromloc, toloc, depttimeStr )=>{
  const depttime = new Date(depttimeStr);
  return knex.insert({driverid, ridercount, fromloc, toloc, depttime}).into('rides')
  .then((res)=>{console.log('added ride'); return true})
  .catch((err)=>{console.log(err); return false;});
  
}

 };