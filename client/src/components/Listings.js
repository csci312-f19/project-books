import React from 'react';
import data from '.././Data/SampleData.json';
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const DetailedListing = ({ match }) => {
  return (
    <div>
      <h2>{match.params.id}</h2>
    </div>
  );
};
export function ListingsCollection({ currentListings, setDetailedListing }) {
  const ListingsDisplay = currentListings.map((
    listing //nav link?
  ) => (
    <li
      key={listing.ISBN}
      onClick={() => {
        setDetailedListing(true);
      }}
    >
      <Link to={listing.Title}>{listing.Title}</Link>
    </li>
  ));

  return (
    <div>
      <ul>{ListingsDisplay}</ul>
    </div>
  );
}

const FilterBar = undefined;

function Listings() {
  const [detailedListing, setDetailedListing] = useState(false);

  let textbookListings;
  textbookListings = (
    <ListingsCollection
      currentListings={data}
      setDetailedListing={setDetailedListing}
    />
  );
  return (
    <Router>
      <div>
        {!detailedListing && textbookListings}
        <Route path="/:id" component={DetailedListing} />
      </div>
    </Router>
  );
}

export default Listings;
