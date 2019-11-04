import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Listings, { ListingsCollection } from './components/Listings';
import Searchbar from './components/SearchBar';

import { BrowserRouter as Router } from 'react-router-dom';

function homepage() {}

/* eslint-disable react/prefer-stateless-function */

function App() {
  const [searchTerm, setSearchTerm] = useState(true);

  return (
    <Router>
      <div>
        <Searchbar />
        {searchTerm && <Listings />}
      </div>
    </Router>
  );
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
