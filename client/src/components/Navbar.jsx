import React from 'react';
import api from '../api';

class Navbar extends React.Component{

constructor(props){
  super(props)
  this.state = { user: props.user};
  this.renderPage = props.renderPage;

}

componentWillReceiveProps(nextProps) {
  this.setState({ user: nextProps.user });  
}

render(){
  
  if(this.state.user===null){
    return (
      <div className="navbar"><h1>roadtriply</h1>
        <div id='search' onClick={this.renderPage}>Search</div>
        <div id='login' onClick={this.renderPage}>Login</div>
        <div id='register' onClick={this.renderPage}>Register</div>
      </div>
    );
  }else{
    console.log(this.state.user.username)
    return (
      <div className="navbar"><h1>roadtriply</h1>
      <div id='search' onClick={this.renderPage}>Search</div>
      <div id='account' onClick={this.renderPage}>Account</div>
      <div id='addride' onClick={this.renderPage}>Create Ride</div>
      <div>{this.state.user.username}</div>
      <div id='logout' onClick={this.renderPage}>Logout</div>
      
      </div>
      );
    }
}
  
  
};
export default Navbar;