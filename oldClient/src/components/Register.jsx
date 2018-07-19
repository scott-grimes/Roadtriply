import React from 'react';
import api from '../api';

class Login extends React.Component{

constructor(props){
  super(props)
  this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(e){
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const isEmpty = (x)=>!x||x==='';
  if(isEmpty(username) || 
    isEmpty(password) || 
    isEmpty(email) || 
    isEmpty(phone)){
      document.getElementById('message').innerHTML='All Fields Are Required!'
      setTimeout(()=>{document.getElementById('message').innerHTML=''},2000);
      return;
    }
  const self = this;
  api.addUser(username,password,email,phone)
  .then(res => {

    if(!res){
      document.getElementById('message').innerHTML='Invalid Credentials\nTry Again!'
      setTimeout(()=>{document.getElementById('message').innerHTML=''},2000);
      return;
    }
      self.props.changeUser(res);
  });
    
}
render(){
  return(<div>
    <div id="message" style={{'height':'20px'}}></div>
    <form onSubmit={this.handleSubmit}>
    <div>Username <input type="text" id="username"></input></div>
    <div>Password <input type="password" id="password"></input></div>
    <div>Email <input type="text" id="email"></input></div>
      <div>Phone <input type="text" id="phone"></input></div>
      <div><input type="submit"></input></div>
    </form>

  </div>)
}
  
  
};
export default Login;