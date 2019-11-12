import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import Listings from './components/Listings';
import { BrowserRouter as Router } from 'react-router-dom';
import Immutable from 'immutable';
import data from './Data/SampleData.json';

/* eslint-disable react/prefer-stateless-function */
const Title = styled.h1`
  text-align: center;
`;

function App() {
  const [listings, setListings] = useState(Immutable.List());
  const [currentBook, setBook] = useState(null);

  useEffect(() => setListings(Immutable.List(data)), []);
  return (
    <Router>
      <div>
        <Title>Midd Book Market</Title>
        <SearchBar setBook={book => setBook(book)} currentBook={currentBook} />
        <Listings currentListings={listings} searchTerm={currentBook} />
      </div>
    </Router>
  );
}

export default App;
