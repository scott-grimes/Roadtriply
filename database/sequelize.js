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


const User = sequelize.define('users', {
  fbid: Sequelize.TEXT,
  username: Sequelize.TEXT
});

sequelize.User = User;




sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {sequelize}


