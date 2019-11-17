import React from 'react';
import styled from 'styled-components';
import ReactSearchBox from 'react-search-box';

const SearchBarContainer = styled.div`
  text-align: center;
`;

function Search({ setBook, currentListings }) {
  return (
    <SearchBarContainer>
      <ReactSearchBox
        placeholder="Search by Title, Course, ISBN, or Keyword"
        data={currentListings}
        onChange={event => {
          setBook(event);
        }}
      />
    </SearchBarContainer>
  );
}

export default Search;
