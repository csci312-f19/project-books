import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import { pseudoServer, flushPromises } from './setupTests';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Immutable from 'immutable';
import { act } from 'react-dom/test-utils';

import {
  Listings,
  DetailedListing,
  SortBar,
  ListingsCollection
} from './components/Listings';

const listing = {
  listingID: '1',
  userID: '20',
  ISBN: '978-0-520-28773-0',
  condition: 'Like New',
  price: '13',
  edited: '11/7/19',
  comments: 'Some highlighting'
};
const listing2 = {
  listingID: '2',
  userID: '30',
  ISBN: '978-0-486-28269-5',
  condition: 'Good',
  price: '4',
  edited: '10/4/12',
  comments: 'Missing cover'
};

describe('SearchBar', () => {
  let app;

  beforeEach(async () => {
    pseudoServer.initialize();
    app = mount(<App />);
    await act(async () => await flushPromises());
    app.update();
  });
  test('keyword search', () => {
    expect(app).toContainMatchingElement(Listings);
    // expect(comp).not.toContainMatchingElement(FilmDetail);
  });

  // Given the FilmContainer is rendered
  // And the FilmDetail component does not exist
  // When I click on the FilmTitle component
  // Then I expect the FilmDetail component to exist
  // And I expect the element 'img[src="http://image.tmdb.org/t/p/w185/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg"]' to exist
  // When I click on the FilmTitle component
  // Then I expect the FilmDetail component to not exist
  // test('Clicking on title toggles detail view', () => {
  //   // Use mount so that children will be rendered and we can interact with the DOM
  //   const comp = mount(<FilmContainer {...film} setRatingFor={jest.fn} />);
  //   expect(comp).not.toContainMatchingElement(FilmDetail);
  //
  //   // YOUR TESTS HERE
  //   // Click on film title
  //   comp.find('FilmTitle').simulate('click');
  //   expect(comp).toContainMatchingElement(FilmDetail);
  //   expect(comp).toContainExactlyOneMatchingElement(
  // 'img[src="http://image.tmdb.org/t/p/w185/jjBgi2r5cRt36xF6iNUEhzscEcb.jpg"]');
  //
  //   comp.find('FilmTitle').simulate('click');
  //
  //   expect(comp).not.toContainMatchingElement(FilmDetail);
  //
  // });
});
