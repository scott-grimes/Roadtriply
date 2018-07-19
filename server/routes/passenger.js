const express = require("express");
const router = express.Router();
const controller = require("../controller");

router.get("/allinride", (req, res) => {
  console.log("getting passengers in a ride");
  controller.getAllPassengers(req.query)
  .then(result=>{
    if(!result){
      res.status(400).send(false);
      return;
    }
    res.send(result);
  });
});

router.post("/add", (req, res) => {
  console.log("adding passenger");
  controller
    .searchRides(req.body)
    .then(result => {
      if (!result) {
        res.status(400).send(false);
        return
      }
     res.send(result);
    });
    
});

router.post("/remove", (req, res) => {
  console.log("removing passenger");
  controller
    .removePassenger(req.query)
    .then(result => {
      if (!result) {
        res.status(400).send(false);
        return;
      }
      res.send(result);
    })
});

router.post("/approve", (req, res) => {
  console.log("approving passenger");
  controller
    .approvePassenger(req.body)
    .then(result => {
      if (!result) {
        res.status(400).send(false);
      }
      console.log("pass approved");
      return res.send(result);
    })
});

module.exports = router;
