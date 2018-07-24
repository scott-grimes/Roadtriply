const {knex} = require('./knex');
const moment = require('moment');

const self = module.exports = {

  // USER THINGS
  
  // Returns a user based on their id
  getUser : (id)=> 
     knex('users')
    .where('id', id)
    .select().first()
  ,
  // Add User
  addUser :  (username,password,email,phone) => 
     knex('users').where('username',username).select().first()
      .then(user => {
        if (user) {
          throw "User already exists";
        }
      })
      .then(() =>
        knex.insert({ username, password, email, phone }).into("users")
      )
      .then(id => knex('users').where('id',id).select().first() )
  ,

  updateUser: (username, password, email, phone)=>{
    console.log('not implemented')
  },

  // RIDE THINGS
  // Returns the ride by given ID
  getRide: (id) =>
    knex('rides')
      .where('id', id)
      .select().first()

  ,
  // Add ride

  addRide: (driverid, ridercount, fromloc, toloc, depttimeStr) => {
    const depttime = new Date(depttimeStr);
    return knex.insert({ driverid, ridercount, fromloc, toloc, depttime }).into('rides')
      .then((id) => {
        //console.log('added ride',id); 
        return knex('rides').where('id', id).select().first()
      })
  },


  // PASSENGER THINGS
  // add the passenger to the ride specified, if there is enough space
  addPassenger: (passengerid, rideid) => {
    return self.getFreeSlots(rideid)
      .then((freeslots => {
        if (!freeslots) {
          throw ('No Space or Ride does not exist')
        }
      }))
      .then(() => knex('manifests').where({ passengerid, rideid }).select())
      .then((alreadyAsked) => { if (alreadyAsked.length > 0) { throw ('User Already Requested A Ride') } })
      .then(() => knex.insert({ passengerid, rideid, statuscode: 0 }).into('manifests'))
      .then((id) => {
        //console.log('inserted new passenger into db',id); 
        return knex('manifests').where('id', id).select().first()
      })
  },

  // add the passenger to the ride specified, if there is enough space
  removePassenger: (passengerid, rideid) => {
    return knex('manifests').where({ passengerid, rideid }).update({ statuscode: 0 })
      .then((numChanges) => {
        if (numChanges === 0) {
          throw ('Invalid passengerid or rideid')
        }
        //console.log('removed passenger',res); 
        return knex('manifests').where({ passengerid, rideid }).select().first();
      })
  },

  approvePassenger: (passengerid, rideid) => {
    //console.log('approving passenger',passengerid, 'on ride', rideid);
    return self.getFreeSlots(rideid)
      .then((freeslots => {
        if (freeslots <= 0) {
          throw ('No Space to add user')
        }
      }))
      .then(() => knex('manifests').where({ passengerid, rideid }).update({ statuscode: 1 }))
      .then(() => {

        return knex('manifests').where({ passengerid, rideid }).select().first();
      })

  },


  // ACCOUNT THINGS


  // SEARCHING & FILTERING THINGS

  // Returns a list of all rides a driver is scheduled for, along with all of the passengers in the db for each

  usersDrives: (driverid)=>{
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
     return p.then(()=>{
       //console.log('got rides by driver id',driverid); 
       return list});
    });
  },

  // returns all rides meeting the given criteria
  // returns the count of free slots in each ride
  search : ( fromloc, toloc, depttimeStr )=>{
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
        return p.then(()=>{return ridelist;});
    });
  },

  // Returns a list of all the passengers a given ride has (conf/unconfirmed)
  getPassengers : (rideid)=>{
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
    );
  },

  //INTERNAL?
  // Returns num of free slots a ride has
  getFreeSlots : (rideid)=>{
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
      // console.log(confirmedPassengers, 'confirmed passengers');
      // console.log(rideid, " has ", ride.ridercount - confirmedPassengers.length,' free slots');
      return ride.ridercount - confirmedPassengers.length;
    })
  },



  // get rides a user has requested
// Returns a list of all the passengers a given ride has (conf/unconfirmed)
usersRides : (passengerid)=>{
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
    return p.then(()=>{
      //console.log('got rides by pass id'); 
      return manifests});
  })
}




 };