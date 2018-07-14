import React from 'react';
const moment = require('moment')
class SearchResults extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:props.user, results:props.results
    };

    this.reqestRideHandler = this.requestrideHandler.bind(this);
    this.linkBuilder = this.linkBuilder.bind(this);
  }

  reqestRideHandler(e){
    e.preventDefault();

  }


  componentWillReceiveProps(newProps){
    this.setState({user:newProps.user, results:newProps.results})
  }

  linkBuilder (rideid){

    if(this.state.user===null){
      return <div></div>;
    }

    return (<div><a id={rideid} onClick={this.requestrideHandler}>Request Ride</a></div>);
  }
  
  
  
  
  render(){ 
    if(!this.state.results){
      return(<div></div>)
    }
    else if (!this.state.results.length){
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
            this.state.results.map((result,idx)=>{
              let time = moment.utc(result.depttime)
            return  <tr key ={idx}>
            <td>{time.format('ddd, MMM Do YYYY')}</td>
            <td>{time.format('LT')}</td>
            <td>{result.fromloc}</td>
            <td>{result.toloc}</td>
            <td>{result.freeslots}</td>
            <td></td>
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