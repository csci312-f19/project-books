import React from 'react';
import { mount } from 'enzyme';
import App from '.././App';
import { flushPromises } from '.././setupTests';

import { act } from 'react-dom/test-utils';
import SearchBar from './SearchBar';

import { ListElementContainer } from './Listings';

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
  },
  {
    id: '2',
    title: 'Winesburg, Ohio',
    courseID: 'AMST/ENAM 0282A',
    userID: '30',
    ISBN: '978-0-486-28269-5',
    condition: 'Good',
    price: '4',
    edited: '10/4/12',
    comments: 'Missing cover'
  },
  {
    id: '3',
    title: 'Object of Memory: Arab and Jew Narrate the Palestinian Village',
    courseID: 'ANTH 0355',
    userID: '40',
    ISBN: '978-0-8122-1525-0',
    condition: 'Acceptable',
    price: '20',
    edited: '1/31/88',
    comments: 'this book is so good!'
  },
  {
    id: '4',
    title: 'Stuffed and Starved, Revised and Expanded',
    courseID: 'FYSE 1431',
    userID: '50',
    ISBN: '978-1-61219-127-0',
    condition: 'Very Good',
    price: '15',
    edited: '5/26/98',
    comments: 'no markings'
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

describe('Tests for listings appearances', () => {
  let app;

  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterAll(() => {
    global.fetch.mockClear();
  });

  beforeEach(async () => {
    app = mount(<App />);
    await act(async () => await flushPromises());
    app.update();
  });

  test('keyword search', async () => {
    const searchbar = app.find(SearchBar);

    searchbar
      .find('input[type="text"]')
      .simulate('change', { target: { value: 'user' } });
    const button = app.find('input[type="submit"]');
    button.simulate('click');

    await act(async () => await flushPromises());
    app.update();

    expect(app.find(ListElementContainer)).toBeDefined();
    const listingsList = Array.from(app.find(ListElementContainer));
    expect(listingsList.length).toEqual(1);
    //samplelistings[0] is american studies: a user's guide
    expect(listingsList[0].key).toEqual(sampleListings[0].id);
  });
  test('title search', async () => {
    expect(app).toContainMatchingElement(SearchBar);
    const searchbar = app.find(SearchBar);

    searchbar
      .find('input[type="text"]')
      .simulate('change', { target: { value: 'Winesburg, Ohio' } });
    const button = app.find('input[type="submit"]');
    button.simulate('click');
    await act(async () => await flushPromises());
    app.update();

    expect(app.find(ListElementContainer)).toBeDefined();
    const listingsList = Array.from(app.find(ListElementContainer));
    expect(listingsList.length).toEqual(1);
    //samplelistings[1] is Winesburg
    expect(listingsList[0].key).toEqual(sampleListings[1].id);
  });
  test('courseID search', async () => {
    expect(app).toContainMatchingElement(SearchBar);
    const searchbar = app.find(SearchBar);

    searchbar
      .find('input[type="text"]')
      .simulate('change', { target: { value: 'FYSE 1431' } });
    const button = app.find('input[type="submit"]');
    button.simulate('click');
    await act(async () => await flushPromises());
    app.update();

    expect(app.find(ListElementContainer)).toBeDefined();
    const listingsList = Array.from(app.find(ListElementContainer));
    expect(listingsList.length).toEqual(1);
    //samplelistings[3] is FYSE 1431
    expect(listingsList[0].key).toEqual(sampleListings[3].id);
  });
  test('ISBN search', async () => {
    expect(app).toContainMatchingElement(SearchBar);
    const searchbar = app.find(SearchBar);

    searchbar
      .find('input[type="text"]')
      .simulate('change', { target: { value: '978-1-61219-127-0' } });
    const button = app.find('input[type="submit"]');
    button.simulate('click');
    await act(async () => await flushPromises());
    app.update();

    expect(app.find(ListElementContainer)).toBeDefined();
    const listingsList = Array.from(app.find(ListElementContainer));
    expect(listingsList.length).toEqual(1);
    //samplelistings[3] is 978-1-61219-127-0
    expect(listingsList[0].key).toEqual(sampleListings[3].id);
  });
});
