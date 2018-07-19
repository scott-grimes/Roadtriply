process.env.NODE_ENV = 'testing';
const assert = require('assert');
const controller = require('../server/controller')
var chai = require('chai');
const {knex} = require('../database/knex')
const should = chai.should();

// SERVER TESTS
describe('Server Functions', () => {
  const UserA = {username: 'a', password: 'a', email: 'a', phone: 'a'};
  const UserB = { username: 'b', password: 'b', email: 'b', phone: 'b' };
  const AsRide = {'driverid':1000,'fromloc':'LOC A','toloc':'LOC B','depttime':new Date('2019-01-05T19:00:00.000Z'),'ridercount':2}

  beforeEach(function () {
    knex('users').truncate();
    knex('rides').truncate();
    knex('manifests').truncate();
    knex.raw("ALTER TABLE users AUTO_INCREMENT = 1000;");
    knex.raw("ALTER TABLE rides AUTO_INCREMENT = 1000;");
    knex.raw("ALTER TABLE manifests AUTO_INCREMENT = 1000;");
  });

  describe('Users', () => {

    it('should add a new user to the database',(done)=>{
      controller.addUser(UserA)
      .then(knex('users').select('id',1000))
      .then(result=>result.username.should.equal('a'))
      .then(()=>done());
    });

    it('should fetch a user by id from the database',(done)=>{
      controller.getUserById(1000).then(res => {
        res.username.should.equal('a');
        done();
      });
    });

    it('should fail to fetch a user that does not exist',(done)=>{
      controller.getUserById(999).then(res => {
        res.should.equal(false);
      })
    });

    it('should not add a user who already exists to the database (same username)',(done)=>{
      
      controller.addUser(UserA)
      .then((res)=>{
        res.should.equal(false);
        done();
      })
    });
  });

  xdescribe('Rides', () => {

    before(function() {
      console.log('add a single user to the database',()=>{});
    });

    it('should add a new ride to the database',()=>{});
    it('should fetch a ride by id from the database',()=>{});
    it('should not fetch a ride which does not exist',()=>{});
    it('should not add ride to a user who does not exist',()=>{});
  });

  xdescribe('Passenger', () => {
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

  xdescribe('Searching', () => {
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