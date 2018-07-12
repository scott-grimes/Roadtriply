const {sequelize} = require('./sequelize');


// Add User
const addUser =  (username, fbid)=>{
  // create new user object
  return sequelize.User.create({
    id: Math.floor( Math.random()*100000000 ),
    username:'test dude',
    fbid: 'fdsasdffdsaasdf'
  }).then(()=>{
    console.log('user created')
    return true;
  }
).catch((err)=>{
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