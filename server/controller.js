const db = require("../database/db");

module.exports = {

  getUserById: ({ id }) => {
    if (id === undefined || id==='') throw ('No id given for user')
    return db.getUserById(id);
  },

  addUser: ({ username, password, email, phone }) => {
    if (username === undefined || username === '') throw ('No username supplied for user')
    if (password === undefined || password === "") throw "No password supplied for user";
    if (email === undefined || email === '') throw ('No email supplied for user')
    if (phone === undefined || phone === '') throw ('No phone supplied for user')

    return db.addUser(username, password,email,phone);
  },

  getRidesByDriverId : ({driverid}) =>{
    if (driverid === undefined || driverid === '') throw ('No driverid supplied for ride')
    return db.getRidesByDriverId(driverid);
  },

  getRideById: ({id})=>{
    if (id === undefined || id === '') throw ('No id supplied for ride')
    return db.getRideById(id);
  },

  searchRides: ({fromloc, toloc, depttimeStr})=>{
    if (fromloc === undefined || fromloc === "") throw "No fromloc supplied for ride";
    if (toloc === undefined || toloc === "") throw "No toloc supplied for ride";
    if (depttimeStr === undefined || depttimeStr === "") throw "No depttimeStr supplied for user";
    return searchRides(fromloc,toloc,depttimeStr);
  },
  getAllPassengers: ({rideid})=>{
    if (rideid === undefined || rideid === "") throw "No rideid supplied for passengerlist";
    db.getAllPassengers(rideid);
  },

  getNumFreeSlots :({rideid})=>{
    if (rideid === undefined || rideid === "") throw "No rideid supplied for ride";
    return db.getNumFreeSlots(rideid);
  },
  addPassenger: ({passengerid, rideid}) => {
    if (passengerid === undefined || passengerid === "") throw "No passengerid supplied for passenger";
    if (rideid === undefined || rideid === "") throw "No rideid supplied for passenger";
    return db.addPassenger(passengerid,rideid)
  },

  // add the passenger to the ride specified, if there is enough space
  removePassenger: ({passengerid, rideid}) => {
    if (passengerid === undefined || passengerid === "") throw "No passengerid supplied for passenger";
    if (rideid === undefined || rideid === "") throw "No rideid supplied for passenger";
    return db.removePassenger(passengerid,rideid);
  },

  approvePassenger: ({passengerid, rideid}) => {
    if (passengerid === undefined || passengerid === "") throw "No passengerid supplied for passenger";
    if (rideid === undefined || rideid === "") throw "No rideid supplied for passenger";
   return db.approvePassenger(passengerid,rideid);
  },

  // get rides a user has requested
  // Returns a list of all the passengers a given ride has (conf/unconfirmed)
  getRidesByPassengerId: ({passengerid}) => {
    if (passengerid === undefined || passengerid === "") throw "No passengerid supplied for rides";
   return db.getRidesByPassengerId(passengerid)
  
  },


  // Add ride

  addRide: ({driverid, ridercount, fromloc, toloc, depttimeStr}) => {
    if (driverid === undefined || driverid === "") throw "No driverid supplied for ride";
    if (ridercount === undefined || ridercount === "") throw "No ridercount supplied for ride";
    if (fromloc === undefined || fromloc === "") throw "No fromloc supplied for ride";
    if (toloc === undefined || toloc === "") throw "No toloc supplied for ride";
    if (depttimeStr === undefined || depttimeStr === "") throw "No depttimeStr supplied for ride";
    return db.addRide(driverid,ridercount,fromloc,toloc,depttimeStr);
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
