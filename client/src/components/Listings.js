import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Immutable from 'immutable';

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

const SortDiv = styled.div`
  font-size: 85%;
  color: #374068;
`;

export const Detail = styled.div`
  padding: 0.65vw 0.65vw;
  border-radius: 4px;
  background-color: #fafafa;
  margin-top: 8px;
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 10px;
  font-size: 80%;
`;

const ListTitle = styled.h3`
  color: #374068;
  text-align: center;
  font-size: 100%;
`;

const SortBarContainer = styled.div`
    text-align: center;
    padding: 20px;
`;

const Confirmation = styled.div`
  text-align: center;
  background-color: lightgreen;
  border-radius: 1vw;
  margin-top: 2vw;
`;

const LoginMsg = styled.div`
    color: red;
  font-size: 60%;
`;

const EmailButtonStyling = styled.button`
  text-align: center;
  padding: 0.65vw;
  font-size: 80%;
  border-radius: 10vw;
`;

const SortSelect = styled.select`
  color: white;
  height: 2vw;
  background: #374068;
  padding-left: 5px;
  font-size: 70%;
  border: none;
  border-radius: 1vw;
  margin-left: 10px;
  overflow-y: scroll;

  option {
    color: white;
    background: #7f92ca;
    display: flex;
    white-space: pre;
    min-height: 20px;
    max-height: 20px;
    padding: 0px 2px 1px;
    outline: none;
  }
`;

// triggered on button click to post information that the server then uses to send an email to the seller
function sendEmail(sellerInfo, buyerInfo, bookTitle, bookPrice) {
  fetch('/api/bookrequest', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sellerName: sellerInfo.name,
      sellerEmail: sellerInfo.email,
      buyerName: buyerInfo.name,
      buyerEmail: buyerInfo.googleId,
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

const conditions = [
  'Like New',
  'Very Good',
  'Good',
  'Acceptable',
  'Very Worn',
  'Bad'
];

export const DetailedListingsContainer = ({ loggedIn }) => {
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
      loggedIn={loggedIn}
    />
  );
};
export function EmailButtonContainer({ detailedListing, setPurchase }) {
  const [sellerInfo, setSellerInfo] = useState('');
  const [buyerInfo, setBuyerInfo] = useState('');

  useEffect(() => {
    fetch(`/api/sellerInfo/${detailedListing.userID}`)
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

    fetch(`/api/buyerInfo/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setBuyerInfo(Immutable.List(data).get(0));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <EmailButton
      detailedListing={detailedListing}
      setPurchase={setPurchase}
      sellerInfo={sellerInfo}
      buyerInfo={buyerInfo}
    />
  );
}

export const EmailButton = ({
  detailedListing,
  setPurchase,
  sellerInfo,
  buyerInfo
}) => {
  return (
    <EmailButtonStyling
      onClick={() => {
        console.log(sellerInfo);
        sendEmail(
          sellerInfo,
          buyerInfo,
          detailedListing.title,
          detailedListing.price
        );
        setPurchase(true);
      }}
    >
      Place my Order
    </EmailButtonStyling>
  );
};

export function DetailedListing({
  detailedListing,
  purchased,
  setPurchase,
  loggedIn
}) {
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
          {` ${conditions[detailedListing.condition]}`}
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
          <ListingsContainer>
            <Popup
              trigger={
                <EmailButtonStyling disabled={!loggedIn}>
                  Buy Now
                </EmailButtonStyling>
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
            {!loggedIn && (
              <LoginMsg>You must be logged in to purchase a book.</LoginMsg>
            )}
          </ListingsContainer>
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

export function SortBar({ sortType, setSortType }) {
  return (
    <SortBarContainer>
      <SortDiv>
        <strong>Sort by:</strong>
        <SortSelect
          value={sortType}
          onChange={event => {
            setSortType(event.target.value);
          }}
        >
          <option value="Most Recent">Most Recent</option>
          <option value="A to Z">A - Z</option>
          <option value="Z to A">Z - A</option>
          <option value="$ to $$$">$ - $$$</option>
          <option value="$$$ to $">$$$ - $</option>
          <option value="Old to New">Old - New</option>
          <option value="New to Old">New - Old</option>
        </SortSelect>
      </SortDiv>
    </SortBarContainer>
  );
}

export function ListingsCollection({ currentListings, searchTerm, sortType }) {
  let updatedList = currentListings;
  if (searchTerm != null) {
    const searchTerms = searchTerm.split(' ');

    updatedList = currentListings.filter(listing => {
      const editedTitle = listing.title.toLowerCase();
      const editedCourseID = listing.courseID.toLowerCase();
      const editedISBN = listing.ISBN.replace(/-/g, '');

      for (let i = 0; i < searchTerms.length; i++) {
        const term = searchTerms[i].toLowerCase();
        if (term !== '') {
          if (
            editedTitle.includes(term) ||
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

  if (sortType === '$ to $$$' && searchTerm != null) {
    //ascending is true;
    sortedList = updatedList.sort((a, b) => a.price - b.price); //increasing order / asending is true / ↑
  } else if (sortType === '$$$ to $' && searchTerm != null) {
    sortedList = updatedList.sort((a, b) => b.price - a.price);
  } else if (sortType === 'Old to New' && searchTerm != null) {
    sortedList = updatedList.sort((a, b) => b.condition - a.condition);
  } else if (sortType === 'New to Old' && searchTerm != null) {
    sortedList = updatedList.sort((a, b) => a.condition - b.condition);
  } else if (sortType === 'A to Z' && searchTerm != null) {
    sortedList = updatedList.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
  } else if (sortType === 'Z to A' && searchTerm != null) {
    sortedList = updatedList.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return -1;
      } else {
        return 1;
      }
    });
  } else if (sortType === 'Most Recent' && searchTerm != null) {
    sortedList = updatedList.sort((a, b) => {
      return a.edited > b.edited ? -1 : 1;
    });
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
        {conditions[listing.condition]}
      </Detail>
    </ListElementContainer>
  ));

  if (sortedList.size > 0 || searchTerm === null) {
    return (
      <ListingsContainer>
        <List>{ListingsDisplay}</List>
      </ListingsContainer>
    );
  } else {
    return <ListTitle>{'Your search did not return any results.'}</ListTitle>;
  }
}

function Listings({ currentListings, searchTerm, mode, loggedIn }) {
  const [sortType, setSortType] = useState('Most Recent');
  if (mode === 'detailed') {
    return (
      <div>
        <DetailedListingsContainer loggedIn={loggedIn} />
      </div>
    );
  } else if (mode === 'general') {
    return (
      <div>
        {searchTerm != null && (
          <SortBar sortType={sortType} setSortType={setSortType} />
        )}
        {currentListings && (
          <ListingsCollection
            currentListings={currentListings}
            searchTerm={searchTerm}
            sortType={sortType}
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
