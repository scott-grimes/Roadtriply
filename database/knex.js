const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: process.env.DBHOST,
    user : process.env.DBUSERNAME,     
    password : process.env.DBPASSWORD,
    database : 'db'
  }
});


// .then(() => {
//     console.log('Database connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

module.exports = {knex}


