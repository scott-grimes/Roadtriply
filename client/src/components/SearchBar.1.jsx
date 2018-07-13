import React from 'react';
// hacky way to select cities
import {cities} from '../../../lib/citylist';
import api from '../api';
cities.sort();
console.log(api)
const HOUR = 1000*60*60;
const DAY = HOUR*24;


class SearchBar extends React.Component{

  constructor(props){
    super(props)
    let nowUnix = Date.now();
    let now =  new Date(nowUnix).toISOString().split('T')[0];
    let maxdate = new Date(nowUnix+365*DAY).toISOString().split('T')[0];
    
    this.state = {
      use2dates:false,
      today: now,
      depttimeBEGIN:now,
      depttimeEND:now,
      maxdate
    }
    this.handleChange = this.handleChange.bind(this)
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
    if(fromloc==='Select' || toloc==='Select'){
      alert('Please select something')
      return;
    }

    console.log(fromdest,todest,depttime)
    api.searchRides(fromloc,toloc,depttime);

  }
  render(){

    const bdate = this.state.depttimeBEGIN

    if(!this.state.use2dates){
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
          From:<select required id="fromdest">
          <option selected defaultValue disabled hidden>Select</option>
          {
            cities.map((city,idx)=><option key={idx} value={city}>{city}</option>)
          }
          </select>
          To:<select required id="todest">
          <option selected defaultValue disabled hidden>Select</option>
          {
            cities.map((city,idx)=><option key={idx} value={city}>{city}</option>)
          }
          </select>
          Departing:
          <input type="date" required id="depttimeBEGIN"
               onChange={this.handleChange}
               defaultValue={bdate}
               min={this.state.today} max={this.state.maxdate} />
          <input type="submit" value="submit"></input>
          </form>
      
        </div>)
        }
    
      }
};
export default SearchBar;