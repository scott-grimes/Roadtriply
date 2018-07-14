import React from 'react';
// hacky way to select cities
import {cities} from '../../../lib/citylist';
import api from '../api';
cities.sort();

const HOUR = 1000*60*60;
const DAY = HOUR*24;


class AddRide extends React.Component{

  constructor(props){
    
    super(props)
    let nowUnix = Date.now();
    let now =  new Date(nowUnix).toISOString().split('T')[0];
    let maxdate = new Date(nowUnix+365*DAY).toISOString().split('T')[0];
    
    this.state = {
      today: now,
      depttimeBEGIN:now,
      depttimeEND:now,
      maxdate
    }
    console.log(props,'props in addride')
    this.user = props.user;
    console.log(this.user)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e){
    e.preventDefault();
    console.log(e.target)
  }

  handleSubmit(e){
    
    e.preventDefault();
    const fromloc = document.getElementById('fromdest').value
    const toloc = document.getElementById('todest').value
    const depttimeBEGIN = document.getElementById('depttimeBEGIN').value
    const depttime = new Date(depttimeBEGIN);
    const ridercount = document.getElementById('ridercount').value;
    if(fromloc==='Select' || toloc==='Select' || ridercount==='Riders'){
      document.getElementById('message').innerHTML='Your form is not complete!'
      setTimeout(()=>{document.getElementById('message').innerHTML=''},2000);
      return;
    }

    console.log(this.user.id, ridercount, fromloc, toloc, depttime)
    api.addRide(this.user.id, ridercount, fromloc, toloc, depttime)
    .then(result=>{
      if(!result){
        document.getElementById('message').innerHTML='Error adding ride, please try again'
        setTimeout(()=>{document.getElementById('message').innerHTML=''},2000);
        return;
      }
      document.getElementById('message').innerHTML='Added Ride Successfully!'
      setTimeout(()=>{document.getElementById('message').innerHTML=''},2000);
      return;
    })

  }
  render(){

    const bdate = this.state.depttimeBEGIN

      return (
        <div>
          <form onSubmit={this.handleSubmit}>
          From:<select defaultValue="Select" required id="fromdest">
          <option disabled hidden>Select</option>
          {
            cities.map((city,idx)=><option key={idx} value={city}>{city}</option>)
          }
          </select>
          To:<select defaultValue="Select" required id="todest">
          <option  disabled hidden>Select</option>
          {
            cities.map((city,idx)=><option key={idx} value={city}>{city}</option>)
          }
          </select>
          Departing:
          <input type="date" required id="depttimeBEGIN"
               onChange={this.handleChange}
               defaultValue={bdate}
               min={this.state.today} max={this.state.maxdate} />
          Room For:<select defaultValue="Riders" required id="ridercount">
          <option defaultValue disabled hidden>Riders</option>
          {
            [...Array(8).keys()].map((i)=><option key={i+1} value={i+1}>{i+1}</option>)
          }
          </select>
          <input type="submit" value="submit"></input>
          </form>
          <div id="message"></div>
          
      
        </div>)
        }
    
      
};
export default AddRide;