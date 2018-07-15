import React from 'react';
const moment = require('moment')
const api = require('../api')
const confirmedPassengers = x => x.map(i=>i.statuscode).reduce((sum,el)=>sum+el,0);

class DriversRides extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:props.user, drivingRides:props.drivingRides,
      
    };
    this.renderPage = props.renderPage;
    this.linkToRideBuilder = this.linkToRideBuilder.bind(this)

    //this.reqestRideHandler = this.requestrideHandler.bind(this);
    //this.linkBuilder = this.linkBuilder.bind(this);
  }

  // requestrideHandler(rideid){

  //   console.log(this.state.user.id, rideid)
  //   api.addPassenger(this.state.user.id, rideid)
  //   .then(res=>
  //   {
  //     let oldhtml = document.getElementById(rideid).innerHTML;
  //     if(res){
  //       document.getElementById(rideid).innerHTML='Ride Requested!'
  //     }else{
  //       document.getElementById(rideid).innerHTML='Failed! Try again!'
  //       setTimeout(()=>{document.getElementById(rideid).innerHTML=oldhtml}, 2000)
  //     }
  //   })

  // }


  componentWillReceiveProps(newProps){
    this.setState({user:newProps.user, drivingRides:newProps.drivingRides});
  }

  linkBuilder (ride){
    if(ride.confirmed===ride.ridercount){
      return <div>All Full!</div>;
    }
    else if(ride.passengers.length===0){
      return <div>No Requests So Far</div>
    }
    return <div>New Request!</div>
    //return (<div><a id={ride.id} onClick={()=>this.requestrideHandler(rideid)}>View Requests</a></div>);
  }

  linkToRideBuilder(ride){
    console.log(ride.id,'rideid')
    return <div onClick={()=>this.renderPage('ride:'+ride.id)}>View Ride</div>;

  }
  
  
  
  
  render(){ 

    const style = {
      'tableLayout': 'fixed',
      'width': '500px'
    }
    if(this.state.drivingRides.length===0){
      return(<div>No Rides Scheduled</div>)
    }

    
      return (
        <div>
        <table style={style}>
        <thead><tr>
            <th>Date</th>
            <th>Departs</th>
            <th>From</th>
            <th>To</th>
            <th>Filled Seats</th>
            <th></th>
            <th></th>
            </tr>
            </thead>
            <tbody>
          {
            this.state.drivingRides.map((ride)=>{
              let time = moment.utc(ride.depttime)
              let confirmed = confirmedPassengers(ride.passengers);
              ride['confirmed'] = confirmed;
            return  <tr key ={ride.id}>
            <td>{time.format('ddd, MMM Do YYYY')}</td>
            <td>{time.format('LT')}</td>
            <td>{ride.fromloc}</td>
            <td>{ride.toloc}</td>
            <td>{confirmed+'/'+ride.ridercount}</td>
              <td>{this.linkToRideBuilder(ride)}</td>
            <td>{this.linkBuilder(ride)}</td>
            </tr>
            })
          }
          </tbody>
        </table>
        </div>
      );
    }
 
};
export default DriversRides;