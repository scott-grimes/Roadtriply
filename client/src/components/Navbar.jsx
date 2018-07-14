import React from 'react';

class Navbar extends React.Component{

constructor(props){
  super(props)
  this.state = { user: props.user};
  this.renderPage = props.renderPage;
  console.log('inside navbar', props.user)
}

render(){
  if(!this.state.user){
    return (
      <div className="navbar"><h1>roadtriply</h1>
        <div id='search' onClick={this.renderPage}>Search</div>
        <div id='login' onClick={this.renderPage}>Login</div>
        <div id='register' onClick={this.renderPage}>Register</div>
      </div>
    );
  }else{
    return (
      <div className="navbar"><h1>roadtriply</h1>
      <div id='search' onClick={this.renderPage}>Search</div>
      <div id='account' onClick={this.renderPage}>Account</div>
      <div id='logout' onClick={this.renderpage}>Logout</div>
      
      </div>
      );
    }
}
  
  
};
export default Navbar;