import React from 'react';
import { mount } from 'enzyme';

import { flushPromises } from '.././setupTests';

import { act } from 'react-dom/test-utils';
import MyPostings from './MyPostings.js';
import {
  View,
  Detail,
  NewInput,
  NewSelect,
  EditDiv,
  ButtonBar
} from './MyPostings.js';

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

describe('MyListings main page tests', () => {
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

  test('MyPostings list contains all elements of a listing upon load', async () => {
    expect(app.find(MyPostings)).toBeDefined();
    //there is one view for each listing, so expect it to find 1
    const myViews = app.find(View).at(0);

    expect(myViews.length).toEqual(1);
    //check that it has all the fields
    const myFields = app.find(Detail);
    expect(myFields.length).toEqual(7);
    window.confirm = jest.fn();
  });
});
