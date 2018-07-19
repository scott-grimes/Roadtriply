const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/allinride", (req, res) => {
  console.log("getting passengers in a ride");
  controller
    .getAllPassengers(req.query)
    .then(result => {
      if (!result) {
        throw "No Passengers Found";
      }
      console.log("Passengers Found");
      return res.send(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send(false);
    });
});

router.post("/add", (req, res) => {
  console.log("adding passenger");
  controller
    .searchRides(req.body)
    .then(result => {
      if (!result) {
        throw "passenger not added";
      }
      console.log("passenger added");
      return res.send(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send(false);
    });
});

router.post("/remove", (req, res) => {
  console.log("removing passenger");
  controller
    .removePassenger(req.query)
    .then(result => {
      if (!result) {
        throw "pass not removed";
      }
      console.log("pass removed");
      return res.send(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send(false);
    });
});

router.post("/approve", (req, res) => {
  console.log("approving passenger");
  controller
    .removePassenger(req.body)
    .then(result => {
      if (!result) {
        throw "pass not approved";
      }
      console.log("pass approved");
      return res.send(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send(false);
    });
});

module.exports = router;
