const axios = require('axios');



module.exports = {
  
  
  searchRides : (fromloc, toloc, depttimeBEGIN, depttimeEND )=>{
    return axios.get('/rides',{
      params: {fromloc, toloc, depttimeBEGIN, depttimeEND }
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