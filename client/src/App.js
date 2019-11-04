import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Listings, { ListingsCollection } from './components/Listings';
import Searchbar from './components/SearchBar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */

function App() {
  const [searchTerm, setSearchTerm] = useState(true);

  function Core() {
    return (
      <div>
        <Searchbar />
        <Listings />
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Switch>
          <Route component={Core} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
