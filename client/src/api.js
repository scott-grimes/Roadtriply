const axios = require('axios');



module.exports = {
  getRidesByDriverId: id => {
    return axios
      .get("/driverid", {
        params: { id }
      })
      .then(res => res.data)
      .catch(err => {
        console.log(err);
        return false;
      });
  },

  addUser: ({username, password, email, phone}) => {
    return axios
      .post("/user", {
        username,
        password,
        email,
        phone
      })
      .then(resp => resp.data)
      .catch(err => {
        console.log(err);
        return false;
      });
  },
  addRide: (driverid, ridercount, fromloc, toloc, depttime) => {
    return axios
      .post("/ride", {
        driverid,
        ridercount,
        fromloc,
        toloc,
        depttime
      })
      .then(res => res.data)
      .catch(err => console.log(err));
  },

  searchRides: (fromloc, toloc, depttime) => {
    return axios
      .get("/rides/search", {
        params: { fromloc, toloc, depttime }
      })
      .then(res => res.data)
      .catch(err => console.log(err));
  },

  getRideById: rideid => {
    return axios
      .get("/ride", { params: { fromloc, toloc, depttime } })
      .then(res => res.data)
      .catch(err => console.log(err));
  },

  approvePassenger: (passengerid, rideid) => {
    return axios
      .post("/passenger/approve", {
        passengerid,
        rideid
      })
      .then(res => res.data)
      .catch(err => console.log(err));
  },

  addPassenger: (passengerid, rideid) => {
    return axios
      .post("/passenger/add", {
        passengerid,
        rideid
      })
      .then(res => res.data)
      .catch(err => console.log(err));
  },

  removePassenger: (passengerid, rideid) => {
    return axios
      .post("/passenger/remove", { passengerid, rideid })
      .then(res => res.data)
      .catch(err => console.log(err));
  },

  getRidesByDriverId: id => {
    return axios
      .get("/rides/driverid", {
        params:{id}
      })
      .then(res => res.data)
      .catch(err => console.log(err));
  },

  getRidingRides: id => {
    return axios
      .get("/rides/passengerid", { params:{id} })
      .then(res => res.data)
      .catch(err => console.log(err));
  },

  logout: () => {
    return axios
      .get("/logout")
      .then(() => true)
      .catch(err => {
        console.log(err);
        return false;
      });
  },

  login: ({username, password}) => {
    return axios
      .post("/login", {
        username,
        password
      })
      .then(result => result.data[0]);
  }
};