import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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
  let updatedList = currentListings;

  if (searchTerm != null) {
    updatedList = [];

    currentListings.forEach(function(listing) {
      let editedTitle = listing.Title.toUpperCase();
      if (
        editedTitle.includes(searchTerm.toUpperCase()) &&
        !updatedList.includes(listing)
      ) {
        updatedList.push(listing);
      }
      let editedCourseTitle = listing.courseTitle.toUpperCase();
      if (
        editedCourseTitle.includes(searchTerm.toUpperCase()) &&
        !updatedList.includes(listing)
      ) {
        updatedList.push(listing);
      }
      // let editedAuthor=listing.Author.toUpperCase();
      // if (editedAuthor.includes(searchTerm.toUpperCase())){
      //     updatedList.push(listing)
      // }

      if (listing.ISBN.includes(searchTerm) && !updatedList.includes(listing)) {
        updatedList.push(listing);
      }
    });
  }

  const ListingsDisplay = updatedList.map(listing => (
    //Listtitle will be whatever it is that we search by
    // All the others will run though list of other properties to populate ListElement probably

    <ListElementContainer key={listing.ISBN}>
      <ListTitle>{listing.Title}</ListTitle>
      <ListElement>{listing.courseID}</ListElement>
      <ListElement>{listing.courseTitle}</ListElement>
      <ListElement>{listing.ISBN}</ListElement>
      <ListElement>{listing.Price}</ListElement>
      <ListElement>{listing.Condition}</ListElement>
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
