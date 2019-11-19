import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

//import Immutable from 'immutable';

const ListingsContainer = styled.div`
  text-align: center;
`;
const List = styled.ul`
  list-style-type: none;
  height: 20px;
`;
export const ListElementContainer = styled.li`
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

//  box-sizing: border-box;

export const DetailedListing = () => {
  const [detailedListing, setDetailedListing] = useState('');

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/bookListings/${id}`) //is it bad to get all of the listings if the user doesnt necessarily need all of them ?
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log(data[0]);
        setDetailedListing(data[0]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>{detailedListing.title}</h2>
      <div>ISBN: {detailedListing.ISBN}</div>
      <div>Comments:{detailedListing.comments} </div>
      <div>Condition:{detailedListing.condition} </div>
      <div>courseID: {detailedListing.courseID} </div>
      <div>edited:{detailedListing.edited} </div>
      <div>price: {detailedListing.price} </div>
    </div>
  );
};

export const SortBar = ({ sortType, setSortType, ascending, setDirection }) => {
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

export function ListingsCollection({
  currentListings,
  searchTerm,
  sortType,
  ascending
}) {
  let updatedList = currentListings;

  if (searchTerm != null) {
    const searchTerms = searchTerm.split(' ');

    updatedList = currentListings.filter(listing => {
      const editedTitle = listing.title.toLowerCase();
      const editedCourseTitle = listing.courseID.toLowerCase();
      // let editedAuthor=listing.Author.toUpperCase();

      for (let i = 0; i < searchTerms.length; i++) {
        const term = searchTerms[i].toLowerCase();
        if (term !== '') {
          if (
            editedTitle.includes(term) ||
            editedCourseTitle.includes(term) ||
            listing.ISBN.includes(term)
          ) {
            return true;
          }
        }
      }
      return false;
    });
  }

  let sortedList;

  if (sortType === 'Price') {
    if (ascending) {
      //ascending is true;
      sortedList = updatedList.sort((a, b) => a.Price - b.Price); //increasing order / asending is true / ↑
    } else {
      sortedList = updatedList.sort((a, b) => b.Price - a.Price);
    }
  } else if (sortType === 'Condition') {
    if (ascending) {
      sortedList = updatedList.sort((a, b) => a.Condition - b.Condition);
    } else {
      sortedList = updatedList.sort((a, b) => b.Condition - a.Condition);
    }
  } else {
    sortedList = updatedList;
  }

  const ListingsDisplay = sortedList.map(listing => (
    //Listtitle will be whatever it is that we search by
    // All the others will run though list of other properties to populate ListElement probably

    <ListElementContainer key={listing.ISBN}>
      <ListTitle>{listing.title}</ListTitle>
      <ListElement>{listing.courseID}</ListElement>
      <ListElement>{listing.courseTitle}</ListElement>
      <ListElement>{listing.ISBN}</ListElement>
      <ListElement>{listing.price}</ListElement>
      <ListElement>{listing.condition}</ListElement>
      <Link to={String(listing.listingID)}>More Info</Link>
    </ListElementContainer>
  ));

  return (
    <ListingsContainer>
      <List>{ListingsDisplay}</List>
    </ListingsContainer>
  );
}

function Listings({ currentListings, searchTerm, mode }) {
  const [sortType, setSortType] = useState('');
  const [ascending, setDirection] = useState(true);
  if (mode === 'detailed') {
    return (
      <div>
        <DetailedListing />
      </div>
    );
  } else {
    return (
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
    );
  }
}

export default Listings;
