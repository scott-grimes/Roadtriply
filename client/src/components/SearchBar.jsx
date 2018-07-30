import React from 'react';
// hacky way to select cities
import {cities} from '../../../lib/citylist';
import api from '../api';
import SearchResults from './SearchResults.jsx';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from "react-select";
const moment = require('moment')
cities.sort();
const options = cities.map(city=>{return {label:city, value:city}})
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
      maxdate,
      results : null,
      user: props.user,
      fromloc:'',
      toloc:'',
    }
    this.fromChange = this.fromChange.bind(this);
    this.toChange = this.toChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps){
    this.setState({user:newProps.user})
  }


  fromChange(e) {
    this.setState({ fromloc: e.value });
  }

  toChange(e) {
    this.setState({ toloc: e.value });
  }

  depttimeChange(e){
    console.log(e);
  }

  handleSubmit(e){

    e.preventDefault();
    const {fromloc, toloc} = this.state;
    let depttimeBEGIN = document.getElementById('depttimeBEGIN').value
    let depttime = moment.utc(depttimeBEGIN);
    if(fromloc==='Select' || toloc==='Select'){
      document.getElementById('message').innerHTML='Please select destinations and a date!'
      setTimeout(()=>{document.getElementById('message').innerHTML=''},2000);
      return;
    }
    
    depttime = depttime.toDate();
    api.searchRides(fromloc,toloc,depttime)
    .then(response=>this.setState({results:response}));

  }
  render(){
    const barstyle = {
      'borderStyle': 'solid',
      'borderWidth': '1px', height:'70px', width:'80%', margin: 'auto', 'textAlign': 'center', position:'relative', 'backgroundColor':'azure', 'borderRadius':'10px', 'paddingTop':'5px', 'marginTop':'50px'}
    const selectStyle = { width: '200px', display:'inline-block', margin:'5px'}
    if(!this.state.use2dates){
      return <div style={barstyle}>
          <form onSubmit={this.handleSubmit} style={{margin:'auto'}}>
          <div style={selectStyle}>
            <Select  placeholder={"From"}  options={options} onChange={this.fromChange} />
            </div><div style={selectStyle}>
          <Select style={selectStyle} placeholder={"To"}  options={options} onChange={this.toChange} />
          </div>

            <TextField id="date" label="Departing" type="date" defaultValue={this.state.depttimeBEGIN} InputLabelProps={{ shrink: true }} inputProps={{ min: this.state.today, max: this.state.maxdate }} onChange={this.depttimeChange} />

            <Button type="submit">Submit</Button>
          </form>
          <div id="message" style={{ height: "30px" }} />
          <SearchResults user={this.state.user} results={this.state.results} />
        </div>;
        }
    
      }
};
export default SearchBar;