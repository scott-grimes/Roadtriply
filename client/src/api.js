const axios = require('axios');



module.exports = {
  
  
  searchRides : (fromloc, toloc, depttime )=>{
    return axios.get('/rides',{
      params: {fromloc, toloc, depttime }
    })
    .then((res)=>console.log(res))
  },

  getRide: (rideid)=>{
    const queries = {rideid}
    const url = urlWithParams(queries);
    return fetch(url).then(res=>console.log(res));
  },

  addPassenger: (passengerid, rideid)=>{
    return axios.post('/addpassenger',{
      body: {passengerid, rideid}
    })
    .then((res)=>console.log(res))
  },
}