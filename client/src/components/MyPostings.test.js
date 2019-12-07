//test for appearance upon rendering
//test for Editing
//test for saving after Editing
//test for deleting
import React from 'react';
import { mount } from 'enzyme';
import App from '.././App';
import { flushPromises } from '.././setupTests';

import { act } from 'react-dom/test-utils';
import MyPostings from './MyPostings.js';
import { View, Detail, EditButtonBar } from './MyPostings.js';

const sampleListings = [
  {
    id: '1',
    title: "American Studies: A User's Guide",
    courseID: 'AMST 0400A',
    userID: '20',
    ISBN: '978-0-520-28773-0',
    condition: 'Like New',
    price: '13',
    edited: '11/7/19',
    comments: 'Some highlighting'
  }
];

const mockResponse = data =>
  Promise.resolve({ ok: true, json: () => Promise.resolve(data) });

const mockFetch = (url, options) => {
  if (options) {
    if (options.method === 'PUT') {
      // we don't store any changes, we just return the same object
      const data = JSON.parse(options.body);
      return mockResponse(data);
    }
  } else {
    return mockResponse(sampleListings);
  }
};

describe('MyListings', () => {
  let app;

  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterAll(() => {
    global.fetch.mockClear();
  });

  beforeEach(async () => {
    app = mount(<MyPostings />);
    await act(async () => await flushPromises());

    app.update();
  });

  test('MyPostings list exists upon page load', async () => {
    const mypostings = app.find(MyPostings);
    //there is one view for each listing, so expect it to find 1
    const myViews = app.find(View).at(0);

    expect(myViews.length).toEqual(1);
    //check that it has all the fields
    const myFields = app.find(Detail);
    expect(myFields.length).toEqual(7);

    // searchbar
    //   .find('input[type="text"]')
    //   .simulate('change', { target: { value: 'user' } });
    // const button = app.find('input[type="submit"]');
    // button.simulate('click');
    //
    // await act(async () => await flushPromises());
    // app.update();
    //
    // expect(app.find(ListElementContainer)).toBeDefined();
    // const listingsList = Array.from(app.find(ListElementContainer));
    // expect(listingsList.length).toEqual(1);
    // //samplelistings[0] is american studies: a user's guide
    // expect(listingsList[0].key).toEqual(sampleListings[0].id);
  });
  test('Can edit postings', async () => {
    const editbutton = app.find(EditButtonBar);
    // editbutton.simulate('click');
  });
});
