import React from 'react';

export function ListingsCollection({ currentListings }) {
  const ListingsDisplay = currentListings.map(listing => (
    <li key={listing.ISBN}>{listing.Condition}</li>
  ));

  return (
    <div>
      <ul>{ListingsDisplay}</ul>
    </div>
  );
}

const Listings = ({ listings }) => {
  const TextBookListings = () => (
    <ListingsCollection currentListings={listings} />
  );

  return (
    <div>
      <TextBookListings />
    </div>
  );
};

export default Listings;
