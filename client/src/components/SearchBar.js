import React from 'react';
import styled from 'styled-components';

export const SearchBar = styled.input`
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  width: 50%;
  height: 25px;
  border-radius: 25px;
  border: 2px solid #cccccc;
`;
const SearchBarContainer = styled.div`
  text-align: center;
`;

function Search({ setBook }) {
  return (
    <SearchBarContainer>
      <SearchBar
        type="text"
        placeholder="Search by Title, Course ID, ISBN, or Keyword"
        onKeyUp={event => {
          if (event.key === 'Enter') {
            setBook(event.target.value);
          }
        }}
      />
    </SearchBarContainer>
  );
}

export default Search;
