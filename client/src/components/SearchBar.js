import React from 'react';
import styled from 'styled-components';

export const SearchBar = styled.input`
  text-align: center;
  width: 60%;
  height: 25px
  border-radius: 25px;
  border: 2px solid #CCCCCC;
`;
const SearchBarContainer = styled.div`
  text-align: center;
`;

function Search({ setBook }) {
  return (
    <SearchBarContainer>
      <SearchBar
        type="text"
        placeholder="Search by Title, Course, ISBN, or Keyword"
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
