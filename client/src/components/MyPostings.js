import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Immutable from 'immutable';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NewPosting from '../components/NewPosting';

const Title = styled.h2`
  text-align: center;
`;

const View = styled.div`
  margin: 30px 120px;
  border-radius: 50px;
  background-color: #f2f2f2;
  // background-color: #d8e7f0;
  // background-color: #ebebeb;
  padding: 30px 30px;
`;
const Edit = styled.div`
  margin: 30px 120px;
  border: 1px solid #ccc;
  border-radius: 50px;
  padding: 30px 30px;
`;

const EditDiv = styled.div`
  margin-left: 10px;
  margin-right: 10px;
`;

const Detail = styled.div`
  padding: 7px 7px;
  border-radius: 4px;
  background-color: #ffffff;
  margin-top: 8px;
  margin-left: 10px;
  margin-right: 10px;
`;

const NewInput = styled.input`
  background-color: #ebebeb;
  width: 100%;
  padding: 7px 7px;
  border: none;
  border-radius: 4px;
  cursor: pointers;
`;

const NewSelect = styled.select`
  background-color: #ebebeb;
  color: #737373;
  width: 100%;
  height: 35px;
  border: none;
  text-align: center;
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
`;

const ButtonBar = styled.div`
  text-align: center;
`;

const EditButtonBar = styled.div`
  text-align: right;
`;

const MyPostings = ({ ifPosting, ifLoggedIn }) => {
  const [myListings, setMyListings] = useState(Immutable.List());
  const [mode, setMode] = useState('view');
  const [currentListing, setCurrentListing] = useState();
  const [title, setTitle] = useState(
    currentListing ? currentListing.title : ''
  );
  const [isbn, setISBN] = useState(currentListing ? currentListing.ISBN : '');
  const [courseID, setCourseID] = useState(
    currentListing ? currentListing.courseID : ''
  );
  const [condition, setCondition] = useState(
    currentListing ? currentListing.condition : ''
  );
  const [price, setPrice] = useState(
    currentListing ? currentListing.price : ''
  );
  const [comments, setComments] = useState(
    currentListing ? currentListing.comments : ''
  );

  const constructListing = () => ({
    listingID: currentListing.listingID,
    userID: currentListing.userID,
    ISBN: isbn,
    condition: condition,
    price: price,
    comments: comments,
    edited: new Date().toLocaleString()
  });

  const constructBook = () => ({
    ISBN: isbn,
    courseID: courseID,
    title: title
  });

  useEffect(() => {
    fetch('/api/MyPostings/')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status_text);
        }
        return response.json();
      })
      .then(data => {
        setMyListings(Immutable.List(data));
      })
      .catch(err => console.log(err)); // eslint-disable-line no-console
  }, []);

  if (ifLoggedIn) {
    if (ifPosting === 'general') {
      return (
        <div>
          <button display="block" text-align="center">
            <Link to={'myPostings'} id="myPostings">
              View My Postings
            </Link>
          </button>
        </div>
      );
    } else {
      if (myListings.isEmpty()) {
        return (
          <div>
            <Title>My Postings</Title>
            <View>
              <p align="center">You have not posted anything yet.</p>
              <Route
                render={() => (
                  <div>
                    <NewPosting ifPosting={'general'} />
                  </div>
                )}
              />
            </View>
            <Router>
              <Switch>
                <Route
                  exact
                  path="/newPosting"
                  component={() => <NewPosting ifPosting={'postingView'} />}
                />
              </Switch>
            </Router>
          </div>
        );
      } else {
        let listingItems = null;
        listingItems = myListings.map(listing => (
          <div>
            {mode === 'view' && (
              <View>
                <Detail>
                  <strong>&emsp;Book Title:</strong>&emsp;{` ${listing.title}`}
                </Detail>
                <Detail>
                  <strong>&emsp;ISBN:</strong>&emsp;{` ${listing.ISBN}`}
                </Detail>
                <Detail>
                  <strong>&emsp;Course ID:</strong>&emsp;
                  {` ${listing.courseID}`}
                </Detail>
                <Detail>
                  <strong>&emsp;Condition:</strong>&emsp;
                  {` ${listing.condition}`}{' '}
                </Detail>
                <Detail>
                  <strong>&emsp;Price:</strong>&emsp;{` $${listing.price}`}{' '}
                </Detail>
                <Detail>
                  <strong>&emsp;Comments:</strong>&emsp;{` ${listing.comments}`}{' '}
                </Detail>
                <Detail>
                  <strong>&emsp;Last Edited Time:</strong>&emsp;
                  {` ${listing.edited}`}{' '}
                </Detail>
                <br />
                <link
                  rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                />
                <ButtonBar>
                  <button
                    type="button"
                    className="btn btn-default btn-sm"
                    onClick={() => {
                      if (
                        window.confirm(
                          'Are you sure you want to delete this post?'
                        )
                      ) {
                        fetch(`/api/MyPostings/${listing.listingID}`, {
                          method: 'DELETE'
                        })
                          .then(response => {
                            if (!response.ok) {
                              throw new Error(response.statusText);
                            }
                            const newListings = myListings.filter(
                              listing => listing !== currentListing
                            );
                            setMyListings(newListings);
                            window.location.reload(false);
                          })
                          .catch(err => console.log(err));
                        setCurrentListing();
                        setMode('view');
                      }
                    }}
                  >
                    <span className="glyphicon glyphicon-trash"></span> Delete
                  </button>
                  &emsp;&emsp;
                  <button
                    type="button"
                    className="btn btn-default btn-sm"
                    onClick={() => {
                      setMode('edit');
                      setCurrentListing(listing);
                      setISBN(listing.ISBN);
                      setComments(listing.comments);
                      setPrice(listing.price);
                      setTitle(listing.title);
                      setCourseID(listing.courseID);
                    }}
                  >
                    <span className="glyphicon glyphicon-edit"></span> Edit
                  </button>
                </ButtonBar>
              </View>
            )}

            {mode === 'edit' && currentListing.listingID === listing.listingID && (
              <Edit>
                <h4 align="center">
                  <span class="glyphicon glyphicon-pencil"></span>&emsp;Editing
                </h4>
                <EditDiv>
                  <strong>Book Title:</strong>
                  <NewInput
                    type="text"
                    id="title"
                    value={title}
                    placeholder={'Book title must be set'}
                    onChange={event => setTitle(event.target.value)}
                  />

                  <strong>Course ID:</strong>
                  <NewInput
                    type="text"
                    id="courseID"
                    value={courseID}
                    placeholder={'Course ID must be set'}
                    onChange={event => setCourseID(event.target.value)}
                  />

                  <strong>Condition:</strong>
                  <NewSelect
                    onChange={event => setCondition(event.target.value)}
                  >
                    <option>Condition must be selected here</option>
                    <option value="New">New</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Acceptable">Acceptable</option>
                    <option value="Very Worn">Very Worn</option>
                    <option value="Bad">Bad</option>
                  </NewSelect>

                  <strong>Price:</strong>
                  <NewInput
                    type="text"
                    id="price"
                    value={price}
                    placeholder={'Price must be set'}
                    onChange={event => setPrice(event.target.value)}
                  />

                  <strong>Comments:</strong>
                  <NewInput
                    type="text"
                    id="comments"
                    value={comments}
                    placeholder={'Additional comments...'}
                    onChange={event => setComments(event.target.value)}
                  />

                  <br />
                  <br />
                  <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                  />
                  <EditButtonBar>
                    <button
                      type="button"
                      className="btn btn-default btn-sm"
                      onClick={() => {
                        setMode('view');
                        setCurrentListing();
                      }}
                    >
                      Cancel
                    </button>
                    &emsp;&emsp;
                    <button
                      type="button"
                      className="btn btn-default btn-sm"
                      disabled={
                        title === '' ||
                        courseID === '' ||
                        price === '' ||
                        condition === ''
                      }
                      onClick={() => {
                        fetch(`/api/MyPostings/Listing/${listing.listingID}`, {
                          method: 'PUT',
                          body: JSON.stringify(constructListing()),
                          headers: new Headers({
                            'Content-type': 'application/json'
                          })
                        })
                          .then(response => {
                            if (!response.ok) {
                              throw new Error(response.statusText);
                            }
                            return response.json();
                          })
                          .then(data => {
                            window.location.reload(false);
                          })
                          .catch(err => console.log(err));

                        fetch(`/api/MyPostings/Book/${isbn}`, {
                          method: 'PUT',
                          body: JSON.stringify(constructBook()),
                          headers: new Headers({
                            'Content-type': 'application/json'
                          })
                        })
                          .then(response => {
                            if (!response.ok) {
                              throw new Error(response.statusText);
                            }
                            return response.json();
                          })
                          .then(data => {
                            window.location.reload(false);
                          })
                          .catch(err => console.log(err));

                        setCurrentListing();
                        setMode('view');
                      }}
                    >
                      Save
                    </button>
                  </EditButtonBar>
                </EditDiv>
              </Edit>
            )}
          </div>
        ));

        return (
          <div>
            <Title>My Postings</Title>
            {listingItems}
          </div>
        );
      }
    }
  } else {
    return (
      <div>
        <Title>My Postings</Title>
        <View>
          <p align="center">Please log in to view your posts.</p>
        </View>
      </div>
    );
  }
};

export default MyPostings;
