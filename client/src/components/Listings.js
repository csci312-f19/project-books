import React, { useState } from 'react';
import styled from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
//import Immutable from 'immutable';

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

const SortBarContainer = styled.div`
    text-align: center;
    padding: 20px;
`;

const SelectBar = styled.select`
    text-align: center;
    position: relative;
    display: inline;
`;

//background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

//  box-sizing: border-box;

const SortBar = ({ sortType, setSortType, ascending, setDirection }) => {
  return (
    <SortBarContainer>
      Order by
      <SelectBar
        value={sortType}
        onChange={event => {
          setSortType(event.target.value);
          if (sortType === 'Default') {
            setDirection(true);
          }
        }}
      >
        <option value="Default">Default</option>
        <option value="Price">Price</option>
        <option value="Condition">Condition</option>
      </SelectBar>
      {(sortType === 'Price' || sortType === 'Condition') && (
        <SelectBar
          value={ascending ? 'True' : 'False'}
          onChange={event => {
            setDirection(event.target.value === 'True');
          }}
        >
          <option value="True">Ascending</option>
          <option value="False">Descending</option>
        </SelectBar>
      )}
    </SortBarContainer>
  );
};

const DetailedListing = ({ match }) => {
  return (
    <div>
      <h2>{match.params.id}</h2>
    </div>
  );
};


export function ListingsCollection({
  currentListings,
  searchTerm,
  sortType,
  ascending
}) {
  let updatedList = currentListings;
  if (searchTerm != null) {
    updatedList = currentListings.filter(function(listing) {
      const editedTitle = listing.Title.toUpperCase();
      const editedCourseTitle = listing.courseTitle.toUpperCase();

      return (
        editedTitle.includes(searchTerm.toUpperCase()) ||
        editedCourseTitle.includes(searchTerm.toUpperCase()) ||
        listing.ISBN.includes(searchTerm)
      );
    });
  }

  if (sortType === 'Price') {
    if (ascending) {
      //ascending is true;
      updatedList = updatedList.sort((a, b) => a.Price - b.Price); //increasing order / asending is true / ↑
    } else {
      updatedList = updatedList.sort((a, b) => b.Price - a.Price);
    }
  } else if (sortType === 'Condition') {
    if (ascending) {
      updatedList = updatedList.sort((a, b) => a.Condition - b.Condition);
    } else {
      updatedList = updatedList.sort((a, b) => b.Condition - a.Condition);
    }
  } else {
    updatedList = currentListings;
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
  const [sortType, setSortType] = useState('');
  const [ascending, setDirection] = useState(true);

  return (
    <div>
      <Switch>
        <Route path="/:id" component={DetailedListing} />
        <Route
          component={() => (
            <div>
              <SortBar
                updatedListings={currentListings}
                sortType={sortType}
                setSortType={setSortType}
                ascending={ascending}
                setDirection={setDirection}
              />
              <ListingsCollection
                currentListings={currentListings}
                searchTerm={searchTerm}
                sortType={sortType}
                ascending={ascending}
              />
            </div>
          )}
        />
      </Switch>
    </div>
  );
}

export default Listings;
