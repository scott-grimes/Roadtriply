const {sequelize} = require('./sequelize');


// Add User
const addUser =  (username, fbid) => {
  // create new user object
  console.log(sequelize.User);
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
})
}

//sequelize.query()

// Login User
 


// Logout User


// Add ride


// Get Ride



// Get rides



// 
module.exports.addUser = addUser;