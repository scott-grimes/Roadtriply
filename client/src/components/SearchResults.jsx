import React from 'react';
const moment = require('moment')
const SearchResults = ({results}) => {
  console.log(results)
  if(!results){
    return(<div></div>)
  }
  else if (!results.length){
    return(<div>No Results Found For Your Query</div>)
  }
    return (
      <div>
      <table>
      <thead><tr>
           <th>Date</th>
           <th>Departs</th>
           <th>From</th>
           <th>To</th>
           <th></th></tr>
           </thead>
           <tbody>
        {
          results.map((result,idx)=>{
            let time = moment.utc(result.depttime)
            console.log(time)
            // let date = utcstring.slice(0, -13)
            // let time = +utcstring.slice(16,19)
            // if(time<12){
            //   time = time+' AM'
            // }else if(time===12){
            //   time = '12 NOON'
            // }else{
            //   time = time-12+' PM'
            // }
           return  <tr key ={idx}>
           <td>{time.format('ddd, MMM Do YYYY')}</td>
           <td>{time.format('LT')}</td>
           <td>{result.fromloc}</td>
           <td>{result.toloc}</td>
           <td>{result.freeslots}</td>
           <td>Request Ride</td>
           </tr>
          })
        }
        </tbody>
      </table>
      </div>
    );
 
};
export default SearchResults;