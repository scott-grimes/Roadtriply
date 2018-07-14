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

  const style = {'display':'inline', 'margin': '5px'}
  
  if(this.state.user===null){
    return (
      <div style={style} className="navbar"><h1>roadtriply</h1>
        <div style={style}  id='search' onClick={this.renderPage}>Search</div>
        <div style={style} id='login' onClick={this.renderPage}>Login</div>
        <div style={style} id='register' onClick={this.renderPage}>Register</div>
      </div>
    );
  }else{
    return (
      <div style={style} className="navbar"><h1>roadtriply</h1>
      <div style={style} id='search' onClick={this.renderPage}>Search</div>
      <div style={style} id='addride' onClick={this.renderPage}>Create Ride</div>
      <div style={style} id='account' onClick={this.renderPage}>Account</div>
      <div style={style} >{this.state.user.username}</div>
      <div style={style} id='logout' onClick={this.renderPage}>Logout</div>
      
      </div>
      );
    }
}
  
  
};
export default Navbar;