import React from 'react';
import { shallow, mount } from 'enzyme';
import Immutable from 'immutable';
import { SortBar } from './Listings';
import data from '../Data/SampleData.json';

const testSample1 = [
  {
    courseID: 'AMST 0400A',
    courseTitle: 'THEORY AND METHOD',
    ISBN: '978-0-520-28773-0',
    Title: "American Studies: A User's Guide",
    'Adoption Level': 'Required',
    'New Only': 'No',
    Price: '50',
    Condition: '1'
  },
  {
    courseID: 'AMST/ENAM 0282A',
    courseTitle: 'RECONSTRUCTING LITERATURE',
    ISBN: '978-0-486-28269-5',
    Title: 'Winesburg, Ohio',
    'Adoption Level': 'Required',
    'New Only': 'No',
    Price: '49',
    Condition: '3'
  }
];

const testSample2 = [
  {
    courseID: 'AMST 0400A',
    courseTitle: 'THEORY AND METHOD',
    ISBN: '978-0-520-28773-0',
    Title: "American Studies: A User's Guide",
    'Adoption Level': 'Required',
    'New Only': 'No',
    Price: '50',
    Condition: '1'
  },
  {
    courseID: 'AMST/ENAM 0282A',
    courseTitle: 'RECONSTRUCTING LITERATURE',
    ISBN: '978-0-486-28269-5',
    Title: 'Winesburg, Ohio',
    'Adoption Level': 'Required',
    'New Only': 'No',
    Price: '49',
    Condition: '3'
  }
];

//*******************  NOTE!!!!  ********************/
// Listings.js is changed: change "const SortBar ..." to "export function SortBar ..."

describe('SortBar actions', () => {
  let sortBar;

  beforeEach(() => {
    sortBar = mount(
      <SortBar
        updatedListings={Immutable.List(data)}
        sortType={'Default'}
        setSortType={jest.fn}
        ascending={true}
        setDirection={jest.fn}
      />
    );
  });

  test('SortBar Functionality', () => {
    let result = sortBar.find('select');
    expect(result.prop('value')).toEqual('Default'); // Unnecessary test, just to check whether find('select') works
  });

  describe('Sorts books by property', () => {
    test('Sorts by price', () => {
      sortBar.setProps({ sortType: 'Price', ascending: true });
      let processedbooks = sortBar.prop('updatedListings').toArray();
      expect(processedbooks.slice(0, 2)).toEqual(testSample1);

      sortBar.setProps({ sortType: 'Price', ascending: false });
      sortBar.update();

      processedbooks = sortBar.prop('updatedListings').toArray();
      expect(processedbooks.slice(0, 2)).toEqual(testSample2);
    });

    test('Sorts by condition', () => {
      sortBar.setProps({ sortType: 'Condition', ascending: true });
      let processedbooks = sortBar.prop('updatedListings').toArray();
      expect(processedbooks.slice(0, 2)).toEqual(testSample1);

      sortBar.setProps({ sortType: 'Condition', ascending: false });
      sortBar.update();

      processedbooks = sortBar.prop('updatedListings').toArray();
      expect(processedbooks.slice(0, 2)).toEqual(testSample2);
    });
  });
});
