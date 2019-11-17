import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import Listings from './components/Listings';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Immutable from 'immutable';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

const GOOGLE_CLIENT_ID =
  '603582413711-motmdqbcfj8drljfjisq4ihtobolfemt.apps.googleusercontent.com';

/* eslint-disable react/prefer-stateless-function */
const Title = styled.h1`
  text-align: center;
`;

const UserAccount = styled.div`
  float: right;
`;

const DivStyled = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
`;

function App() {
  const [listings, setListings] = useState(Immutable.List());
  const [currentBook, setBook] = useState(null);
  const [loggedIn, setLogin] = useState(false);

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

  const handleGoogleLogin = response => {
    fetch('/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${response.tokenId}`
      }
    }).then(fetchResponse => {
      if (!fetchResponse.ok) {
        alert('Unable to authenticate', fetchResponse.statusText);
        setLogin(false);
      } else {
        setLogin(true);
      }
    });
  };

  const handleGoogleFailure = response => {
    console.log(response);
    alert(response.error);
  };

  const handleGoogleLogout = () => {
    fetch('/logout', {
      method: 'POST'
    }).then(fetchResponse => {
      if (!fetchResponse.ok) {
        alert('Error logging out', fetchResponse.statusText);
      }
      setLogin(false);
    });
  };

  const loginButton = (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Login with Google"
      isSignedIn
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleFailure}
    />
  );

  const logoutButton = (
    <GoogleLogout
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Logout"
      onLogoutSuccess={handleGoogleLogout}
    />
  );

  return (
    <Router>
      <div>
        <UserAccount>
          {!loggedIn && loginButton}
          {loggedIn && logoutButton}
        </UserAccount>
        <br />
        <br />
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
            render={() => (
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
