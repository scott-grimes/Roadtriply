import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/NavBar.jsx';
import SearchBar from './components/SearchBar.jsx';
import Account from './components/Account.jsx';
import AddRide from './components/AddRide.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';
import Ride from './components/Ride.jsx';
import api from './api';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: null
    }
   

      this.logout = this.logout.bind(this);
     this.changeUser = this.changeUser.bind(this);
    // this.updateUserRides = this.updateUserRides.bind(this);
  }

  changeUser(x){
      this.setState({ user: x }, () => {
        console.log('in index, should not push history')
      })
  }

  logout(){
    api.logout()
      .then(()=>this.setState({user:null}));
  }

  // refreshes a users rides (both as driver and passenger)
  // updateUserRides(){
  //   if(this.state.user!==null){
  //     api.getDrivingRides(this.state.user.id)
  //     .then(res=>this.setState({drivingRides: res}));
  //     api.getRidingRides(this.state.user.id)
  //     .then(res=>this.setState({ridingRides: res}))
  //   }
  // }

  render () {
    const { user } = this.state;
    console.log(this.state)
    let search = () => <SearchBar user={user} changeUser={this.changeUser} />;
  
    let account = ()=> <Account user={user}/>;
    
    
   
    let addRide =()=> <AddRide user = {user} />;
    
    let ride =()=> <Ride ride={ride} user={user} />;

    return <Router>
        <div>
          <Navbar user={user} logout={this.logout} />
          <Route exact path="/" component={search} />
          <Route path="/search" component={search} />
          <Route path="/account" component={account} />

        <Route
          path="/login"
          render={({ history }) => (
            <Login history={history} changeUser={this.changeUser} />
          )}
        />

        <Route
          path="/register"
          render={({ history }) => (
            <Register history={history} changeUser={this.changeUser} />
          )}
        />

          
          <Route path="/addride" component={addRide} />
          <Route path="/ride" component={ride} />
        </div>
      </Router>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));