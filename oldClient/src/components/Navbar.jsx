import React from 'react';
import api from '../api';

class Navbar extends React.Component{

constructor(props){
  super(props)
  this.state = { user: props.user};
  this.renderPage = props.renderPage;
  this.linkHandler = this.linkHandler.bind(this);

}

linkHandler(e){
  e.preventDefault();
  this.renderPage(e.target.id);
}

componentWillReceiveProps(nextProps) {
  this.setState({ user: nextProps.user });  
}

render(){

  const style = {'display':'inline', 'margin': '5px'}
  
  if(this.state.user===null){
    return (
      <div style={style} className="navbar"><h1>roadtriply</h1>
        <div style={style}  id='search' onClick={this.linkHandler}>Search</div>
        <div style={style} id='login' onClick={this.linkHandler}>Login</div>
        <div style={style} id='register' onClick={this.linkHandler}>Register</div>
      </div>
    );
  }else{
    return (
      <div style={style} className="navbar"><h1>roadtriply</h1>
      <div style={style} id='search' onClick={this.linkHandler}>Search</div>
      <div style={style} id='addride' onClick={this.linkHandler}>Create Ride</div>
      <div style={style} id='account' onClick={this.linkHandler}>Account</div>
      <div style={style} >{this.state.user.username}</div>
      <div style={style} id='logout' onClick={this.linkHandler}>Logout</div>
      
      </div>
      );
    }
}
  
  
};
export default Navbar;