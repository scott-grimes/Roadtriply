import React from 'react';
import api from '../api';

class Account extends React.Component{

constructor(props){
  super(props)
  this.user = props.user;
}

componentWillMount(){
  console.log('account userid',this.user.id)
  api.getDriversRides(this.user.id)
  .then(results=>console.log(results));
}
    
render(){
  return(<div>
   Account Page
   <div style={{'height':'50px'}}><h3>Upcoming Drives</h3></div>
   <div style={{'height':'50px'}}></div>
  <div><h3>
    Upcoming Rides
  </h3></div>
   <div style={{'height':'50px'}}></div>
   <div><h3>Past Rides</h3></div>
   Leave Feedback, coming soon! &trade;
   
  </div>)
}
  
  
};
export default Account;