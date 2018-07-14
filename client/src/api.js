const axios = require('axios');



module.exports = {

  ridelist:(id,fbid)=>{

    return axios.post('/ridelist',{
      id,
      fbid
      })
      .then(()=>true)
      .catch((err)=>{console.log(err); return false;});
    

  },

  logout: (fbid)=>{
    return axios.post('/logout',{
     fbid
     })
     .then(()=>true)
     .catch((err)=>{console.log(err); return false;});
  },

  login: (email, fbid)=>{
    return axios.post('/login',{
     email,
    fbid
    })
    .then(result=>result.data[0]);
  },

  addUser: (username, fbid, email, phone)=>{

    return axios.post('/user',{
      username, fbid, email, phone
    })
    .then(resp=>resp.data)
    .catch((err)=>{console.log(err); return false;});
  },
  addRide: (driverid, ridercount, fromloc, toloc, depttime )=>{
    
    return axios.post('/ride',{
      driverid, ridercount, fromloc, toloc, depttime 
    })
    .then((res)=>res.data);
  },
  
  searchRides : (fromloc, toloc, depttime )=>{
    return axios.get('/rides',{
      params: {fromloc, toloc, depttime }
    })
    .then((res)=>res.data)
  },

  getRide: (rideid)=>{
    const queries = {rideid}
    const url = urlWithParams(queries);
    return fetch(url).then(res=>res.data);
  },

  addPassenger: (passengerid, rideid)=>{
    return axios.post('/addpassenger',{
      passengerid, rideid
    })
    .then((res)=>res.data)
  },

  getDrivingRides: (id)=>{
    return axios.post('/ridesbydriver',{
     id
    })
    .then((res)=>res.data)
  },

  getRidingRides: (id)=>{
    return axios.post('/ridesbyuser',{
      id
     })
     .then((res)=>{console.log('response from server',res.data); return res.data})
  }
}