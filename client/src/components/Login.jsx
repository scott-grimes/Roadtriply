import React from 'react';
import api from '../api';

class Register extends React.Component{

constructor(props){
  super(props)
}

handleSubmit(e){
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const isEmpty = (x)=>!x||x==='';
  if(isEmpty(email) || isEmpty(password)){
      alert('All fields are required!')
      return;
    }
  api.login(email,password)
  .then(res =>{
    console.log(res)
    if(!res){
      document.getElementById('message').innerHTML='Invalid Credentials\nTry Again!'
      setTimeout(()=>{document.getElementById('message').innerHTML=''},2000);
      return;
    }
      this.setState({'user':res})
    
      
    });
}

render(){
  return(<div>
    <form onSubmit={this.handleSubmit}>
      Email <input type="text" id="email"></input>
      Password <input type="password" id="password"></input>
      <input type="submit"></input>
    </form>
    <div id="message"></div>
  </div>)
}
  
  
};
export default Register;