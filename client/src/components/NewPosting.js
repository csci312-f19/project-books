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

const InputSelect = styled.select`
  text-align: center;
    position: relative;
    display: inline;
`;

const InputLineContainer = styled.div`
  text-align: left;
  padding: 5px;
`;

const InputType = styled.span`
  text-align: left;
`;

const WholeContainer = styled.div`
  text-align: center;
`;

const InputComments = styled.textarea`
  margin: 10px 0px;
  display: block;
`;

const SubmitButton = styled.button``;

function newPosting({ ifPosting }) {
  let postingInfo = {
    courseID: '',
    courseTitle: '',
    ISBN: '',
    Title: '',
    'New Only': '',
    Price: '',
    Condition: '',
    Comments: ''
  };

  const [allInfo, setAllInfo] = useState(postingInfo);

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
        // Dont need this if have accounts?
        <InputLineContainer>
          <InputType> Name: </InputType>
          <InputLine type="text" placeholder={'What is your name?'} />
        </InputLineContainer>
        <InputLineContainer>
          <InputType> Book Title: </InputType>
          <InputLine
            type="text"
            placeholder={'Title of book'}
            onChange={event => {
              postingInfo.Title = event.target.value;
              setAllInfo(postingInfo);
            }}
          />
        </InputLineContainer>
        <InputLineContainer>
          <InputType> Book Author: </InputType>
          <InputLine
            type="text"
            placeholder={'Author of book'}
            onChange={event => {
              postingInfo.Author = event.target.value;
              setAllInfo(postingInfo);
            }}
          />
        </InputLineContainer>
        <InputLineContainer>
          <InputType> Course title: </InputType>
          <InputLine
            type="text"
            placeholder={'Course that book is for'}
            onChange={event => {
              postingInfo.courseTitle = event.target.value;
              setAllInfo(postingInfo);
            }}
          />
        </InputLineContainer>
        <InputLineContainer>
          <InputType> ISBN Number: </InputType>
          <InputLine
            type="text"
            placeholder={'ISBN nummber for this book'}
            onChange={event => {
              postingInfo.ISBN = event.target.value;
              setAllInfo(postingInfo);
            }}
          />
          <div>
            {' '}
            This can be found either on the back cover of the book or on the
            inside information page along with the publisher info{' '}
          </div>
        </InputLineContainer>
        <InputLineContainer>
          <InputType> Course Code: </InputType>
          <InputLine
            type="text"
            placeholder={'Course code for course'}
            onChange={event => {
              postingInfo.courseID = event.target.value;
              setAllInfo(postingInfo);
            }}
          />
        </InputLineContainer>
        <InputLineContainer>
          <InputType> Condition: </InputType>
          <InputSelect>
            <option value="New">New</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Acceptable">Acceptable</option>
            <option value="Very Worn">Very Worn</option>
            <option value="Bad">Bad</option>
            onChange=
            {event => {
              postingInfo.Condition = event.target.value;
              setAllInfo(postingInfo);
            }}
          </InputSelect>
        </InputLineContainer>
        // Should require this to be a number
        <InputLineContainer>
          <InputType> Price: </InputType>
          <InputLine
            type="text"
            placeholder={'Price you wish to sell at'}
            onChange={event => {
              postingInfo.Price = event.target.value;
              setAllInfo(postingInfo);
            }}
          />
        </InputLineContainer>
        <InputLineContainer>
          <InputType> Any Additional Comments: </InputType>
          <InputComments
            cols="50"
            rows="10"
            placeholder="Any additional comments you have. Could include: highlighted, water-stained, never opened, missing pages."
            onChange={event => {
              postingInfo.Comments = event.target.value;
              setAllInfo(postingInfo);
            }}
          />
        </InputLineContainer>
        <InputLineContainer>
          <SubmitButton
            type="button"
            value="submit"
            onClick={() => {
              //this is where put will happen
              // Also an alert with all of the Info
              console.log(allInfo);
            }}
          >
            Submit
          </SubmitButton>
        </InputLineContainer>
      </WholeContainer>
    );
  } else {
  }
}

export default newPosting;
