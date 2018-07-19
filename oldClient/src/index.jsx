import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import Account from './components/Account.jsx'
import AddRide from './components/AddRide.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Ride from './components/Ride.jsx';
import api from './api';
import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      page: 'search',
      drivingRides: [],
      ridingRides:[]
    }
   
    this.changeUser = (x)=>{
      this.setState({user:x}, ()=>{
      console.log('in index, should not push history')
      })};
    this.changeUser = this.changeUser.bind(this);
    this.updateUserRides = this.updateUserRides.bind(this);
  }

  // refreshes a users rides (both as driver and passenger)
  updateUserRides(){
    if(this.state.user!==null){
      api.getDrivingRides(this.state.user.id)
      .then(res=>this.setState({drivingRides: res}));
      api.getRidingRides(this.state.user.id)
      .then(res=>this.setState({ridingRides: res}))
    }
  }

  render () {
    const user = this.state.user;

    let Search = <SearchBar user={user} changeUser={this.changeUser} />;
  
    let Account = <Account drivingRides = {this.state.drivingRides} ridingRides = {this.state.ridingRides} user={user}/>;
    
    let Login = <Login changeUser={this.changeUser}/>;

    let Register = <Register changeUser={this.changeUser}/>;
   
    let AddRide = <AddRide user = {this.state.user} />;
    
    let Ride = <Ride ride={ride} user={this.state.user} />;

    return <Router>
        <div>
          <Navbar user={user} />
          {page}
          <Route exact path="/" component={Search} />
          <Route path="/search" component={Search} />
          <Route path="/account" component={Account} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/addride" component={AddRide} />
          <Route path="/ride" component={Ride} />
        </div>
      </Router>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));