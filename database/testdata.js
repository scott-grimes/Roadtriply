const cities = require('../lib/citylist').cities;
let rideID = 1000;
let userID = 1000;
let manifestID = 1000;
const names = ['Leisa Labarre',
  'Mardell Mallery',
  'Lieselotte Lawyer',
  'Grayce Gallogly',
  'Velva constnadoe',
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

const hour = 1000 * 60 * 60;
const day = 24 * hour;
const jan1st2019 = 1546300800000;

const getRandomTime = () => {
  // returns a random time in Jan 2019, on the hour
  const rHour = Math.floor(Math.random() * 24);
  const rDay = Math.floor(Math.random() * 30);

  return jan1st2019 + rHour * hour + rDay * day;

}

const randFbId = () => Math.floor(Math.random() * 100000000000).toString();

const randRiderCount = () => Math.floor(Math.random() * 4)+1;

const getRandomPhone = ()=>new Array(10).fill().map(x=>Math.floor(Math.random()*10).toString()).join('');

const genRandomUser = ()=>{
  const username = names[Math.floor(Math.random() * (names.length - 1))];
  const email = username.replace(' ','')+'@gmail.com'
  const fbid = randFbId();
  const phone = getRandomPhone();
  const id = userID;

  userID++;
  return {username, fbid, id, email, phone};
}

const genRandomRide = () => {
  const driverid = randomUsers[  Math.floor(Math.random()*randomUsers.length) ].id;
  const fromloc = cities[Math.floor(Math.random() * (cities.length - 2))];
  const toloc = cities[cities.indexOf(fromloc) + 1];
  const depttime = new Date( getRandomTime() );
  const ridercount = randRiderCount();
  const id = rideID;
  rideID++;
  return {driverid, id, fromloc, toloc, depttime, ridercount };
}

const genRandomManifest = ()=>{
  const index = Math.floor(Math.random()*randomRides.length);
  const ride = randomRides[index]
  const rideid = ride.id;
  const passengerid = randomUsers[  Math.floor(Math.random()*randomUsers.length) ].id
  const statuscode = Math.floor(Math.random()*2);
  const id = manifestID;

  manifestID++;
  return {rideid, id, passengerid, statuscode};
}


const randomUsers = new Array(20).fill().map((x,i) => genRandomUser());
const randomRides = new Array(40).fill().map((x,i)=>genRandomRide());
const randomManifests = new Array(40).fill().map((x,i)=>genRandomManifest());

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





