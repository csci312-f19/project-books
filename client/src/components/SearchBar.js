import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

export const SearchBar = styled.input`
  text-align: left;
  padding-left: 10px;
  padding-right: 60px;
  width: 50%;
  height: 25px;
  border-radius: 25px;
  border: 2px solid #cccccc;
  z-index: 1;
`;
const SubmitButton = styled.input`
  margin-left: 10px;
  height: 25px;
  width: 50px;
  background: #67a5d2;
  color: #fafafa;
  border: 0;
  -webkit-appearance: none;
  position: absolute;
  border-radius: 40px;
  z-index: 2;
`;
const SearchBarContainer = styled.div`
  text-align: center;
  position: relative;
`;

function Search({ setBook }) {
  const [book, setCurrBook] = useState('');
  return (
    <SearchBarContainer>
      <SearchBar
        type="text"
        placeholder="Search by Title, Course ID, ISBN, or Keyword"
        onChange={event => {
          setCurrBook(event.target.value);
        }}
        onKeyDown={event => {
          if (event.keyCode === 13) {
            setBook(event.target.value);
          }
        }}
      />
      <SubmitButton type="submit" onClick={() => setBook(book)} />
    </SearchBarContainer>
  );
}

export default Search;
