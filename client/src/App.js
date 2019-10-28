import React, { Component } from 'react';
import './App.css';
import Listings from './components/Listings';

/* eslint-disable react/prefer-stateless-function */

class App extends Component {
  render() {
    return (
      <div>
        <input type="text" placeholder={'Search'} />
        <Listings />
      </div>
    );
  }
}

export default App;

/**
 *       <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to your CS312 Project</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <button  onClick={() => {
        alert("here")
      }}>
            </button>
           
            </div>
 */
