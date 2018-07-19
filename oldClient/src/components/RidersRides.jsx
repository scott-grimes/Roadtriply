import React from 'react';
const moment = require('moment')
const api = require('../api')
const confirmedPassengers = x => x.map(i=>i.statuscode).reduce((sum,el)=>sum+el,0);

class RidersRides extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:props.user, ridingRides:props.ridingRides
    };

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
    this.setState({user:newProps.user, ridingRides:newProps.ridingRides});
  }

  linkBuilder (result){

    if(result.confirmed===result.ridercount){
      return <div>All Full!</div>;
    }
    else if(result.passengers.length===0){
      return <div>No Requests So Far</div>
    }
    return <div>New Request!</div>
    //return (<div><a id={result.id} onClick={()=>this.requestrideHandler(rideid)}>View Requests</a></div>);
  }
  
  
  
  
  render(){ 

    const style = {
      'tableLayout': 'fixed',
      'width': '500px'
    }
    
    if(this.state.ridingRides.length===0){
      return(<div>No Rides scheduled. Let's change that!</div>)
    }

      return (
        <div>
        <table style={style}>
        <thead><tr>
            <th>Date</th>
            <th>Departs</th>
            <th>From</th>
            <th>To</th>
            <th>Ride Status</th>
            </tr>
            </thead>
            <tbody>
          {
            this.state.ridingRides.map((result)=>{
              let time = moment.utc(result.ride.depttime)
              let confirmed = result.statuscode?'Confirmed':'Not Confirmed';
            return  <tr key ={result.id}>
            <td>{time.format('ddd, MMM Do YYYY')}</td>
            <td>{time.format('LT')}</td>
            <td>{result.ride.fromloc}</td>
            <td>{result.ride.toloc}</td>
            <td>{confirmed}</td>
            <td><a href="#">View Ride</a></td>
            </tr>
            })
          }
          </tbody>
        </table>
        </div>
      );
    }
 
};
export default RidersRides;