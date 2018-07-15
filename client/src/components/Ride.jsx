import React from 'react';
const moment = require('moment')
const api = require('../api')
const userIsDriverOfRide = (ride, user) => user === null ? false : user.id === ride.driverid;
const userHasAlreadyRequestedRide = (ride, user) => user === null ? false : ride.passengers.map(x => x.passengerid).includes(user.id);

class Ride extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      ride: props.ride,
    };

    this.reqestRideHandler = this.requestrideHandler.bind(this);
    this.linkBuilder = this.linkBuilder.bind(this);
  }


  componentWillReceiveProps(newProps) {
    this.setState({
      user: newProps.user,
      ride:newProps.ride
    })
  }

  linkBuilder(ride) {

    if (this.state.user === null) {
      return <div></div>;
    }

    return (<div><a id={ride.id} onClick={() => this.requestrideHandler(ride.id)}>Request Ride</a></div>);
  }




  render() {
    let results = this.state.results !== null ? this.state.results.filter((result) => !userIsDriverOfRide(result, this.state.user) && !userHasAlreadyRequestedRide(result, this.state.user)) : null;


    const style = {
      'tableLayout': 'fixed',
      'width': '500px'
    }

    let RideInfo = (<table style={style}>
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
            let time = moment.utc(result.depttime)
            return <tr key={result.id}>
              <td>{time.format('ddd, MMM Do YYYY')}</td>
              <td>{time.format('LT')}</td>
              <td>{result.fromloc}</td>
              <td>{result.toloc}</td>
              <td>{result.freeslots}</td>
            </tr>
          })
        }
      </tbody>
    </table>)

    let RegisteredRiders = (<div></div>);

    let RideRequests = (<div></div>);
    
    return (
      <div><h3>Edit Ride</h3>
        {RideInfo}
        {RegisteredRiders}
        {RiderRequestes}
      </div>
    );
  }
};
export default Ride;