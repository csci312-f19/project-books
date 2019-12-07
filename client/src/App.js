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

const DropDownDiv = styled.div`
  display: block;
  float: right;
  position: absolute;
  right: 0vw;
  margin-right: 1%;
  margin-top: 2%;
`;

const DropDownButton = styled.button`
  float: right;
  position: absolute;
  margin-left: 90%;
  margin-top: 2%;
  background-color: #a3bdd0;
  color: #fafafa;
  padding: 15px;
  text-align: center;
  font-size: 17px;
  border: none;
  border-radius: 40px;
  max-height: 3.7vw;
`;

const GoogleButton = styled.button`
  // background-color: #a3bdd0;
  // color: #fafafa;
  // // padding: 24px;
  // font-size: 13px;
  // height: 20px;
  // // border: none;
  // // border-radius: 40px;
  // // max-height: 6vw;
`;

const PostingButton = styled.button`
  background-color: white;
  color: #848484;
  padding: 10px;
  font-size: 11px;
  border: none;
  border-radius: 2px;
  box-shadow: 0px 2px 2px #a9a9a9;
`;

const DropdownContent = styled.p`
  // display: block;
  // float: right;
  // position: absolute;
  // text-align: center;
  // max-width: 2.5vw;
  // max-height: 2.5vw;
  // margin-right: 13%;
  // margin-top: 2%;
  // width: 100%;
  float: right;
  position: absolute;
  margin-left: 90%;
  margin-top: 6%;
  background-color: #fffff;
`;

const Item = styled.div`
  display: block;
  text-align: center;
`;

const CenteredImg = styled.div`
  // display: flex;
  text-align: center;
  width: 100%;
  // justify-content: center;
`;

const MiddBooks = styled.img`
  width: 20%;
  // margin-right: -15%;
  margin-top: 8%;
  margin-bottom: 2%;
  align-self: center;
`;

// const HomeDiv = styled.div`
// display: block;
//   float: right;
//   // position: absolute;
//   text-align: center;
//   max-width: 2.5vw;
//   max-height: 2.5vw;
//   margin-right: 13%;
//   margin-top: 2%;
//   width: 100%;
// `;

const HomeButton = styled.button`
  // float: right;
  // position: absolute;
  // margin-left: 90%;
  // margin-top: 2%;
  // background-color: #a3bdd0;
  // color: #fafafa;
  // padding: 15px;
  // text-align: center;
  // font-size: 17px;
  // border: none;
  // border-radius: 40px;
  // max-height: 3.7vw;

  // display: block;
  float: right;
  position: absolute;
  text-align: center;
  max-width: 7vw;
  max-height: 7vw;
  margin-left: 85%;
  margin-top: 2%;
  background-color: #a2dadb;
  border: none;
  border-radius: 30px;
`;

const Home = styled.img`
  padding: 7px;
  border: auto;
  width: 2.3vw;
  height: 2.3vw;
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
      render={renderProps => (
        <button class="btn btn-default btn-sm" onClick={renderProps.onClick}>
          Login
        </button>
      )}
      // buttonText="Login"
      isSignedIn
      onSuccess={handleGoogleLogin}
      onFailure={handleGoogleFailure}
    />
  );

  const logoutButton = (
    <GoogleLogout
      clientId={GOOGLE_CLIENT_ID}
      render={renderProps => (
        <button class="btn btn-default btn-sm" onClick={renderProps.onClick}>
          Logout
        </button>
      )}
      // buttonText="Logout"
      onLogoutSuccess={handleGoogleLogout}
    />
  );
  const viewButton = (
    <Item>
      <Link to={'myPostings'} id="myPostings">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        />
        {/* <PostingButton onClick={() => setButton(true)}>
          My Postings
        </PostingButton> */}
        <button
          type="button"
          class="btn btn-outline-light"
          onClick={() => setButton(true)}
        >
          <span class="glyphicon glyphicon-user"></span> My Postings
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
          <span class="glyphicon glyphicon-user"></span> New Posting
        </button>
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
        <div>
          <Link to={''} id="">
            <HomeButton>
              <Home
                src={HomePic}
                alt="Back to homepage"
                onClick={() => setButton(false)}
              />
            </HomeButton>
          </Link>
        </div>
      )}
      <div class="header" onClick={() => setMenu(!menuState)}>
        <DropDownButton>My Account</DropDownButton>
        <DropdownContent>{menuState && DropDownContent}</DropdownContent>
      </div>
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
