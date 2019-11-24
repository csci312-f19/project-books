import React from 'react';
import styled from 'styled-components';

export const SearchBar = styled.input`
  text-align: center;
  width: 50%;
  height: 25px
  border-radius: 25px;
  border: 2px solid;
`;
const SubmitButton = styled.input`
  margin-left: 10px;
  height: 25px;
  width: 50px;
  background: blue;
  color: white;
  border: 0;
  -webkit-appearance: none;
`;
const SearchBarContainer = styled.div`
  text-align: center;
`;

function Search({ setBook }) {
  let book = '';
  return (
    <SearchBarContainer>
      <SearchBar
        type="text"
        placeholder="Search by Title, Course, ISBN, or Keyword"
        onChange={event => {
          book = event.target.value;
          // setBook(event.target.value);
        }}
      />
      <SubmitButton type="submit" onClick={() => setBook(book)} />
    </SearchBarContainer>
  );
}

export default Search;
