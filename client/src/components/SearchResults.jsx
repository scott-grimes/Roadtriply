import React from 'react';

const Navbar = ({userid}) => {
  if(!userid){
    return (
      <div><h1>roadtriply</h1>
        <div>Search</div>
        <div>Account</div>
        <div>Logout</div>
      </div>
    );
  }else{
    return (
      <div><h1>roadtriply</h1>
      <div>Search</div>
      <div>Account</div>
      <div>Login/Register</div>
      </div>
      );
  }
};
export default Navbar;