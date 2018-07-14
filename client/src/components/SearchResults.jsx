import React from 'react';
const moment = require('moment')
const api = require('../api')
const userIsDriverOfRide = (ride,user)=> user===null?false:user.id===ride.driverid;
const userHasAlreadyRequestedRide = (ride,user)=> user===null?false:ride.passengers.map(x=>x.passengerid).includes(user.id);
class SearchResults extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:props.user, results:props.results,
      drivingRides:props.drivingRides,
      ridingRides:props.ridingRides
    };

    this.reqestRideHandler = this.requestrideHandler.bind(this);
    this.linkBuilder = this.linkBuilder.bind(this);
  }

  requestrideHandler(rideid){

    if(document.getElementById(rideid).innerHTML='Ride Requested!'){
      return;
    }
    api.addPassenger(this.state.user.id, rideid)
    .then(res=>
    {
      let oldhtml = document.getElementById(rideid).innerHTML;
      if(res){
        document.getElementById(rideid).innerHTML='Ride Requested!'
      }else{
        document.getElementById(rideid).innerHTML='Failed! Try again!'
        setTimeout(()=>{document.getElementById(rideid).innerHTML=oldhtml}, 2000)
      }
    })

  }


  componentWillReceiveProps(newProps){
    this.setState({user:newProps.user, results:newProps.results,
      drivingRides:newProps.drivingRides,
      ridingRides:newProps.ridingRides})
  }

  linkBuilder (ride){

    if(this.state.user===null){
      return <div></div>;
    }

    return (<div><a id={ride.id} onClick={()=>this.requestrideHandler(ride.id)}>Request Ride</a></div>);
  }
  
  
  
  
  render(){ 
    let results = this.state.results!==null ? this.state.results.filter((result)=>!userIsDriverOfRide(result,this.state.user)&&!userHasAlreadyRequestedRide(result,this.state.user)):null;
    if(!results){
      return(<div></div>)
    }
    else if (!results.length){
      return(<div>No Results Found For Your Query</div>)
    }

    
    const style = {
      'tableLayout': 'fixed',
      'width': '500px'
    }
    let header = <div></div>
    if(this.state.user===null){
      header = <div style={{'height':'20px'}}>Register to Request a Ride!</div>
    }
      return (
        <div>{header}
        <table style={style}>
        <thead><tr>
            <th>Date</th>
            <th>Departs</th>
            <th>From</th>
            <th>To</th>
            <th>Seats</th>
            </tr>
            </thead>
            <tbody>
          {
            
            results.map((result)=>{
              console.log(result)
              
              let time = moment.utc(result.depttime)
            return  <tr key ={result.id}>
            <td>{time.format('ddd, MMM Do YYYY')}</td>
            <td>{time.format('LT')}</td>
            <td>{result.fromloc}</td>
            <td>{result.toloc}</td>
            <td>{result.freeslots}</td>
            <td>{this.linkBuilder(result)}</td>
            </tr>
            })
          }
          </tbody>
        </table>
        </div>
      );
    }
 
};
export default SearchResults;