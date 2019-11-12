import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import Immutable from 'immutable';

const ListingsContainer = styled.div`
  text-align: center;
`;
const List = styled.ul`
  list-style-type: none;
  height: 20px;
`;
const ListElementContainer = styled.li`
  border: 1px solid;
  padding: 2px;
  margin: 5px;
`;
const ListElement = styled.p``;
const ListTitle = styled.h2`
  font-size: 20px;
  text-align: left;
  padding: 5px;
`;

const DetailedListing = ({ match }) => {
  return (
    <div>
      <h2>{match.params.id}</h2>
    </div>
  );
};

export function ListingsCollection({ currentListings, searchTerm }) {
  let currCollections1 = [];

  const [currCollections, setColl] = useState([]);
  const [signal, setSignal] = useState(0);
  if (searchTerm != null) {
    currentListings = currentListings.filter(function(listing) {
      const editedTitle = listing.Title.toUpperCase();
      const editedCourseTitle = listing.courseTitle.toUpperCase();
      // let editedAuthor=listing.Author.toUpperCase();

      return (
        editedTitle.includes(searchTerm.toUpperCase()) ||
        editedCourseTitle.includes(searchTerm.toUpperCase()) ||
        listing.ISBN.includes(searchTerm)
      );
    });
  }

  const getBookByISBN = listing => {
    const isbn = listing.ISBN;
    let book;
    fetch(`/api/books/${isbn}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // let currCollections1=currCollections;
        currCollections1.push(data);
        // setColl(currCollections1);
      })
      .catch(err => console.log(err));
  };

  // useEffect(()=>{
  if (currentListings.length != 0 && signal == 0) {
    setSignal(1);
    currentListings.forEach(listing => {
      getBookByISBN(listing);
    });
    console.log(currCollections1);
    setColl(currCollections1);
  }
  // }, [])

  console.log(currCollections);
  let ListingsDisplay = currCollections.map(listing => (
    //Listtitle will be whatever it is that we search by
    // All the others will run though list of other properties to populate ListElement probably

    <ListElementContainer key={listing.ISBN}>
      <ListTitle>{listing.title}</ListTitle>
      <ListElement>{listing.courseID}</ListElement>
      <Link to={listing.ISBN}>More Info</Link>
    </ListElementContainer>
  ));
  // <ListElementContainer key={listing.ISBN}>
  //   <ListTitle>{listing.Title}</ListTitle>
  //   <ListElement>{listing.courseID}</ListElement>
  //   <ListElement>{listing.courseTitle}</ListElement>
  //   <ListElement>{listing.ISBN}</ListElement>
  //   <ListElement>{listing.price}</ListElement>
  //   <ListElement>{listing.condition}</ListElement>
  //   <Link to={listing.ISBN}>More Info</Link>
  // </ListElementContainer>
  return (
    <ListingsContainer>
      <List>{ListingsDisplay}</List>
    </ListingsContainer>
  );
}

function Listings({ currentListings, searchTerm, mode }) {
  if (mode == 'detailed') {
    return (
      <div>
        <DetailedListing />
      </div>
    );
  } else {
    return (
      <div>
        <ListingsCollection
          currentListings={currentListings}
          searchTerm={searchTerm}
        />
      </div>
    );
  }
}

export default Listings;
