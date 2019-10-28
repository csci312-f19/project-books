import React from 'react';
import data from '.././Data/SampleData.json';

export function ListingsCollection({ currentListings }) {
  const ListingsDisplay = currentListings.map(listing => (
    <li key={listing.ISBN}>{listing.Title}</li>
  ));

  return (
    <div>
      <ul>{ListingsDisplay}</ul>
    </div>
  );
}

const FilterBar = undefined;

function Listings() {
  let textbookListings;
  textbookListings = <ListingsCollection currentListings={data} />;
  return <div>{textbookListings}</div>;
}

export default Listings;
