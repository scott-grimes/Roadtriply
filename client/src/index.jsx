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
import Quote from "./components/Quote.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      page: 'search',
      drivingRides: [],
      ridingRides:[]
    }
    this.renderPage = this.renderPage.bind(this)
    this.changeUser = (x)=>{
      this.setState({user:x}, ()=>{
      this.renderPage('search');
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

  renderPage(dest){
    
    if(dest==='logout'){
      api.logout(this.state.user.fbid)
      .then(()=>{;
      this.setState({user:null},()=>this.renderPage('search'))
      });
    }else{
      this.updateUserRides();
      this.setState({page:dest})
    }


  }

  render () {
    const p = this.state.page;
    
    const user = this.state.user;
    let page = <SearchBar user={user} changeUser={this.changeUser}/>;
    if(p==='account'){
      page = <Account renderPage = {this.renderPage} drivingRides = {this.state.drivingRides} ridingRides = {this.state.ridingRides} user={user}/>;
    }
    if(p==='login'){
      page = <Login changeUser={this.changeUser}/>;
    }
    if(p==='register'){
      page = <Register changeUser={this.changeUser}/>;
    }
    if(p==='addride'){
      page = <AddRide renderPage = {this.renderPage} user = {this.state.user} />;
    }
    if(p.slice(0,4)==='ride'){
      let ridenum = +p.slice(5);
      console.log(ridenum);
      console.log(this.state.drivingRides)
      let ride  = this.state.drivingRides.find(x=>x.id===ridenum);
      console.log(ride);
      page = <Ride ride={ride} user={this.state.user} />;
    }

    const mainstyle = {
      backgroundRepeat: 'no-repeat', backgroundSize: 'contain', margin:'auto', 'paddingTop':'100px', float: 'center', 'marginTop':'30px', width:'80%', backgroundImage: 'url("map.png")', height:'500px'}
    return <div>
        <Navbar renderPage={this.renderPage} user={user} />
        <div style={mainstyle}>{page}</div>
        <div style={{ textAlign: "center", margin: "auto" }}>
          <Quote image={'url("people.jpg")'} quote={`You've saved me a ton of money<br>on my visits home from college!<br><br>-Sarah`} />
          <Quote image={'url("backpacker.jpg")'} quote={`I've met so many new friends while traveling,<br>I recommend this to all my friends!<br><br>-Brad`} />
        </div>
      </div>;
  }
}

ReactDOM.render(<App />, document.getElementById('app'));