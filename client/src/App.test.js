import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SearchBar from './components/SearchBar';
import Listings from './components/Listings';
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
  });

  describe('App component initial content', () => {
    test('Contains an listings component', () => {
      expect(app).toContainExactlyOneMatchingElement(Listings);
    });
  });
});
