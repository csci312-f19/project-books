import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Listings from './components/Listings';
import SortBar from './components/SortBar';
//import Immutable from 'immutable';   // need to do "npm install immutable
import data from './Data/SampleData.json';

/* eslint-disable react/prefer-stateless-function */

function App() {
  const [sortType, setSortType] = useState('');
  const [listings, setListings] = useState([]);
  const [ascending, setDirection] = useState(true);

  useEffect(() => setListings(data), []);

  return (
    <div>
      <SearchBar />
      <SortBar
        listings={listings}
        setListings={setListings}
        sortType={sortType}
        setSortType={setSortType}
        ascending={ascending}
        flipDirection={() => setDirection(!ascending)}
      />
      <Listings listings={listings} />
    </div>
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
