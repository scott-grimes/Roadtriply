const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'db',                       // database name
  process.env.DBUSERNAME,     // db username
  process.env.DBPASSWORD,     // db password
  {
    host: process.env.DBHOST, //host
    dialect: 'mysql'
  }
);


// SCHEMAS


const User = sequelize.define('users', {
  fbid: Sequelize.TEXT,
  username: Sequelize.TEXT
});

const Ride = sequelize.define('rides', {
  driverid: Sequelize.INTEGER,
  ridercount: Sequelize.INTEGER,
  toloc: Sequelize.TEXT,
  fromloc: Sequelize.TEXT,
  depttime: Sequelize.TIME
});




sequelize.User = User;
sequelize.Ride = Ride;

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {sequelize}


