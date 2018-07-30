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

  const style = { 'display': 'inline', 'margin': '10px' }
  const logo = { 'display': 'inline', float: 'left', margin: '5px', 'font-weight':'bold'}
  const elright = { 'display': 'inline', float: 'right' , margin:'5px'}
  const elleft = { 'display': 'inline', float: 'left', margin: '5px'}
  
  if(this.state.user===null){
    return (

        <div style={style} className="navbar">
        <div style={logo}>roadtriply</div>
        <div style={elright}id='search' onClick={this.linkHandler}>Search</div>
        <div style={elright} id='login' onClick={this.linkHandler}>Login</div>
        <div style={elright} id='register' onClick={this.linkHandler}>Register</div>
      </div>
    );
  }else{
    return (
 
      <div style={style} className="navbar">
        <div style={logo}>roadtriply</div>
        <div style={elright} id='search' onClick={this.linkHandler}>Search</div>
        <div style={elright} id='addride' onClick={this.linkHandler}>Create Ride</div>
        <div style={elright} id='account' onClick={this.linkHandler}>Account</div>
        <div style={elright} >{this.state.user.username}</div>
        <div style={elright} id='logout' onClick={this.linkHandler}>Logout</div>
      </div>
      );
    }
}
  
  
};
export default Navbar;