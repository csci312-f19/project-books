import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import NewPosting from './components/NewPosting';
import MyPostings from './components/MyPostings';
import Listings from './components/Listings';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Immutable from 'immutable';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import Logo from './middbooks.png';
import HomePic from './home.png';
import { Link } from 'react-router-dom';

let GOOGLE_CLIENT_ID;
if (String(window.location.href).includes('localhost')) {
  GOOGLE_CLIENT_ID =
    '603582413711-motmdqbcfj8drljfjisq4ihtobolfemt.apps.googleusercontent.com';
} else {
  GOOGLE_CLIENT_ID =
    '304836268474-hetmurq1ojali48o345mp1k9atjo74ss.apps.googleusercontent.com';
}

//import Immutable from 'immutable';   // need to do "npm install immutable

/* eslint-disable react/prefer-stateless-function */

document.body.style.background = '#fafafa';

const DropDownDiv = styled.div`
  float: right;
  position: absolute;
  right: 0vw;
  z-index: 1;
  margin-right: 3%;
  margin-top: 3%;
  text-align: right;
`;

const DropDownButton = styled.button`
  background-color: #a3bdd0;
  color: #fafafa;
  padding: 24px;
  font-size: 17px;
  border: none;
  border-radius: 40px;
  max-height: 6vw;
`;

const PostingButton = styled.button`
  background-color: white;
  color: #848484;
  padding: 14px;
  font-size: 14px;
  border: none;
  border-radius: 2px;
  box-shadow: 0px 2px 2px #a9a9a9;
`;

const DropdownContent = styled.div`
  background-color: #f1f1f1;
  margin-right: 3%;
  z-index: 2;
  text-decoration: none;
  border-radius: 5px;
  text-align: right;
`;

const Item = styled.div`
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: center;
`;

const CenteredImg = styled.div`
  position: block;
  text-align: center;
  z-index: 1;
`;

const MiddBooks = styled.img`
  width: 25%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 8%;
  display: inline;
`;

const HomeDiv = styled.div`
  float: left;
  position: absolute;
  text-align: center;
  max-width: 2.5vw;
  max-height: 2.5vw;
  z-index: 1;
  margin-left: 3%
  margin-top: 3%
`;

const HomeButton = styled.button`
  background-color: #a2dadb;
  border: none;
  border-radius: 40px;
`;

const Home = styled.img`
  padding: 16px;
  border: auto;
  flex: 1;
  width: 2.5vw;
  height: 2.5vw;
  resizemode: 'center';
`;

function App() {
  const [listings, setListings] = useState(Immutable.List());
  const [currentBook, setBook] = useState(null);
  const [loggedIn, setLogin] = useState(false);
  const [menuState, setMenu] = useState(false);
  const [buttonDisplay, setButton] = useState(true);

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
      buttonText="Login"
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
  const viewButton = (
    <Item>
      <Link to={'myPostings'} id="myPostings">
        <PostingButton onClick={() => setButton(true)}>
          My Postings
        </PostingButton>
      </Link>
    </Item>
  );
  const createButton = (
    <Item>
      <Link to={'newPosting'} id="newPosting">
        <PostingButton onClick={() => setButton(true)}>
          New Posting
        </PostingButton>
      </Link>
    </Item>
  );
  const DropDownContent = (
    <div>
      <Item>
        {!loggedIn && loginButton}
        {loggedIn && logoutButton}
      </Item>
      {loggedIn && viewButton}
      {loggedIn && createButton}
    </div>
  );
  return (
    <Router>
      {buttonDisplay && (
        <HomeDiv>
          <Link to={''} id="">
            <HomeButton type="button">
              <Home
                src={HomePic}
                alt="Back to homepage"
                onClick={() => setButton(false)}
              />
            </HomeButton>
          </Link>
        </HomeDiv>
      )}
      <DropDownDiv onClick={() => setMenu(!menuState)}>
        <DropDownButton>My Account</DropDownButton>
        <DropdownContent>{menuState && DropDownContent}</DropdownContent>
      </DropDownDiv>
      <CenteredImg>
        <MiddBooks src={Logo} alt="website logo" />
      </CenteredImg>
      <Switch>
        <Route
          exact
          path="/newPosting"
          render={() => {
            setButton(true);
            return <NewPosting ifPosting={'postingView'} />;
          }}
        />
        <Route
          exact
          path="/myPostings"
          render={() => {
            setButton(true);
            return (
              <MyPostings ifPosting={'postingView'} ifLoggedIn={loggedIn} />
            );
          }}
        />
        <Route
          path="/:id"
          render={() => {
            setButton(true);
            return (
              <Listings
                currentListings={listings}
                searchTerm={currentBook}
                mode={'detailed'}
                loggedIn={loggedIn}
              />
            );
          }}
        />
        <Route
          render={() => {
            setButton(false);
            return (
              <div>
                {loggedIn && <NewPosting ifPosting={'general'} />}
                {loggedIn && (
                  <MyPostings ifPosting={'general'} ifLoggedIn={loggedIn} />
                )}
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
            );
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
