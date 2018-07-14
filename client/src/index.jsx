import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import AddRide from './components/AddRide.jsx';
import Register from './components/Register.jsx';
import Login from './components/Login.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: null,
      page: 'search'
    }
    this.renderPage = this.renderPage.bind(this)
    this.changeUser = (x)=>{
      this.setState({user:x}, 
      this.renderPage(
        {preventDefault:()=>{}, target:{id:'search'}}
      ))};
    this.changeUser = this.changeUser.bind(this);
  }

  renderPage(e){
    e.preventDefault();
    console.log(e);
    if(e.target.id==='logout'){
      api.logout(this.state.user.fbid)
      .then(()=>{;
      this.setState({user:null})
      });
    }else{
      this.setState({page:e.target.id})
    }
  }

  render () {
    const p = this.state.page;
    const user = this.state.user;
    console.log('user in page render',user)
    let page = <SearchBar />;
    if(p==='account'){
      page = <Account />;
    }
    if(p==='login'){
      page = <Login />;
    }
    if(p==='register'){
      page = <Register changeUser={this.changeUser}/>;
    }
    if(p==='addride'){
      page = <AddRide />;
    }
    return (<div><div></div>
      <Navbar renderPage = {this.renderPage} user = {user}/>
      {page}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));