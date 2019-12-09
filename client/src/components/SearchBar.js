import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

export const SearchBar = styled.input`
  text-align: left;
  padding-left: 1vw;
  padding-right: 5vw;
  width: 50%;
  height: 1.5vw;
  border-radius: 1vw;
  border: 2px solid #cccccc;
  z-index: 1;
`;
const SubmitButton = styled.input`
  margin-left: 10px;
  font-size: 75%;
  height: 1.5vw;
  width: 60px;
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
