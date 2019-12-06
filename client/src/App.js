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
`;
const DropDownButton = styled.button`
  background-color: #a3bdd0;
  color: #fafafa;
  padding: 24px;
  font-size: 17px;
  border: none;
  border-radius: 40px;
`;

const DropdownContent = styled.div`
  display: block;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  z-index: 2;
  right: 0;
`;

const Item = styled.div`
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
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
  display: inline;
`;

const HomeDiv = styled.div`
  float: left;
  position: absolute;
  left: 4.5vw;
  top: 1.25vw;
  text-align: center;
  max-width: 3vw;
  z-index: 1;
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
    width: 3vw;
    height: 3vw
    resizeMode: 'contain';

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
  const viewButton = (
    <button onClick={() => setButton(true)}>
      <Link to={'myPostings'} id="myPostings">
        View My Postings
      </Link>
    </button>
  );
  const createButton = (
    <button onClick={() => setButton(true)}>
      <Link to={'newPosting'} id="newPosting">
        Create New Posting
      </Link>
    </button>
  );
  const DropDownContent = (
    <div>
      <Item> {loggedIn && viewButton}</Item>
      <Item>{loggedIn && createButton}</Item>
      <Item>
        {!loggedIn && loginButton}
        {loggedIn && logoutButton}
      </Item>
    </div>
  );

  return (
    <Router>
      {buttonDisplay && (
        <HomeDiv>
          <Link to={''} id="">
            <HomeButton>
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
              
      <br />         
      <br />
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
