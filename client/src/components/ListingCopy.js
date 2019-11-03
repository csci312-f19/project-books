import React from 'react';

function ListingsCollection({ currentListings }) {
  const ListingsDisplay = currentListings.map(listing => (
    <li key={listing.ISBN}>{listing.Title}</li>
  ));

  return (
    <div>
      <ul>{ListingsDisplay}</ul>
    </div>
  );
}

const SortBar = ({ sortType, sortBy, ascending }) => {
  return (
    <select
      value={sortType}
      onChange={event => {
        sortBy(event.target.value, ascending);
      }}
    >
      <option value="Default">Default</option>
      <option value="Price">Price</option>
      <option value="Condition">Condition</option>
    </select>
  );
};

function Listings({
  listings,
  setListings,
  sortType,
  setSortType,
  ascending,
  flipDirection
}) {
  const TextBookListings = () => (
    <ListingsCollection currentListings={listings} />
  );

  const DirectionArrow = ({ ascending, flipDirection }) => {
    return (
      <span
        onClick={() => {
          flipDirection();
          sortBy(sortType, !ascending);
        }}
      >
        {ascending ? '↓' : '↑'}
      </span>
    );
  };

  const direction = (
    <DirectionArrow ascending={ascending} flipDirection={flipDirection} />
  );

  const conditions = ['Like New', 'Good', 'Acceptable'];

  const sortBy = (type, sortDirection) => {
    let newListings;
    if (type === 'Price') {
      if (sortDirection) {
        //ascending is true;
        newListings = listings.sort((a, b) => a.Price - b.Price); //从小到大排序 —— asending is true ↑
      } else {
        newListings = listings.sort((a, b) => b.Price - a.Price);
      }
    } else if (type === 'Condition') {
      if (sortDirection) {
        newListings = listings.sort(
          (a, b) =>
            conditions.indexOf(a.Condition) - conditions.indexOf(b.Condition)
        );
      } else {
        newListings = listings.sort(
          (a, b) =>
            conditions.indexOf(b.Condition) - conditions.indexOf(a.Condition)
        );
      }
    } else {
      newListings = listings;
    }
    setSortType(type);
    setListings(newListings);
  };

  return (
    <div>
      <SortBar
        sortType={sortType}
        setSortType={setSortType}
        sortBy={sortBy}
        ascending={ascending}
      />
      sorting direction: {direction}
      <TextBookListings />
    </div>
  );
}

export default Listings;
