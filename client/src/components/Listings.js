import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Immutable from 'immutable';

// import Immutable from 'immutable';

const ListingsContainer = styled.div`
  text-align: center;
`;

const List = styled.ul`
  list-style-type: none;
`;
export const ListElementContainer = styled.li`
  margin: 30px 120px;
  border-radius: 50px;
  background-color: #f2f2f2;
  color: #374068;
  padding: 20px 20px;
  border: 3px solid #a3bdd0;
  text-align: left;
`;

const View = styled.div`
  margin: 30px 120px 100px;
  border-radius: 50px;
  background-color: #f2f2f2;
  color: #374068;
  padding: 20px 20px;
  border: 3px solid #6e6db2;
`;

const Detail = styled.div`
  padding: 0.65vw 0.65vw;
  border-radius: 4px;
  background-color: #fafafa;
  margin-top: 8px;
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 10px;
  font-size: 90%;
`;

const ListTitle = styled.h3`
  color: #374068;
  text-align: center;
  font-size: 110%;
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
  border-radius: 1vw;
  margin-top: 2vw;
`;

const EmailButtonStyling = styled.button`
  color: #374068;
  text-align: center;
  padding: 0.75vw;
  font-size: 100%;
  border-radius: 10vw;
`;

//background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

//  box-sizing: border-box;

// triggered on button click to post information that the server then uses to send an email to the seller
function sendEmail(sellerInfo, bookTitle, bookPrice) {
  fetch('/api/bookrequest', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: sellerInfo.name,
      email: sellerInfo.email,
      bookTitle: bookTitle,
      bookPrice: bookPrice
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log('Response:', res);
    })
    .catch(err => {
      console.error('Error: ', err);
    });
}
export const DetailedListingsContainer = () => {
  const [detailedListing, setDetailedListing] = useState('');
  const [purchased, setPurchase] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/bookListings/${id}`)
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
    <DetailedListing
      detailedListing={detailedListing}
      purchased={purchased}
      setPurchase={setPurchase}
    />
  );
};
export function EmailButtonContainer({ detailedListing, setPurchase }) {
  const [sellerInfo, setSellerInfo] = useState('');

  useEffect(() => {
    fetch(`/api/googleID/${detailedListing.userID}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setSellerInfo(Immutable.List(data).get(0));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <EmailButton
      detailedListing={detailedListing}
      setPurchase={setPurchase}
      sellerInfo={sellerInfo}
    />
  );
}

export const EmailButton = ({ detailedListing, setPurchase, sellerInfo }) => {
  return (
    <EmailButtonStyling
      onClick={() => {
        sendEmail(sellerInfo, detailedListing.title, detailedListing.price);
        setPurchase(true);
      }}
    >
      Place my Order
    </EmailButtonStyling>
  );
};

export function DetailedListing({ detailedListing, purchased, setPurchase }) {
  return (
    <List>
      <View>
        <ListTitle>{detailedListing.title}</ListTitle>
        <Detail>
          <strong>ISBN</strong>
          {` ${detailedListing.ISBN}`}
        </Detail>
        <Detail>
          <strong>Comments</strong>
          {` ${detailedListing.comments}`}
        </Detail>
        <Detail>
          <strong>{`Condition`}</strong>
          {` ${detailedListing.condition}`}
        </Detail>
        <Detail>
          <strong>{`Course ID`}</strong>
          {` ${detailedListing.courseID}`}
        </Detail>
        <Detail>
          <strong>{`Edited Date`}</strong>
          {` ${detailedListing.edited}`}
        </Detail>
        <Detail>
          <strong>{`Price`}</strong> {` $${detailedListing.price}`}
        </Detail>
        {!purchased && (
          <Popup
            trigger={
              <ListingsContainer>
                <EmailButtonStyling> Buy Now </EmailButtonStyling>
              </ListingsContainer>
            }
            position="bottom center"
          >
            <div>
              {`Are you sure you would like to buy this book? Finalizing your purchase
          will confirm your order and send an alert to the seller.    `}
              <EmailButtonContainer
                detailedListing={detailedListing}
                setPurchase={setPurchase}
              />
            </div>
          </Popup>
        )}

        <div>
          {purchased && (
            <Confirmation>
              Your request has successfully been sent to the seller of this
              book. Expect to hear back via email in 3 days or less. If you have
              not heard back by then, feel free to submit a new request.
            </Confirmation>
          )}
        </div>
      </View>
    </List>
  );
}

export function SortBar({ sortType, setSortType, ascending, setDirection }) {
  return (
    <SortBarContainer>
      <div>
        Sort by: {'  '}
        <SelectBar
          value={sortType}
          onChange={event => {
            setSortType(event.target.value);
            if (sortType === 'Alphabetical') {
              setDirection(true);
            }
          }}
        >
          <option value="Alphabetical">Alphabetical</option>
          <option value="Price">Price</option>
          <option value="Condition">Condition</option>
        </SelectBar>
        {(sortType === 'Price' ||
          sortType === 'Condition' ||
          sortType === 'Alphabetical') && (
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
      </div>
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
      const editedISBN = listing.ISBN.replace(/-/g, '');
      // let editedAuthor=listing.Author.toUpperCase();

      for (let i = 0; i < searchTerms.length; i++) {
        const term = searchTerms[i].toLowerCase();
        if (term !== '') {
          if (
            editedTitle.includes(term) ||
            // editedCourseTitle.includes(term) ||
            editedCourseID.includes(term) ||
            listing.ISBN.includes(term) ||
            editedISBN.includes(term)
          ) {
            return true;
          }
        }
      }
      return false;
    });
  }

  let sortedList = [];

  if (sortType === 'Price' && searchTerm != null) {
    if (ascending) {
      //ascending is true;
      sortedList = updatedList.sort((a, b) => a.price - b.price); //increasing order / asending is true / ↑
    } else {
      sortedList = updatedList.sort((a, b) => b.price - a.price);
    }
  } else if (sortType === 'Condition' && searchTerm != null) {
    if (ascending) {
      sortedList = updatedList.sort((a, b) => a.condition - b.condition);
    } else {
      sortedList = updatedList.sort((a, b) => b.condition - a.condition);
    }
  } else if (sortType === 'Alphabetical' && searchTerm != null) {
    if (ascending) {
      sortedList = updatedList.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else {
          return 1;
        }
      });
    } else {
      sortedList = updatedList.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        } else {
          return 1;
        }
      });
    }
  } else if (searchTerm != null) {
    sortedList = updatedList;
  }
  const ListingsDisplay = sortedList.map(listing => (
    //Listtitle will be whatever it is that we search by
    // All the others will run though list of other properties to populate ListElement probably
    <ListElementContainer key={listing.id}>
      <ListTitle>
        <Link to={String(listing.id)}>{listing.title}</Link>
      </ListTitle>

      <Detail>
        <strong>Course: </strong>
        {listing.courseID}
      </Detail>
      <Detail>
        <strong>ISBN: </strong>
        {listing.ISBN}
      </Detail>
      <Detail>
        <strong>Price: $</strong>
        {listing.price}
      </Detail>
      <Detail>
        <strong>Condition: </strong>
        {listing.condition}
      </Detail>
    </ListElementContainer>
  ));

  return (
    <ListingsContainer>
      <List>{ListingsDisplay}</List>
    </ListingsContainer>
  );
}

function Listings({ currentListings, searchTerm, mode }) {
  const [sortType, setSortType] = useState('Alphabetical');
  const [ascending, setDirection] = useState(true);
  if (mode === 'detailed') {
    return (
      <div>
        <DetailedListingsContainer />
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
        {console.log(currentListings)}
        {currentListings && (
          <ListingsCollection
            currentListings={currentListings}
            searchTerm={searchTerm}
            sortType={sortType}
            ascending={ascending}
          />
        )}
        {!currentListings && <div>Hi</div>}
      </div>
    );
  } else {
    return;
  }
}

export default Listings;
