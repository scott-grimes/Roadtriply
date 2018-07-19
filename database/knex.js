let host =  process.env.CLEARDB_DATABASE_URL || 'localhost';
const user = process.env.DBUSERNAME || 'student';    
const password = process.env.DBPASSWORD || 'student';
let db = process.env.DBNAME || 'db';
 
let knex;
knex = require('knex')({
    client: 'mysql2',
    connection: {
      host: host,
      user : user,  
      password : password,
      database: db
    }
  });

if(false){
  console.log('resetting database')
  
  knex.schema.raw(`-- ---
  -- Globals
  -- ---
  
  -- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
  -- SET FOREIGN_KEY_CHECKS=0;
  
  -- ---
  -- Table 'users'
  -- 
  -- ---
  
  DROP DATABASE IF EXISTS db;
  
  CREATE DATABASE db;
  
  USE db;
  
  DROP TABLE IF EXISTS 'users';
      
  CREATE TABLE 'users' (
    'id' INTEGER AUTO_INCREMENT NOT NULL,
    'createdAt' TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    'updatedAt' TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    'password' TEXT,
    'username' TEXT,
    'email' TEXT,
    'phone' TEXT,
    PRIMARY KEY ('id')
  );
  
  ALTER TABLE users AUTO_INCREMENT = 1000;
  
  DROP TABLE IF EXISTS 'rides';
  
  CREATE TABLE 'rides' (
    'id' INTEGER AUTO_INCREMENT NOT NULL,
    'createdAt' TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    'updatedAt' TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    'driverid' INTEGER,
    'ridercount' INTEGER,
    'fromloc' TEXT,
    'toloc' TEXT,
    'depttime' TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ('id')
  );
  
  ALTER TABLE rides AUTO_INCREMENT = 1000;
  
  CREATE TABLE 'manifests' (
    'id' INTEGER AUTO_INCREMENT NOT NULL,
    'createdAt' TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    'updatedAt' TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    'rideid' INTEGER,
    'passengerid' INTEGER,
    'statuscode' INTEGER,
    PRIMARY KEY ('id')
  );
  
  ALTER TABLE manifests AUTO_INCREMENT = 1000;
  
  -- ---
  -- Foreign Keys 
  -- ---
  
  
  -- ---
  -- Table Properties
  -- ---
  
  -- ALTER TABLE 'users' ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
  
  -- ---
  -- Test Data
  -- ---
  
  -- INSERT INTO 'users' ('id') VALUES
  -- ('');
  `);





}

//knex.schema.raw('USE db');
console.log('database connected!')



// .then(() => {
//     console.log('Database connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

module.exports = {knex}


