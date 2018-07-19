const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/", (req, res) => {
  console.log("get ride id");
  controller
    .getRideById(req.query)
    .then(result => {
      if (!result) {
        throw "No Ride Found";
      }
      console.log("Ride Found");
      return res.send(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send(false);
    });
});

router.get("/freeslots", (req, res) => {
  console.log("search for free slots in ride");
  controller
    .getNumFreeSlots(req.query)
    .then(result => {
      if (result === undefined) {
        throw "No Ride Found";
      }
      console.log("Ride Found");
      return res.send(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send(false);
    });
});

router.post("/", (req, res) => {
  console.log("adding ride");
  controller
    .addRide(req.body)
    .then(result => {
      if (!result) {
        throw "Ride not added";
      }
      console.log("Ride Added");
      return res.send(result);
    })
    .catch(err => {
      console.log(err);
      return res.status(400).send(false);
    });
});

module.exports = router;
