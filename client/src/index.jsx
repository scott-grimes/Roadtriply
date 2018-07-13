import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.jsx';
import SearchBar from './components/SearchBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      userid: null,
      page: 'search'
    }
  }

  componentDidMount() {
    // check to see if user is logged in

    // if logged in, set state of loggedin to true
   
  }

  render () {
    return (<div>
      <Navbar userid={this.state.userid}/>
      <SearchBar />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));