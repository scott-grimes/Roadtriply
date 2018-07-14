import React from 'react';
import api from '../api';

class Account extends React.Component{

constructor(props){
  super(props)
}

componentWillMount(){
  
}
    
render(){
  return(<div>
   Account Page
   <div>Scheduled Rides - Driving</div>
   
   <div>Upcoming Rides - Riding</div>
    
   <div>Past Rides</div>
   Leave Feedback!
   
  </div>)
}
  
  
};
export default Account;