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
  height: 53px;
  width: 62px;
  text-align: center;
  font-size: 17px;
  border: none;
  border-radius: 40px;
`;

const DropdownContent = styled.div`
  float: right;
  position: absolute;
  margin-left: 90%;
  margin-top: 6%;
  border: 3px solid #d1e1ed;
  border-radius: 30px;
`;

const Item = styled.div`
  margin: 7px;
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
  width: 62px;
  height: 53px;
  margin-left: 86%;
  margin-top: 2%;
  background-color: #a6e1e3;
  border: none;
  border-radius: 40px;
`;

const Home = styled.img`
  border: auto;
  width: 30px;
  height: 30px;
`;

const User = styled.img`
  border: auto;
  width: 30px;
  height: 30px;
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
    <Item>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      />
      <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        render={renderProps => (
          <button
            type="button"
            class="btn btn-outline-light"
            onClick={renderProps.onClick}
          >
            &emsp;&ensp;&ensp;&ensp;Login&ensp;&ensp;&ensp;&emsp;
          </button>
        )}
        isSignedIn
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleFailure}
      />
    </Item>
  );

  const logoutButton = (
    <Item>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      />
      <GoogleLogout
        clientId={GOOGLE_CLIENT_ID}
        render={renderProps => (
          <button
            type="button"
            class="btn btn-outline-light"
            onClick={renderProps.onClick}
          >
            Logout
          </button>
        )}
        onLogoutSuccess={handleGoogleLogout}
      />
    </Item>
  );
  const viewButton = (
    <Item>
      <Link to={'myPostings'} id="myPostings">
        {/* <PostingButton onClick={() => setButton(true)}>
          My Postings
        </PostingButton> */}
        <button
          type="button"
          class="btn btn-outline-light"
          onClick={() => setButton(true)}
        >
          My Postings
        </button>
      </Link>
    </Item>
  );
  const createButton = (
    <Item>
      <Link to={'newPosting'} id="newPosting">
        {/* <PostingButton onClick={() => setButton(true)}>
          New Posting
        </PostingButton> */}
        <button
          type="button"
          class="btn btn-outline-light"
          onClick={() => setButton(true)}
        >
          New Posting
        </button>
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
      <div class="header" onClick={() => setMenu(!menuState)}>
        {buttonDisplay && (
          <Link to={''} id="">
            <HomeButton>
              <Home
                src={HomePic}
                alt="Back to homepage"
                onClick={() => setButton(false)}
              />
            </HomeButton>
          </Link>
        )}
        {/* <DropDownButton>My Account</DropDownButton> */}
        <DropDownButton>
          <User src={UserPic} alt="User Account" />
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
            return (
              // <MyPostings ifPosting={'postingView'} ifLoggedIn={loggedIn} />
              <MyPostings ifLoggedIn={loggedIn} />
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
                {/* {loggedIn && (
                  <MyPostings ifPosting={'general'} ifLoggedIn={loggedIn} />
                )} */}
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
