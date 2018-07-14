let host =  process.env.DBHOST || 'localhost';
const user = process.env.DBUSERNAME || 'student';    
const password = process.env.DBPASSWORD || 'student';
let db = process.env.DBNAME || 'db';

if(process.env.NODE_ENV && process.env.NODE_ENV === 'test'){
  db = 'testdb';
}

const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: host,
    user : user,  
    password : password,
    database : db
  }
});


// .then(() => {
//     console.log('Database connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

module.exports = {knex}


