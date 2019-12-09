import React, { useState } from 'react';
import styled from 'styled-components';
import SubmitPic from '../submit.png';
import { Redirect } from 'react-router';

const InputLine = styled.input`
  text-align: left;
  padding-left: 10px;
  padding-right: 10px;
  width: 30%;
  height: 20px;
  border-radius: 25px;
  border: 2px solid #cccccc;
  margin: 8px 0;
  font-size: 0.9vw;
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
  color: #374068;
  margin-left: 5vw;
  font-size: 1.1vw;
  text-decoration: bold;
`;

const WholeContainer = styled.div`
  margin: 30px 120px;
  border-radius: 50px;
  background-color: #f2f2f2;
  color: #374068;
  padding: 30px 30px;
  border: 3px solid #7f92ca;
`;

const Form = styled.form`
  text-align: center;
`;

const InputComments = styled.textarea`
  margin: 10px 0px;
  display: block;
  margin-left: 8vw;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #374068;
  text-align: center;
  padding: 5px;
  font-size: 1.6vw;
`;
const Required = styled.span`
  color: red;
`;

const Note = styled.div`
  text-align: left;
  padding: 5px;
  font-size: 0.7vw;
  font-style: italic;
  margin-left: 5vw;
`;

const SubmitButton = styled.button`
  width: 50px;
  height: 40px;
  background-color: #8499cf;
  border: none;
  border-radius: 30px;
`;

const Submit = styled.img`
  border: auto;
  width: 20px;
  height: 20px;
`;

const ButtonBar = styled.div`
  text-align: center;
  margin: 30px 20px 0px 20px;
`;

const newPosting = ({ ifPosting }) => {
  const postingInfo = {
    author: '',
    userID: 0,
    courseID: '',
    courseTitle: '',
    ISBN: '',
    title: '',
    price: '',
    condition: 1,
    comments: 'None'
  };
  const [allInfo, setAllInfo] = useState(postingInfo);
  const [redirect, setRedirect] = useState(false);

  const makeInput = (inputType, clientQuery, placeholder) => {
    return (
      <InputLineContainer>
        <InputType> {`${clientQuery}`}:</InputType>
        <Required>* </Required>
        <InputLine
          type="text"
          placeholder={`${placeholder}`}
          onChange={event => {
            postingInfo[inputType] = event.target.value;
            setAllInfo(postingInfo);
          }}
          required
        />
      </InputLineContainer>
    );
  };

  const postListing = () => {
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
  };

  const postBook = () => {
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
  };

  const submitFunction = () => {
    postListing();
    postBook();

    ifPosting = 'general';

    alert(
      `Successfully Submitted!\n
         Your posting contains the following.
         You can edit it in My Postings\n
         Book Title: ${allInfo.title}
         Book Author: ${allInfo.author}
         Course Title: ${allInfo.courseTitle}
         ISBN Number: ${allInfo.ISBN}
         Course Code: ${allInfo.courseID}
         Condition: ${allInfo.condition}
         Price: ${allInfo.price}
         Comments: ${allInfo.comments}\n`
    );
  };

  if (redirect) {
    return <Redirect to="/myPostings" />;
  }

  if (ifPosting === 'general') {
    return <div />;
  } else if (ifPosting === 'postingView') {
    return (
      <WholeContainer>
        <Form
          onSubmit={() => {
            submitFunction();
            setRedirect(true);
          }}
        >
          <SectionTitle>Create a new posting</SectionTitle>
          <br />
          <Required text-align="left">*</Required>
          <span text-align="left">Required Field</span>
          <br />
          {makeInput(
            'title',
            'Book Title',
            'The Guide to the Dr. and Everything React'
          )}
          {makeInput('author', 'Book Author', 'Christopher Andrews')}
          {makeInput('courseTitle', 'Course Title', 'Software Development')}
          {makeInput('ISBN', 'ISBN Number', '123-4-567-89012-3')}
          <Note>
            The ISBN can be found either on the back cover of the book or on the
            inside information page along with the publisher information.
          </Note>
          {makeInput('courseID', 'Course Code', 'CSCI 0312')}
          <InputLineContainer>
            <InputType> Condition:</InputType>
            <Required text-align="left">* </Required>
            <InputSelect
              onChange={event => {
                postingInfo.condition = event.target.value;
                setAllInfo(postingInfo);
              }}
              required
            >
              <option value={1}>Like New</option>
              <option value={2}>Very Good</option>
              <option value={3}>Good</option>
              <option value={4}>Acceptable</option>
              <option value={5}>Very Worn</option>
              <option value={6}>Bad</option>
            </InputSelect>
          </InputLineContainer>

          <InputLineContainer>
            <InputType> Price: $ </InputType>
            <Required text-align="left">* </Required>
            <InputLine
              type="text"
              placeholder={'5.00'}
              onChange={event => {
                postingInfo.price = parseInt(event.target.value);
                setAllInfo(postingInfo);
              }}
              required
            />
          </InputLineContainer>
          <Note>Price must be a number</Note>

          <InputLineContainer>
            <InputType> Additional Comments: </InputType>
            <InputComments
              cols="50"
              rows="10"
              placeholder="Any additional comments you may have. Could include: highlighting, water-stains, never opened, missing pages..."
              onChange={event => {
                postingInfo.comments = event.target.value;
                setAllInfo(postingInfo);
              }}
            />
          </InputLineContainer>
          <InputLineContainer>
            <ButtonBar>
              <SubmitButton value="Submit" type="submit">
                <Submit src={SubmitPic} alt="Submit Posting" />
              </SubmitButton>
            </ButtonBar>
          </InputLineContainer>
        </Form>
      </WholeContainer>
    );
  }
};

export default newPosting;
