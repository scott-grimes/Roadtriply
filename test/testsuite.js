const db = require('../database/db')

// SERVER TESTS
describe('Server Functions', () => {
  const UserA = {}
  const UserB = {}
  const AsRide = {}
  

  beforeEach(function () {
    console.log('this is run before each DESCRIBE. erase whole database')
  });

  describe('Users', () => {

    it('should add a new user to the database');
    it("should fetch a user by id from the database");
    it("should fail to fetch a user that does not exist");
    it('should not add a user who already exists to the database (same fbid)');
  });

  describe('Rides', () => {

    before(function() {
      console.log("add a single user to the database");
    });

    it('should add a new ride to the database');
    it('should fetch a ride by id from the database');
    it('should not fetch a ride which does not exist');
    it("should not add ride to a user who does not exist");
  });

  describe('Passenger', () => {
    before(function () {
      console.log('add two users (driver and rider), and a single blank ride')
    });

    it('should add a passenger to a ride\'s manifest');
    it('should not add a passenger who\'s id does not exist');
    it('should not add passenger to a ride which does not exist');
    it('should approve passenger by updating status code');
    it('should remove passenger by updating status code');
    it('should update the freesslots count of ride when a passenger is confirmed');
    it('should fail to add passenger to a full ride');

  });

  describe('Searching', () => {
    before(function () {
      console.log("add a single user. add a ride from city A, add a ride from city B, and a ride from City A at another time");
    });

    it('should not show rides which are full');
    it('should show only rides leaving from the specified fromdest');
    it('should show only rides arriving at the specified todest');
    it("should show rides in the specified leavetime");
    it('should not show rides outside of the specified leavetime');
  });


})