import React from 'react';
import {Link} from 'react-router-dom'
import api from '../api';

class NavBar extends React.Component{


render(){

  const style = {'display':'inline', 'margin': '5px'}
  console.log(this.props)
  if(this.props.user===null){
    return <div style={style} className="navbar">
        <Link to="/search">roadtriply</Link>
        <Link to="/search">Search</Link>
        <Link to="/login">login</Link>
      <Link to="/register">register</Link>
      </div>;
  }else{
    return (
      <div style={style} className="navbar">
        <Link to="/search">roadtriply</Link>
        <Link to="/search">Search</Link>
        <Link to="/account">account</Link>
        <a onClick={this.props.logout}>logout</a>
      </div>
      );
    }
}
  
};
export default NavBar;