import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
// import Immutable from 'immutable';

const ListingsContainer = styled.div`
  text-align: center;
`;

const ColoredText = styled.div`
  color: #374068;
`;

const List = styled.ul`
  list-style-type: none;
  height: 20px;
`;
export const ListElementContainer = styled.li`
  border: 3px solid #a3bdd0;
  padding: 4px;
  margin: 5px auto 5px auto;
  width: 55%;
  text-align: center;
`;

const Container = styled.li`
  border: 3px solid #a3bdd0;
  padding: 4px;
  margin: 5px auto 5px auto;
  width: 55%;
  text-align: center;
`;

const ListElement = styled.p`
  color: #374068;
  margin-left: 5vw;
  font-size: 1.1vw;
`;

const ListTitle = styled.h2`
  font-size: 20px;
  color: #374068;
  text-align: center;
  padding: 5px;
  text-decoration: underline;
  font-size: 1.4vw;
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

const Confirmation = styled.div`
  text-align: center;
  background-color: lightgreen;
`;

const BuyButton = styled.button`
  color: #374068;
  text-align: center;
  padding: 5px;
  font-size: 1.3vw;
`;

//background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

//  box-sizing: border-box;

// triggered on button click to post information that the server then uses to send an email to the seller
function sendEmail(name, email, bookTitle, bookPrice) {
  fetch('/api/bookrequest', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      email: email,
      bookTitle: bookTitle,
      bookPrice: bookPrice
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log('here is the response: ', res);
    })
    .catch(err => {
      console.error('here is the error: ', err);
    });
}

export const DetailedListing = () => {
  const [detailedListing, setDetailedListing] = useState('');
  const [purchased, setPurchase] = useState(false);

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
        setDetailedListing(data[0]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <List>
        <Container>
          <ListTitle>{detailedListing.title}</ListTitle>
          <ColoredText>
            <strong>{`${'\xa0'.repeat(18)}ISBN${'\xa0'.repeat(3)}`}</strong>{' '}
            {` ${detailedListing.ISBN}`}
          </ColoredText>
          <ColoredText>
            <strong>{`${'\xa0'.repeat(5)}Comments${'\xa0'.repeat(3)}`}</strong>
            {` ${detailedListing.comments}`}{' '}
          </ColoredText>
          <ColoredText>
            <strong>{`Condition${'\xa0'.repeat(3)}`}</strong>
            {` ${detailedListing.condition}`}
            {'\xa0'.repeat(6)}
          </ColoredText>
          <ColoredText>
            <strong>{`Course ID${'\xa0'.repeat(3)}`}</strong>{' '}
            {` ${detailedListing.courseID}`}
          </ColoredText>
          <ColoredText>
            <strong>{`Edited Date${'\xa0'.repeat(3)}`}</strong>
            {` ${detailedListing.edited}`} {'\xa0'.repeat(11)}
          </ColoredText>
          <ColoredText>
            <strong>{`Price${'\xa0'.repeat(3)}`}</strong>{' '}
            {` $${detailedListing.price}`} {'\xa0'.repeat(5)}
          </ColoredText>
          <br />
          {!purchased && (
            <Popup
              trigger={
                <ListingsContainer>
                  <BuyButton> Buy Now </BuyButton>
                </ListingsContainer>
              }
              position="bottom center"
            >
              <div>
                {`Are you sure you would like to buy this book? Finalizing your purchase
          will confirm your order and send an alert to the seller.    `}
                <BuyButton
                  onClick={() => {
                    sendEmail(
                      'Hannah',
                      'hdonovan@middlebury.edu',
                      detailedListing.title,
                      detailedListing.price
                    );
                    setPurchase(true);
                  }}
                >
                  Place my Order
                </BuyButton>
              </div>
            </Popup>
          )}
        </Container>
        <div>
          {purchased && (
            <Confirmation>
              {' '}
              Congratulations! Your request has been sent to the seller of this
              book. Expect to hear back via email in 3 days or less. If you have
              not heard back by then, feel free to submit a new request.{' '}
            </Confirmation>
          )}{' '}
        </div>
      </List>
    </div>
  );
};

export function SortBar({ sortType, setSortType, ascending, setDirection }) {
  return (
    <SortBarContainer>
      <ColoredText>
        Sort by: {'  '}
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
      </ColoredText>
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
}

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
      // const editedCourseTitle = listing.courseTitle.toLowerCase();
      const editedCourseID = listing.courseID.toLowerCase();
      // let editedAuthor=listing.Author.toUpperCase();

      for (let i = 0; i < searchTerms.length; i++) {
        const term = searchTerms[i].toLowerCase();
        if (term !== '') {
          if (
            editedTitle.includes(term) ||
            // editedCourseTitle.includes(term) ||
            editedCourseID.includes(term) ||
            listing.ISBN.includes(term)
          ) {
            return true;
          }
        }
      }
      return false;
    });
  }

  let sortedList = [];

  if (sortType === 'Price') {
    if (ascending) {
      //ascending is true;
      sortedList = updatedList.sort((a, b) => a.price - b.price); //increasing order / asending is true / ↑
    } else {
      sortedList = updatedList.sort((a, b) => b.price - a.price);
    }
  } else if (sortType === 'Condition') {
    if (ascending) {
      sortedList = updatedList.sort((a, b) => a.condition - b.condition);
    } else {
      sortedList = updatedList.sort((a, b) => b.condition - a.condition);
    }
  } else if (searchTerm != null) {
    sortedList = updatedList;
  }

  const ListingsDisplay = sortedList.map(listing => (
    //Listtitle will be whatever it is that we search by
    // All the others will run though list of other properties to populate ListElement probably
    <ListElementContainer key={listing.ISBN}>
      <ListTitle>
        <Link to={String(listing.listingID)}>{listing.title}</Link>
      </ListTitle>

      <ListElement>
        <strong>Course: </strong>
        {listing.courseID}
      </ListElement>
      <ListElement>{listing.courseTitle}</ListElement>
      <ListElement>
        <strong>ISBN: </strong>
        {listing.ISBN}
      </ListElement>
      <ListElement>
        <strong>Price: $</strong>
        {listing.price}
      </ListElement>
      <ListElement>
        <strong>Condition: </strong>
        {listing.condition}
      </ListElement>
    </ListElementContainer>
  ));

  return (
    <ListingsContainer>
      <List>{ListingsDisplay}</List>
    </ListingsContainer>
  );
}

function Listings({ currentListings, searchTerm, mode }) {
  const [sortType, setSortType] = useState('Default');
  const [ascending, setDirection] = useState(true);
  if (mode === 'detailed') {
    return (
      <div>
        <DetailedListing />
      </div>
    );
  } else if (mode === 'general') {
    return (
      <div>
        <SortBar
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
  } else {
    return;
  }
}

export default Listings;
