import React from 'react';
import styled from 'styled-components';

const SearchBar = styled.input`
  text-align: center;
  width: 50%;
  height: 25px
  border-radius: 25px;
  border: 2px solid;
`;
const SearchBarContainer = styled.div`
  text-align: center;
`;

function Search({ setBook, currentBook }) {
  return (
    <SearchBarContainer>
      <SearchBar
        type="text"
        placeholder={'Search by Title, Course, ISBN, or Keyword'}
        onChange={event => {
          setBook(event.target.value);
        }}
      />
    </SearchBarContainer>
  );
}

export default Search;
