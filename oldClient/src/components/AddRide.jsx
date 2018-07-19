import React from 'react';
// hacky way to select cities
import {cities} from '../../../lib/citylist';
import api from '../api';
const moment = require('moment');
cities.sort();
const times = ["1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 NOON", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM", "12 MIDNIGHT"]

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
    this.user = props.user;
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderPage = props.renderPage;
  }

  handleChange(e){
    e.preventDefault();
  }

  handleSubmit(e){
    
    e.preventDefault();
    const self = this;
    const fromloc = document.getElementById('fromdest').value
    const toloc = document.getElementById('todest').value
    const depttimeBEGIN = document.getElementById('depttimeBEGIN').value
    let depttime = moment.utc(depttimeBEGIN)
    const hour = document.getElementById('hour').value;
    const ridercount = document.getElementById('ridercount').value;
    if(fromloc==='Select' || toloc==='Select' || ridercount==='Riders' || hour==='Time'){
      document.getElementById('message').innerHTML='Your form is not complete!'
      setTimeout(()=>{document.getElementById('message').innerHTML=''},2000);
      return;
    }
    depttime = depttime.add(+hour,'hours');
    depttime = depttime.toDate();
    
    api.addRide(this.user.id, ridercount, fromloc, toloc, depttime)
    .then(result=>{
      if(!result){
        document.getElementById('message').innerHTML='Error adding ride, please try again'
        setTimeout(()=>{document.getElementById('message').innerHTML=''},2000);
        return;
      }
      document.getElementById('message').innerHTML='Added Ride Successfully!'
      setTimeout(()=>{document.getElementById('message').innerHTML=''},2000);
      self.renderPage('search')
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
          Date:
          <input type="date" required id="depttimeBEGIN"
               onChange={this.handleChange}
               defaultValue={bdate}
               min={this.state.today} max={this.state.maxdate} />
               Departing:<select defaultValue="Time" required id="hour">
          <option defaultValue disabled hidden>Time</option>
          {
            times.map((str,i)=><option key={i+1} value={i+1}>{str}</option>)
          }
          </select>
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