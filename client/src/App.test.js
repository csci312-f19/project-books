import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SearchBar from './components/SearchBar';
import {
  Listings,
  ListingsCollection,
  DetailedListing,
  SortBar
} from './components/Listings';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Immutable from 'immutable';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { pseudoServer, flushPromises } from './setupTests';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('App rendering tests', () => {
  let app;

  beforeEach(async () => {
    pseudoServer.initialize();
    app = mount(<App />);
    await act(async () => await flushPromises());
    app.update();
  });

  describe('App component initial content', () => {
    test('Contains an SearchBar component', () => {
      expect(app).toContainExactlyOneMatchingElement(SearchBar);
    });

    test('Contains the listingCollctions component', () => {
      expect(app).toContainExactlyOneMatchingElement(ListingsCollection);
    });

    // test('Contains the sortBar component', () => {
    //     expect(app).toContainExactlyOneMatchingElement(SortBar);
    // });
    // test('Does not display detailed Listings at startup', () => {
    //   expect(app).not.toContainMatchingElement(DetailedListing);
    // });
    // test('Does not display detailed Listings at startup', () => {
    //     expect(app).toContainExactlyOneMatchingElement(Listings);
    //   });
  });
});
