import React from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';

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

  const ListingsDisplay = currentListings.map(listing => (
    //Listtitle will be whatever it is that we search by
    // All the others will run though list of other properties to populate ListElement probably

    <ListElementContainer key={listing.ISBN}>
      <ListTitle>{listing.Title}</ListTitle>
      <ListElement>{listing.courseID}</ListElement>
      <ListElement>{listing.courseTitle}</ListElement>
      <ListElement>{listing.ISBN}</ListElement>
      <ListElement>{listing.price}</ListElement>
      <ListElement>{listing.condition}</ListElement>
      <Link to={listing.Title}>More Info</Link>
    </ListElementContainer>
  ));

  return (
    <ListingsContainer>
      <List>{ListingsDisplay}</List>
    </ListingsContainer>
  );
}

function Listings({ currentListings, searchTerm }) {
  return (
    <div>
      <Switch>
        <Route path="/:id" component={DetailedListing} />
        <Route
          component={() => (
            <ListingsCollection
              currentListings={currentListings}
              searchTerm={searchTerm}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default Listings;
