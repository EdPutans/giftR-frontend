import React, { Component } from 'react';
import './App.css';
// import './Adapter'
import * as adapter from './Adapter'

class App extends Component {
  render() {
    return (
      <div className="App">
          { `${adapter.e}` }
      </div>
    );
  }
}

export default App;
