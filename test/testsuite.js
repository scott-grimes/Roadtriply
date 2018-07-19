process.env.NODE_ENV = 'testing';
const assert = require('assert');
const controller = require('../server/controller')
var chai = require('chai');
const {knex} = require('../database/knex')
const should = chai.should();

// SERVER TESTS
describe('Server Functions', () => {
  const UserA = { username: 'a', password: 'a', email: 'a', phone: 'a' };
  const UserB = { username: 'b', password: 'b', email: 'b', phone: 'b' };
  const UserC = { username: "c", password: "c", email: "c", phone: "c" };
  const AsRide = {'driverid':1000,'fromloc':'LOC A','toloc':'LOC B','depttimeStr':'2019-01-05T19:00:00.000Z','ridercount':1}

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
      controller.getUserById({id:1000}).then(res => {
        res.username.should.equal('a');
        done();
      });
    });

    it('should fail to fetch a user that does not exist',(done)=>{
      controller.getUserById({ id: 999 }).then(res => {
        res.should.equal(false);
        done();
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

  describe('Rides', () => {


    it('should add a new ride to the database',(done)=>{
      controller.addRide(AsRide)
      .then((res)=>{
        res.id.should.equal(1000);
        done();
      })
    });

    it('should fetch a ride by id from the database',(done)=>{
      controller.getRideById({id:1000})
        .then((res) => {
          res.fromloc.should.equal('LOC A');
          done();
        })
    });
    it('should not fetch a ride which does not exist',(done)=>{
      controller.getRideById({ id: 999 })
        .then((res) => {
          res.should.equal(false);
          done();
        })
    });
    it('should not add ride to a user who does not exist',(done)=>{
      const fakeDriveridRide = { 'driverid': 999, 'fromloc': 'LOC A', 'toloc': 'LOC B', 'depttimeStr': '2019-01-05T19:00:00.000Z', 'ridercount': 2 }
      controller.addRide(fakeDriveridRide)
        .then((res) => {
          res.should.equal(false);
          done();
      });
  });
});

  describe('Passenger', () => {
    before(function () {
      controller.addUser(UserB);
    });

    it('should add a passenger to a ride\'s manifest',(done)=>{
      const m = {passengerid:1001,rideid:1000}
      controller.addPassenger(m)
      .then(res=>{
        res.id.should.equal(1000);
        done();
      })
    });

    it('should not add a passenger who\'s id does not exist',(done)=>{
      const m = { passengerid: 999, rideid: 1000 }
      controller.addPassenger(m)
        .then(res => {
          res.should.equal(false);
          done();
        })
    });
    it('should not add passenger to a ride which does not exist',(done)=>{
      const m = { passengerid: 1001, rideid: 999 }
      controller.addPassenger(m)
        .then(res => {
          res.should.equal(false);
          done();
        })
    });
    it('should approve passenger by updating status code',(done)=>{
      const m = { passengerid: 1001, rideid: 1000 };
      controller.approvePassenger(m).then(res => {
       
        res.statuscode.should.equal(1);
        done();
      });

    });
    it('should remove passenger by updating status code',(done)=>{
      const m = { passengerid: 1001, rideid: 1000 };
      controller.removePassenger(m).then(res => {
        res.statuscode.should.equal(0);
        done();
      });
    });
    it('should update the freesslots count of ride when a passenger is confirmed',(done)=>{
      const m = { passengerid: 1001, rideid: 1000 };
      controller.approvePassenger(m)
      .then((res) => controller.getNumFreeSlots({rideid:1000}))
      .then(res=>{
        res.should.equal(0);
        done();
      })
    });

    it('should fail to add passenger to a full ride',(done)=>{
      controller.addUser(UserC)
      .then((res)=>{
       
        return controller.addPassenger({rideid:1000, passengerid: res.id})})
      .then(res=>{
       
        res.should.equal(false);
        done();
      })

    });

  });

  xdescribe('Searching', () => {
    before(function () {
      console.log('add a single user. add a ride from city A, add a ride from city B, and a ride from City A at another time')
    });

    it('should not show rides which are full',(done)=>{});
    it('should show only rides leaving from the specified fromdest',(done)=>{});
    it('should show only rides arriving at the specified todest',(done)=>{});
    it('should show rides in the specified leavetime',(done)=>{});
    it('should not show rides outside of the specified leavetime',(done)=>{});
  });


  })