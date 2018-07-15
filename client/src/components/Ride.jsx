import React from 'react';
const moment = require('moment')
const api = require('../api')
const userIsDriverOfRide = (ride, user) => user === null ? false : user.id === ride.driverid;
const userHasAlreadyRequestedRide = (ride, user) => user === null ? false : ride.passengers.map(x => x.passengerid).includes(user.id);
const confirmedPassengers = x => x.map(i => i.statuscode).reduce((sum, el) => sum + el, 0);
class Ride extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      ride: props.ride,
    };

    this.verifyPassenger = this.verifyPassenger.bind(this);
    this.removePassenger = this.removePassenger.bind(this);
    this.linkBuilderApprove = this.linkBuilderApprove.bind(this);
    this.linkBuilderRemove = this.linkBuilderRemove.bind(this);
  }


  componentWillReceiveProps(newProps) {
    this.setState({
      user: newProps.user,
      ride:newProps.ride
    })
  }

  linkBuilderApprove(passengerid){
    return (<div><a id={passengerid} onClick={this.verifyPassenger}>Approve Passenger</a></div>);

  }

  linkBuilderRemove(passengerid) {
    return (<div><a id={passengerid} onClick={this.removePassenger}>Remove Passenger</a></div>);

  }

  verifyPassenger(e) {
    e.preventDefault();
    const passengerid = e.target.id;
    console.log(e.target);
    if (document.getElementById(passengerid).innerHTML === "Approved!") {
      return;
    } 

    api.approvePassenger(passengerid, this.state.ride.id)
      .then(res => {

        let oldhtml = document.getElementById(passengerid).innerHTML;
        if (res) {
          document.getElementById(passengerid).innerHTML = "Approved!";
        } else {
          document.getElementById(passengerid).innerHTML = "Failed! Try again!";
          setTimeout(() => { document.getElementById(passengerid).innerHTML = oldhtml; }, 2000)
        }
      });
    }

  removePassenger(e) {
    e.preventDefault();
    const passengerid = e.target.id;

    if (document.getElementById(passengerid).innerHTML === "Removed!") {
      return;
    }

    api.removePassenger(passengerid, this.state.ride.id)
      .then(res => {

        let oldhtml = document.getElementById(passengerid).innerHTML;
        if (res) {
          document.getElementById(passengerid).innerHTML = "Removed!";
        } else {
          document.getElementById(passengerid).innerHTML = "Failed! Try again!";
          setTimeout(() => { document.getElementById(passengerid).innerHTML = oldhtml; }, 2000)
        }
      })
  }




  render() {
    console.log('rendering ride')
    let ride = this.state.ride;
    console.log(ride)


    const style = {
      'tableLayout': 'fixed',
      'width': '500px'
    }
    let time = moment.utc(ride.depttime);
    let confirmedCount = confirmedPassengers(ride.passengers);
    let verifiedPassengers = ride.passengers.filter(x => x.statuscode === 1);
    let unverifiedPassengers = ride.passengers.filter(x => x.statuscode === 0);

    let RideInfo = <table style={style}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Departs</th>
            <th>From</th>
            <th>To</th>
            <th>Seats</th>
          </tr>
        </thead>
        <tbody>
          {<tr>
              <td>{time.format("ddd, MMM Do YYYY")}</td>
              <td>{time.format("LT")}</td>
              <td>{ride.fromloc}</td>
              <td>{ride.toloc}</td>
              <td>{confirmedCount + "/" + ride.ridercount}</td>
            </tr>}
        </tbody>
      </table>;

    let RegisteredRiders = (<div>
    <h3>Registered Riders</h3><div>None</div></div>
    );
    
    let RideRequests = (<div><h3>Pending Requests</h3><div>None</div></div>);

    if (verifiedPassengers.length>0) {
      RegisteredRiders = <div>
          <h3>Registered Riders</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              {verifiedPassengers.map((x, i) => <tr key={'v'+i}>
                <td>{x.id}</td>
                <td>{this.linkBuilderRemove(x.passengerid)}</td>
              </tr>)}
              </tr>
            </tbody>
          </table>
        </div>;
    }

    if (unverifiedPassengers.length > 0 && verifiedPassengers.length<ride.ridercount) {
      RideRequests = <div>
          <h3>Pending Requests</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th> 
              </tr>
            </thead>
            <tbody>
              {unverifiedPassengers.map((x, i) => <tr key={'uv'+i}>
                  <td>{x.id}</td>
                  <td>{this.linkBuilderApprove(x.passengerid)}</td>
                </tr>)}
            </tbody>
          </table>
        </div>;
    }
    
    return <div>
        <h3>View Ride</h3>
        {RideInfo}
        {RegisteredRiders}
        {RideRequests}
      </div>;
  }
};
export default Ride;