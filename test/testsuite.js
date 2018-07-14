process.env.NODE_ENV = 'testing';
const assert = require('assert');
const db = require('../database/db')
const knex = require('../database/knex');
var chai = require('chai');
var chaiHttp = require('chai-http');
const should = chai.should();

// SERVER TESTS
describe('Server Functions', () => {
  const UserA = {username: 'Leonardo Lagarde', fbid: '75569817661', id: 1000, email: 'LeonardoLagarde@gmail.com', phone: '5111722389'};
  const UserB = {username: 'Karrie Konrad', fbid: '35706594253', id: 1001, email: 'KarrieKonrad@gmail.com', phone: '5488682297'};
  const AsRide = {'driverid':1000,'id':1000,'fromloc':'Chicopee, Massachusetts','toloc':'Anderson, Indiana','depttime':new Date('2019-01-05T19:00:00.000Z'),'ridercount':2}

  beforeEach(function () {
    knex('users').truncate();
    knex('rides').truncate();
    knex('manifests').truncate();
  });

  describe('Users', () => {

    it('should add a new user to the database',(done)=>{
      const {username, fbid, email, phone } = UserA;
      db.addUser(username, fbid, email, phone)
      .then(knex('users').select('fbid',fbid))
      .then(result=>result.id.should.equal(1000))
      .then(()=>done());
    });

    it('should fetch a user by id from the database',(done)=>{
      db.getUserById(1000).then(res => {
        res.username.should.equal("Leonardo Lagarde");
        done();
      });
    });

    it('should fetch a user by fbid from the database', (done) => {
      db.getUserByFbid("75569817661").then(res => {
        res.username.should.equal("Leonardo Lagarde");
        done();
      });
    });

    it('should fail to fetch a user that does not exist',(done)=>{
      db.getUserById(0001).then(res => {
        res.should.equal(null);
      })
      .then(db.getUserByFbid('0001'))
      .then((res)=>{
        res.should.equal(null);
        done();
      })
    });

    it('should not add a user who already exists to the database (same fbid)',(done)=>{
      const { username, fbid, email, phone } = UserA;
      db.addUser(username, fbid, email, phone);
      return;
      done().then(knex('users').select('fbid', fbid))
      .then(result => result.id.should.equal(1000))
      .then(() => done());
    });
  });

  describe('Rides', () => {

    before(function() {
      console.log('add a single user to the database',()=>{});
    });

    it('should add a new ride to the database',()=>{});
    it('should fetch a ride by id from the database',()=>{});
    it('should not fetch a ride which does not exist',()=>{});
    it('should not add ride to a user who does not exist',()=>{});
  });

  describe('Passenger', () => {
    before(function () {
      console.log('add two users (driver and rider), and a single blank ride')
    });

    it('should add a passenger to a ride\'s manifest',()=>{});
    it('should not add a passenger who\'s id does not exist',()=>{});
    it('should not add passenger to a ride which does not exist',()=>{});
    it('should approve passenger by updating status code',()=>{});
    it('should remove passenger by updating status code',()=>{});
    it('should update the freesslots count of ride when a passenger is confirmed',()=>{});
    it('should fail to add passenger to a full ride',()=>{});

  });

  describe('Searching', () => {
    before(function () {
      console.log('add a single user. add a ride from city A, add a ride from city B, and a ride from City A at another time',()=>{});
    });

    it('should not show rides which are full',()=>{});
    it('should show only rides leaving from the specified fromdest',()=>{});
    it('should show only rides arriving at the specified todest',()=>{});
    it('should show rides in the specified leavetime',()=>{});
    it('should not show rides outside of the specified leavetime',()=>{});
  });


})