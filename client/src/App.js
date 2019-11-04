import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Listings, { ListingsCollection } from './components/Listings';
import Searchbar from './components/SearchBar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

/* eslint-disable react/prefer-stateless-function */

function App() {
  function Core() {
    return <div></div>;
  }

  return (
    <Router>
      <div>
        <Searchbar />
        <Listings />
      </div>
    </Router>
  );
}

export default App;
