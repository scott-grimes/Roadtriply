const db = require("../database/db");

module.exports = {

  // get a user given their id
  getUserById: ({ id }) => {
    if (id === undefined || id==='') throw ('No id given for user')
    return db.getUserById(id).then(result => {
      if (!result) {
        throw ('No User Found')
      }
      //console.log('User Found')
      return result;
    })
      .catch(err => {
        //console.log(err);
        return false
      });
  },

  // add a user
  addUser: ({ username, password, email, phone }) => {
    if (username === undefined || username === '') throw ('No username supplied for user')
    if (password === undefined || password === "") throw "No password supplied for user";
    if (email === undefined || email === '') throw ('No email supplied for user')
    if (phone === undefined || phone === '') throw ('No phone supplied for user')

    return db.addUser(username, password,email,phone)
      .then(result => {
        if (!result) {
          throw ('User not added')
        }
        //console.log('User Added')
        return result;
      })
      .catch(err => {
        //console.log(err);
        return false;
      });
  },

  // given a user's id, get all of the rides they are driving on 
  getRidesByDriverId : ({driverid}) =>{
    if (driverid === undefined || driverid === '') throw ('No driverid supplied for ride')
    return db.getRidesByDriverId(driverid)
    .then(result => {
      if (!result) {
        throw ('No Rides Found')
      }
      //console.log('Rides Found')
      return result;
    })
      .catch(err => {
        //console.log(err);
        return false
      });
  },

  getRideById: ({id})=>{
    if (id === undefined || id === '') throw ('No id supplied for ride')
    return db.getRideById(id).then(result => {
      if (!result) {
        throw "No Ride Found";
      }
      //console.log("Ride Found");
      return result;
    })
      .catch(err => {
        //console.log(err);
        return false;
      });
  },

  searchRides: ({ fromloc, toloc, depttime})=>{
    if (fromloc === undefined || fromloc === "") throw "No fromloc supplied for ride";
    if (toloc === undefined || toloc === "") throw "No toloc supplied for ride";
    if (depttime === undefined || depttime === "") throw "No depttime supplied for user";
    return db
      .search(fromloc, toloc, depttime)
      .then(result => {
        if (!result) {
          throw "passenger not added";
        }
        //console.log("passenger added");
        return result;
      })
      .catch(err => {
        //console.log(err);
        return false;
      });
  },

  // returns all of the passengers on a given ride
  getAllPassengers: ({rideid})=>{
    if (rideid === undefined || rideid === "") throw "No rideid supplied for passengerlist";
    db.getAllPassengers(rideid)
    .then(result => {
      if (!result) {
        throw "No Passengers Found";
      }
      //console.log("Passengers Found");
      return result;
    })
      .catch(err => {
        //console.log(err);
        return false;
      });
  },


  getNumFreeSlots :({rideid})=>{
    if (rideid === undefined || rideid === "") throw "No rideid supplied for ride";
    return db.getNumFreeSlots(rideid)
    .then(result => {
      console.log('result is ',result)
      if (result === undefined) {
        throw "No Ride Found";
      }
      //console.log("Ride Found");
      return result;
    })
      .catch(err => {
        //console.log(err);
        return false;
      });
  },


  addPassenger: ({passengerid, rideid}) => {
    if (passengerid === undefined || passengerid === "") throw "No passengerid supplied for passenger";
    if (rideid === undefined || rideid === "") throw "No rideid supplied for passenger";
    return db.addPassenger(passengerid,rideid)
      .then(result => {
        //console.log('in addpassenger, result of adding in db',result)
        if (!result) {
          throw "passenger not added";
        }
        //console.log("passenger added");
        return result;
      })
      .catch(err => {
        //console.log(err);
        return false;
      });
  },

  // add the passenger to the ride specified, if there is enough space
  removePassenger: ({passengerid, rideid}) => {
    if (passengerid === undefined || passengerid === "") throw "No passengerid supplied for passenger";
    if (rideid === undefined || rideid === "") throw "No rideid supplied for passenger";
    return db.removePassenger(passengerid, rideid)
    .then(result => {
      if (!result) {
        throw "passenger not removed";
      }
      //console.log("passenger removed");
      return result;
    })
      .catch(err => {
        //console.log(err);
        return false;
      });
  },

  approvePassenger: ({passengerid, rideid}) => {
    if (passengerid === undefined || passengerid === "") throw "No passengerid supplied for passenger";
    if (rideid === undefined || rideid === "") throw "No rideid supplied for passenger";
    return db.approvePassenger(passengerid, rideid).then(result => {
      console.log(result)
      if (!result) {
        throw "pass not approved";
      }
      //console.log("pass approved");
      return result;
    })
      .catch(err => {
        //console.log(err);
        return false
      });
  },

  // get rides a user has requested
  // Returns a list of all the passengers a given ride has (conf/unconfirmed)
  getRidesByPassengerId: ({passengerid}) => {
    if (passengerid === undefined || passengerid === "") throw "No passengerid supplied for rides";
    return db.getRidesByPassengerId(passengerid)
    .then(result => {
      if (!result) {
        throw ('Rides not found')
      }
      //console.log('Rides Found')
      return result
    })
      .catch(err => {
        //console.log(err);
        return false;
      });
  
  },


  // Add ride
  addRide: ({driverid, ridercount, fromloc, toloc, depttimeStr}) => {
    if (driverid === undefined || driverid === "") throw "No driverid supplied for ride";
    if (ridercount === undefined || ridercount === "") throw "No ridercount supplied for ride";
    if (fromloc === undefined || fromloc === "") throw "No fromloc supplied for ride";
    if (toloc === undefined || toloc === "") throw "No toloc supplied for ride";
    if (depttimeStr === undefined || depttimeStr === "") throw "No depttimeStr supplied for ride";
    return db.addRide(driverid, ridercount, fromloc, toloc, depttimeStr).then(result => {
      if (!result) {
        throw "Ride not added";
      }
      //console.log("Ride Added");
      return result;
    })
      .catch(err => {
        //console.log(err);
        return false;
      });
  },

  // loginCorrect: ({ username, password }) => {
  //   if (!username || !password) throw "Invalid Credentials";
  //   if (username === "" || password === "") throw "Invalid Credentials";
  //   return db.userHasPassword(username, password);
  // },

  // updateUser: ({ username, oldpassword, newpassword }) =>
  //   db
  //     .userExists(username)
  //     .then(userExists => {
  //       if (!userExists) {
  //         throw "User does not exist";
  //       }
  //       return db.userHasPassword(username, oldpassword);
  //     })
  //     .then(hasPassword => {
  //       if (!hasPassword) {
  //         throw "Invalid Password";
  //       }
  //       return db.updateUser(username, newpassword);
  //     }),

  // getUserById: id =>
  //   db.getUserById(id).then(user => (user !== undefined ? user : null)),

  // getUserByName: username =>
  //   db.getUserByName(username).then(user => (user !== undefined ? user : null))
};
