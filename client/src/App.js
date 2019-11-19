import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import NewPosting from './components/NewPosting';
import Listings from './components/Listings';
import SortBar from './components/SortBar';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Immutable from 'immutable';

//import Immutable from 'immutable';   // need to do "npm install immutable

/* eslint-disable react/prefer-stateless-function */
const Title = styled.h1`
  text-align: center;
`;

const newPostingButton = styled.div`
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
            exact
            path="/newPosting"
            component={() => <NewPosting ifPosting={'postingView'} />}
          />
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
            render={() => (
              <div>
                <NewPosting ifPosting={'general'} />
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
  );
}

export default App;
