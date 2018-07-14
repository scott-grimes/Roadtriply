import React from 'react';
import api from '../api';
import DriversRides from './DriversRides.jsx'
import RidersRides from './RidersRides.jsx'

class Account extends React.Component{

constructor(props){
  super(props)
  this.state = {
    user: props.user,
    drivingRides: props.drivingRides,
    ridingRides: props.ridingRides
  }
  this.user = props.user;
}

componentWillReceiveProps(newProps){
  this.setState({user: newProps.user,
    drivingRides:newProps.drivingRides,
    ridingRides: newProps.ridingRides});

}

render(){

  console.log(this.state)
  return(<div>
   Account Page
   <div style={{'height':'50px'}}><h3>Upcoming Drives</h3></div>
   <div style={{'height':'50px'}}></div>
    <DriversRides user={this.state.user} drivingRides={this.state.drivingRides} />
   <div style={{'height':'50px'}}></div>
   <h3>Upcoming Rides</h3>
   <div style={{'height':'50px'}}></div>
   <RidersRides user={this.state.user} ridingRides={this.state.ridingRides} />
   <div style={{'height':'50px'}}></div>
   <div><h3>Past Rides</h3></div>
   <div style={{'height':'50px'}}></div>
   <div><h3>Feedback</h3></div>
   <div style={{'height':'50px'}}></div>
   Leave Feedback, and View Yours! Coming soon! &trade;
   
  </div>)
}
  
  
};
export default Account;