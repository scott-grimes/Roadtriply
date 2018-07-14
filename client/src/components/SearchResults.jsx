import React from 'react';
const moment = require('moment')
const api = require('../api')
class SearchResults extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:props.user, results:props.results
    };

    this.reqestRideHandler = this.requestrideHandler.bind(this);
    this.linkBuilder = this.linkBuilder.bind(this);
  }

  requestrideHandler(rideid){

    console.log(this.state.user.id, rideid)
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
    this.setState({user:newProps.user, results:newProps.results})
  }

  linkBuilder (rideid){

    if(this.state.user===null){
      return <div></div>;
    }

    return (<div><a id={rideid} onClick={()=>this.requestrideHandler(rideid)}>Request Ride</a></div>);
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
            this.state.results.map((result)=>{
              let time = moment.utc(result.depttime)
            return  <tr key ={result.id}>
            <td>{time.format('ddd, MMM Do YYYY')}</td>
            <td>{time.format('LT')}</td>
            <td>{result.fromloc}</td>
            <td>{result.toloc}</td>
            <td>{result.freeslots}</td>
            <td>{this.linkBuilder(result.id)}</td>
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