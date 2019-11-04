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
export function ListingsCollection({ currentListings }) {
  const ListingsDisplay = currentListings.map(listing => (
    <li key={listing.ISBN}>
      <Link to={listing.Title}>{listing.Title}</Link>
    </li>
  ));

  return (
    <div>
      <ul>{ListingsDisplay}</ul>
    </div>
  );
}

function Listings() {
  return (
    <div>
      <Switch>
        <Route path="/:id" component={DetailedListing} />
        <Route
          component={() => <ListingsCollection currentListings={data} />}
        />
      </Switch>
    </div>
  );
}

export default Listings;
