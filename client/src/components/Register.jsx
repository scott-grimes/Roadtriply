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
    console.log(res)
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
    <form onSubmit={this.handleSubmit}>
      Username <input type="text" id="username"></input>
      Password <input type="password" id="password"></input>
      Email <input type="text" id="email"></input>
      Phone <input type="text" id="phone"></input>
      <input type="submit"></input>
    </form>
    <div id="message"></div>
  </div>)
}
  
  
};
export default Login;