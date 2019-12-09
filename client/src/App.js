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
import UserPic from './user.png';
import { Link } from 'react-router-dom';

document.body.style.background = '#fafafa';

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

const DropDownButton = styled.button`
  float: right;
  position: absolute;
  margin-left: 92%;
  margin-top: 2%;
  background-color: #d1e1ed;
  color: #fafafa;
  height: 4vw;
  width: 4.5vw;
  text-align: center;
  border: none;
  border-radius: 2vw;
`;

const DropdownContent = styled.div`
  float: right;
  position: absolute;
  margin-left: 89.8%;
  margin-top: 6.2vw;
  border: 0.2vw solid #d1e1ed;
  border-radius: 2vw;
`;

const Item = styled.div`
  margin: 0.5vw;
  text-align: center;
`;

const CenteredImg = styled.div`
  text-align: center;
  width: 100%;
`;

const MiddBooks = styled.img`
  width: 20%;
  margin-top: 8%;
  margin-bottom: 2%;
  align-self: center;
`;

const HomeButton = styled.button`
  float: right;
  position: absolute;
  text-align: center;
  width: 4.5vw;
  height: 4vw;
  margin-left: 86%;
  margin-top: 2%;
  background-color: #a6e1e3;
  border: none;
  border-radius: 2vw;
`;

const StyledImg = styled.img`
  border: auto;
  width: 2.5vw;
  height: 2.5vw;
`;

const ItemButton = styled.button`
  border: none;
  font-size: 75%;
  color: #787878;
  font-weight: bold;
  background-color: #fafafa;
`;

const SpecialItemButton = styled.button`
  color: #787878;
  font-weight: bold;
  padding-left: 2.5vw;
  padding-right: 2.5vw;
  border: none;
  font-size: 75%;
  background-color: #fafafa;
`;

function App() {
  const [listings, setListings] = useState(Immutable.List());
  const [currentBook, setBook] = useState(null);
  const [loggedIn, setLogin] = useState(false);
  const [menuState, setMenu] = useState(false);
  const [buttonDisplay, setButton] = useState(true);

  useEffect(() => {
    fetch('/api/bookListings/')
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
    <Item>
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        render={renderProps => (
          <SpecialItemButton onClick={renderProps.onClick}>
            Login
          </SpecialItemButton>
        )}
        isSignedIn
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleFailure}
      />
    </Item>
  );

  const helperLogoutButton = (
    <GoogleLogout
      clientId={GOOGLE_CLIENT_ID}
      render={renderProps => (
        <ItemButton onClick={renderProps.onClick}>Logout</ItemButton>
      )}
      onLogoutSuccess={handleGoogleLogout}
    />
  );

  const logoutButton = (
    <Item>
      {(window.location.pathname === '/newPosting' ||
        window.location.pathname === '/myPostings') && (
        <Link to={''} id="">
          {helperLogoutButton}
        </Link>
      )}
      {window.location.pathname !== '/newPosting' &&
        window.location.pathname !== '/myPostings' &&
        helperLogoutButton}
    </Item>
  );
  const viewButton = (
    <Item>
      <Link to={'myPostings'} id="myPostings">
        <ItemButton
          onClick={() => {
            setButton(true);
            setMenu(false);
          }}
        >
          My Postings
        </ItemButton>
      </Link>
    </Item>
  );
  const createButton = (
    <Item>
      <Link to={'newPosting'} id="newPosting">
        <ItemButton
          onClick={() => {
            setButton(true);
            setMenu(false);
          }}
        >
          Create Posting
        </ItemButton>
      </Link>
    </Item>
  );
  const DropDownContent = (
    <DropdownContent>
      {loggedIn && viewButton}
      {loggedIn && createButton}
      {!loggedIn && loginButton}
      {loggedIn && logoutButton}
    </DropdownContent>
  );
  return (
    <Router>
      <div className="header">
        {buttonDisplay && (
          <Link to={''} id="">
            <HomeButton
              onClick={() => {
                console.log(typeof window.location.pathname);
                console.log(window.location.pathname);
                setButton(false);
                setMenu(false);
              }}
            >
              <StyledImg src={HomePic} alt="Back to homepage" />
            </HomeButton>
          </Link>
        )}
        <DropDownButton onClick={() => setMenu(!menuState)}>
          <StyledImg src={UserPic} alt="User Account" />
        </DropDownButton>
      </div>
      {menuState && DropDownContent}
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
            return <MyPostings ifLoggedIn={loggedIn} />;
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
