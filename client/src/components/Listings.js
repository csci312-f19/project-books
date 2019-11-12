import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

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

const DetailedListing = () => {
  const [detailedListing, setDetailedListing] = useState('');

  let { id } = useParams();

  useEffect(() => {
    fetch(`/api/bookListings/${id}`) //is it bad to get all of the listings if the user doesnt necessarily need all of them ?
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setDetailedListing(data[0]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>{detailedListing.title}</h2>
    </div>
  );
};

function getBookByISBN(listing) {
  // alert("in call")

  const isbn = listing.ISBN;
  fetch(`/api/books/${isbn}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      return data; //how do i return this data at the end of the function ? let will not persist outside of scope
    })
    .catch(err => console.log(err));
}

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
  if (currentListings.length !== 0) {
    console.log(currentListings);
    const book = getBookByISBN(currentListings[0]); //change this to only take in an ID ?
    console.log(book);
    // console.log("^^^")
  }

  const ListingsDisplay = currentListings.map(listing => (
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
  if (mode === 'detailed') {
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
