const cities = require('../lib/citylist').cities;
var names = ['Leisa Labarre',
  'Mardell Mallery',
  'Lieselotte Lawyer',
  'Grayce Gallogly',
  'Velva Varnadoe',
  'Debora Demeter',
  'Rina Ramsey',
  'Russel Risner',
  'Nidia Nice',
  'Charlesetta Cimini',
  'Arcelia Arriaga',
  'Porfirio Pardo',
  'Jeane Joshi',
  'Leonardo Lagarde',
  'Marylin Mckinsey',
  'Karan Krieger',
  'Alina Acey',
  'Amie Adam',
  'Colleen Cali',
  'Goldie Godin',
  'Laurice Leung',
  'Osvaldo Oberholtzer',
  'Carolyne Chiang',
  'Tad Tollison',
  'Cora Chagnon',
  'Elizabet Ebarb',
  'Chris Celestin',
  'Steve Stoddart',
  'Violet Valles',
  'Cleo Canton',
  'Pok Pohlmann',
  'Shellie Streetman',
  'Nila Netzer',
  'Leroy Losey',
  'Earnestine Eakins',
  'Gemma Guerin',
  'Jesse Justus',
  'Jacquie Jellison',
  'Alicia Agostini',
  'Karmen Kucharski',
  'Karrie Konrad',
  'Majorie Membreno',
  'Adriene Atchley',
  'Izola Ignacio',
  'Oren Oatman',
  'Serena Shafer',
  'Irwin Ishee',
  'Vanita Velez',
  'Cleora Coplin',
  'Rita Rudisill'
];

var hour = 1000 * 60 * 60;
var day = 24 * hour;
var jan1st2019 = 1546300800000;

var getRandomTime = () => {
  // returns a random time in Jan 2019, on the hour
  var rHour = Math.floor(Math.random() * 24);
  var rDay = Math.floor(Math.random() * 30);

  return jan1st2019 + rHour * hour + rDay * day;

}

var randFbId = () => Math.floor(Math.random() * 100000000000).toString();

var randRiderCount = () => Math.floor(Math.random() * 4);

var getRandomPhone = ()=>new Array(10).fill().map(x=>Math.floor(Math.random()*10).toString()).join('');

var genRandomUser = (id)=>{
  var username = names[Math.floor(Math.random() * (names.length - 1))];
  var email = username.replace(' ','')+'@gmail.com'
  var fbid = randFbId();
  var phone = getRandomPhone();
  return {username, fbid, id, email, phone};
}

var genRandomRide = (id, driver) => {
  var driverid = driver.id;
  var fromdest = cities[Math.floor(Math.random() * (cities.length - 2))];
  var todest = cities[cities.indexOf(fromdest) + 1];
  var depttime = new Date( getRandomTime() );
  var ridercount = randRiderCount();
  return { driverid, id, fromdest, todest, depttime, ridercount };
}

var genRandomManifest = (id,ride)=>{
  var rideid = ride.id;
  var passengerid = id+ (Math.random()>.5? -1:1);
  var statuscode = Math.floor(Math.random()*2);
  return {rideid, id, passengerid, statuscode};
}

var randomUsers = new Array(30).fill().map((x,i) => genRandomUser(i+1000));
var randomRides = new Array(25).fill().map((x,i)=>genRandomRide(i+1000, randomUsers[i+1]));

var randomManifests = new Array(20).fill().map((x,i)=>genRandomManifest(i+1000,randomRides[i+2]));


const mysql2 = require('mysql2');
const knex = require('knex')({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    user : 'student',     
    password : 'student',
    database : 'db'
  }
})


knex.insert(randomUsers).into('users')
.then(()=>console.log('random users inserted'))
.then(()=> knex.insert(randomRides).into('rides') )
.then(()=>console.log('random rides inserted'))
.then(()=> knex.insert(randomManifests).into('manifests') )
.then(()=>console.log('random manifests inserted'))
.then(()=>console.log('DB reset successfully'))
.catch((err)=>console.log(err));





