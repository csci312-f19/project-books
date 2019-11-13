import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import Listings from './components/Listings';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Immutable from 'immutable';

/* eslint-disable react/prefer-stateless-function */
const Title = styled.h1`
  text-align: center;
`;

function App() {
  const [listings, setListings] = useState(Immutable.List());
  const [currentBook, setBook] = useState(null);

  useEffect(() => {
    fetch('/api/bookListings/') //is it bad to get all of the listings if the user doesnt necessarily need all of them ?
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setListings(Immutable.List(data));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Router>
      <div>
        <Title>Midd Book Market</Title>
        <Switch>
          <Route
            path="/:id"
            component={() => (
              <Listings
                currentListings={listings}
                searchTerm={currentBook}
                mode={'detailed'}
              />
            )}
          />
          <Route
            component={() => (
              <div>
                <SearchBar
                  setBook={book => setBook(book)}
                  currentBook={currentBook}
                />
                <Listings
                  currentListings={listings}
                  searchTerm={currentBook}
                  mode={'general'}
                />
              </div>
            )}
          />
        </Switch>
      </div>
    </Router>
    // <Router>
    //   <div>
    //     <Title>Midd Book Market</Title>
    //     <SearchBar setBook={book => setBook(book)} currentBook={currentBook} />

    // <SortBar
    //   listings={listings}
    //   setListings={setListings}
    //   sortType={sortType}
    //   setSortType={setSortType}
    //   ascending={ascending}
    //   flipDirection={() => setDirection(!ascending)}
    // />
    //     <Listings currentListings={listings} searchTerm={currentBook} />
    //   </div>
    // </Router>
  );
}

export default App;
