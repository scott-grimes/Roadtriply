const express = require("express");
const router = express.Router();
const controller = require('../controller');

router.get('/driverid', (req, res) => {
  console.log("get rides by driver id");
  controller
    .getRidesByDriverId(req.query)
    .then(result => {
      if (!result) {
        throw ('No Rides Found')
      }
      console.log('Rides Found')
      return res.send(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send(false);
    });
});

router.get('/search', (req, res) => {
  console.log("searching rides");
  controller
    .searchRides(req.query)
    .then(result => {
      if (!result) {
        throw ('No Rides Found')
      }
      console.log('Rides Found')
      return res.send(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send(false);
    });
});

router.get('/passengerid', (req, res) => {
  console.log("getting rides by passengerid");
  controller
    .getRidesByPassengerId(req.query)
    .then(result => {
      if (!result) {
        throw ('Rides not found')
      }
      console.log('Rides Found')
      return res.send(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send(false);
    });
});











module.exports = router;