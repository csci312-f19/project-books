import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const InputLine = styled.input`
  text-align: left;
  width: 20%;
  height: 15px
  border-radius: 25px;
  border: 2px solid;
  margin: 8px 0;
`;

const InputLineContainer = styled.div`
  text-align: left;
`;

const InputType = styled.span`
  text-align: left;
  padding: 5px;
`;

const WholeContainer = styled.div`
  text-align: center;
`;

function newPosting({ ifPosting }) {
  if (ifPosting === 'general') {
    return (
      <div>
        <button display="block" text-align="center">
          <Link to={'newPosting'} id="newPosting">
            Create New Posting
          </Link>
        </button>
      </div>
    );
  } else if (ifPosting === 'postingView') {
    return (
      <WholeContainer>
        <h2>Create a new posting</h2>

        <InputLineContainer>
          <InputType> Name: </InputType>
          <InputLine type="text" placeholder={'What is your name?'} />
        </InputLineContainer>

        <InputLineContainer>
          <InputType> Book Title: </InputType>
          <InputLine type="text" placeholder={'Title of book'} />
        </InputLineContainer>

        <InputLineContainer>
          <InputType> Book Author: </InputType>
          <InputLine type="text" placeholder={'Author of book'} />
        </InputLineContainer>

        <InputLineContainer>
          <InputType> Course title: </InputType>
          <InputLine type="text" placeholder={'Course that book is for'} />
        </InputLineContainer>

        <InputLineContainer>
          <InputType> Department: </InputType>
          <InputLine type="text" placeholder={'Department course is in'} />
        </InputLineContainer>
      </WholeContainer>
    );
  } else {
  }
}

export default newPosting;
