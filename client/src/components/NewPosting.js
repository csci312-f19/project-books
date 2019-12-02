import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const InputLine = styled.input`
  text-align: left;
  width: 30%;
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

const newPosting = ({ ifPosting }) => {
  const postingInfo = {
    author: '',
    userID: 0,
    courseID: '',
    courseTitle: '',
    ISBN: '',
    title: '',
    price: '',
    condition: '',
    comments: ''
  };
  const BackButton = styled.button``;
  const [allInfo, setAllInfo] = useState(postingInfo);

  // Should require price, ISBN, something else? to be a number
  // Dont need name if have accounts?

  //{makeInput("price", "Price:", "5")}

  const makeInput = (inputType, clientQuery, placeholder) => {
    return (
      <InputLineContainer>
        <InputType> {`${clientQuery}`}: </InputType>
        <InputLine
          type="text"
          placeholder={`${placeholder}`}
          onChange={event => {
            postingInfo[inputType] = event.target.value;
            setAllInfo(postingInfo);
          }}
        />
      </InputLineContainer>
    );
  };

  if (ifPosting === 'general') {
    return <div></div>;
  } else if (ifPosting === 'postingView') {
    return (
      <WholeContainer>
        <h2>Create a new posting</h2>
        <BackButton>
          <Link to={''} id="">
            Back to Main Page
          </Link>
        </BackButton>
        <InputLineContainer>
          <InputType> Name: </InputType>
          <InputLine type="text" placeholder={'What is your name?'} />
        </InputLineContainer>
        {makeInput(
          'title',
          'Book Title',
          'The Guide to the Dr. and Everything React'
        )}
        {makeInput('author', 'Book Author', 'Christopher Andrews')}
        {makeInput('courseTitle', 'Course title', 'Software Development')}
        {makeInput('ISBN', 'ISBN number', '123-4-567-89012-3')}
        <div>
          {' '}
          This can be found either on the back cover of the book or on the
          inside information page along with the publisher info{' '}
        </div>
        {makeInput('courseID', 'Course Code', 'CSCI 0312')}
        <InputLineContainer>
          <InputType> Condition: </InputType>
          <InputSelect
            onChange={event => {
              postingInfo.condition = event.target.value;
              setAllInfo(postingInfo);
            }}
          >
            <option value="New">New</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Acceptable">Acceptable</option>
            <option value="Very Worn">Very Worn</option>
            <option value="Bad">Bad</option>
          </InputSelect>
        </InputLineContainer>

        <InputLineContainer>
          <InputType> Price: </InputType>
          <InputLine
            type="text"
            placeholder={'5'}
            onChange={event => {
              postingInfo.price = parseInt(event.target.value);
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
              postingInfo.comments = event.target.value;
              setAllInfo(postingInfo);
            }}
          />
        </InputLineContainer>

        <InputLineContainer>
          <SubmitButton
            type="button"
            value="submit"
            onClick={() => {
              console.log(allInfo);
              //this is where put will happen
              // Also an alert with all of the Info, if they accept, then it will post
              fetch(`/api/newPosting/Listing`, {
                method: 'POST',
                body: JSON.stringify(postingInfo),
                headers: new Headers({ 'Content-type': 'application/json' })
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.status_text);
                  }
                  return response.json();
                })
                .then(updatedPosting => {
                  setAllInfo(updatedPosting);
                })
                .catch(err => console.log(err)); // eslint-disable-line no-console

              fetch(`/api/newPosting/Book`, {
                method: 'POST',
                body: JSON.stringify(postingInfo),
                headers: new Headers({ 'Content-type': 'application/json' })
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error(response.status_text);
                  }
                  return response.json();
                })
                .then(updatedPosting => {
                  setAllInfo(updatedPosting);
                })
                .catch(err => console.log(err)); // eslint-disable-line no-console

              ifPosting = 'general';
            }}
          >
            <Link to={''} id="">
              Submit
            </Link>
          </SubmitButton>
        </InputLineContainer>
      </WholeContainer>
    );
  }
};

export default newPosting;
