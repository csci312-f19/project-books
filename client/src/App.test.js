import React from 'react';
import App from './App';
import { SearchBar } from './components/SearchBar';
import {
  ListingsCollection,
  SortBar,
  DetailedListing,
  ListElementContainer
} from './components/Listings';
import MyPostings from './components/MyPostings.js';
import {
  View,
  Detail,
  NewInput,
  NewSelect,
  EditDiv,
  ButtonBar
} from './components/MyPostings.js';

import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { flushPromises } from './setupTests';

const sampleListings = [
  {
    title: "American Studies: A User's Guide",
    courseID: 'AMST 0400A',
    id: '1',
    userID: '20',
    ISBN: '978-0-520-28773-0',
    condition: 1,
    price: '13',
    edited: '11/7/19',
    comments: 'Some highlighting'
  },
  {
    title: 'Winesburg, Ohio',
    courseID: 'AMST/ENAM 0282A',
    id: '2',
    userID: '30',
    ISBN: '978-0-486-28269-5',
    condition: 3,
    price: '4',
    edited: '10/4/12',
    comments: 'Missing cover'
  },
  {
    title: 'Object of Memory: Arab and Jew Narrate the Palestinian Village',
    courseID: 'ANTH 0355',
    id: '3',
    userID: '40',
    ISBN: '978-0-8122-1525-0',
    condition: 4,
    price: '20',
    edited: '1/31/88',
    comments: 'this book is so good!'
  },
  {
    title: 'Stuffed and Starved, Revised and Expanded',
    courseID: 'FYSE 1431',
    id: '4',
    userID: '50',
    ISBN: '978-1-61219-127-0',
    condition: 2,
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

describe('App rendering tests', () => {
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

  describe('App initial content', () => {
    test('Contains an SearchBar component', () => {
      expect(app).toContainExactlyOneMatchingElement(SearchBar);
    });

    test('Contains the listingCollections component', () => {
      expect(app).toContainExactlyOneMatchingElement(ListingsCollection);
    });

    test('Doest not contain the sortBar component at startup', () => {
      expect(app).not.toContainExactlyOneMatchingElement(SortBar);
    });
    test('Does not display detailed Listings at startup', () => {
      expect(app).not.toContainMatchingElement(DetailedListing);
    });
  });
  //todo: routing tests
});

describe('SortBar actions', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterAll(() => {
    global.fetch.mockClear();
  });
  let app;

  beforeEach(async () => {
    app = mount(<App />);
    expect(app).toContainMatchingElement(SearchBar);
    const searchbar = app.find(SearchBar);
    //populate the listings so we can sort
    searchbar
      .find('input[type="text"]')
      .simulate('change', { target: { value: 'st' } });
    const button = app.find('input[type="submit"]');
    button.simulate('click');
    await act(async () => await flushPromises());
    app.update();
  });

  test('SortBar is Most Recent on startup', async () => {
    expect(app).toContainMatchingElement(SortBar);
    const sortBar = app.find(SortBar);
    const result = sortBar.find('select').at(0);

    expect(result.prop('value')).toEqual('Most Recent');
  });

  describe('Sorts by Price', () => {
    beforeEach(async () => {
      const sortBar = app.find(SortBar);
      const type = sortBar.find('select').at(0);
      type.simulate('change', { target: { value: '$ to $$$' } });
      await act(async () => await flushPromises());
      app.update();
    });
    test('Sorts by price in ascending order', async () => {
      expect(app).toContainMatchingElement(SortBar);
      expect(app.find(ListElementContainer)).toBeDefined();
      const listingsList = Array.from(app.find(ListElementContainer));
      expect(listingsList.length).toEqual(4);
      expect(listingsList[0].key).toEqual(
        sampleListings.sort((a, b) => a.price - b.price)[0].id
      );
    });

    test('Sorts by price in descending order', async () => {
      const sortBar = app.find(SortBar);
      const type = sortBar.find('select').at(0);
      type.simulate('change', { target: { value: '$$$ to $' } });
      await act(async () => await flushPromises());
      app.update();
      expect(app.find(ListElementContainer)).toBeDefined();
      const listingsList = Array.from(app.find(ListElementContainer));
      expect(listingsList.length).toEqual(4);
      expect(listingsList[0].key).toEqual(
        sampleListings.sort((a, b) => b.price - a.price)[0].id
      );
    });
  });
  describe('Sorts by Condition', () => {
    beforeEach(async () => {
      const sortBar = app.find(SortBar);
      const type = sortBar.find('select').at(0);
      type.simulate('change', { target: { value: 'Old to New' } });
      await act(async () => await flushPromises());
      app.update();
    });
    test('Sorts by condition ascending order', async () => {
      expect(app).toContainMatchingElement(SortBar);
      expect(app.find(ListElementContainer)).toBeDefined();
      const listingsList = Array.from(app.find(ListElementContainer));
      expect(listingsList.length).toEqual(4);
      expect(listingsList[0].key).toEqual(
        sampleListings.sort((a, b) => a.condition - b.condition)[0].id
      );
    });

    test('Sorts by condition in descending order', async () => {
      const sortBar = app.find(SortBar);
      const type = sortBar.find('select').at(0);
      type.simulate('change', { target: { value: 'New to Old' } });
      await act(async () => await flushPromises());
      app.update();
      expect(app.find(ListElementContainer)).toBeDefined();
      const listingsList = Array.from(app.find(ListElementContainer));
      expect(listingsList.length).toEqual(4);
      expect(listingsList[0].key).toEqual(
        sampleListings.sort((a, b) => b.condition - a.condition)[0].id
      );
    });
    describe('Sorts by Alphabetical Order', () => {
      beforeEach(async () => {
        const sortBar = app.find(SortBar);
        const type = sortBar.find('select').at(0);
        type.simulate('change', { target: { value: 'A to Z' } });
        await act(async () => await flushPromises());
        app.update();
      });
      test('Sorts by alphabetically ascending order', async () => {
        expect(app).toContainMatchingElement(SortBar);
        expect(app.find(ListElementContainer)).toBeDefined();
        const listingsList = Array.from(app.find(ListElementContainer));
        expect(listingsList.length).toEqual(4);
        expect(listingsList[0].key).toEqual(
          sampleListings.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            } else {
              return 1;
            }
          })[0].id
        );
      });

      test('Sorts alphabetically in descending order', async () => {
        const sortBar = app.find(SortBar);
        const type = sortBar.find('select').at(0);
        type.simulate('change', { target: { value: 'Z to A' } });
        await act(async () => await flushPromises());
        app.update();
        expect(app.find(ListElementContainer)).toBeDefined();
        const listingsList = Array.from(app.find(ListElementContainer));
        expect(listingsList.length).toEqual(4);
        expect(listingsList[0].key).toEqual(
          sampleListings.sort((a, b) => {
            if (a.title > b.title) {
              return -1;
            } else {
              return 1;
            }
          })[0].id
        );
      });
    });
  });
});

describe('MyPostings tests', () => {
  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterAll(() => {
    global.fetch.mockClear();
  });
  let app;

  beforeEach(async () => {
    app = mount(<MyPostings />);
    await act(async () => await flushPromises());

    app.update();
  });
  window.confirm = jest.fn();
  test('Upon clicking delete on a posting, return to MyPostings', async () => {
    const deletebutton = app.find('button').at(0);
    deletebutton.simulate('click');
    await act(async () => await flushPromises());
    app.update();

    window.confirm.mockClear();

    //update app
    await act(async () => await flushPromises());
    app.update();
    //we return to the mylistings page and there should be no listings to view anymore
    expect(app.find(View)).toBeDefined();
    // and the old listing should not be there-- instead there should be a create new posting button
    expect(app.find(ButtonBar).length).toEqual(4);
    expect(app.find('Link[id="newPosting"]')).toBeDefined();
  });
});
describe('Edit posting tests', () => {
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
  window.confirm = jest.fn();
  test('View change occurs upon clicking edit', async () => {
    const editbutton = app.find('button').at(1);
    editbutton.simulate('click');

    await act(async () => await flushPromises());
    app.update();

    //check if new component appears
    expect(app.find(EditDiv)).toBeDefined();

    //should contain the 5 fields we can edit:1 of type NewSelect, 1 of type NewInput

    const fields = app.find(NewInput);
    expect(fields.length).toEqual(4);
    const conditionfield = app.find(NewSelect);
    expect(conditionfield.length).toEqual(1);
  });

  test('Upon clicking cancel from edit view, return to mypostings', async () => {
    const editbutton = app.find('button').at(1);
    editbutton.simulate('click');

    await act(async () => await flushPromises());
    app.update();

    //we should now be in edit view
    expect(app.find(EditDiv)).toBeDefined();

    const cancelButton = app.find('button').at(0);
    cancelButton.simulate('click');
    //we should no longer be in edit view but in normal view (called "View")
    expect(app.find(View)).toBeDefined();
  });
  test('Upon clicking save from edit view, return to mypostings and store updated listings', async () => {
    const editbutton = app.find('button').at(1);
    editbutton.simulate('click');
    await act(async () => await flushPromises());
    app.update();
    //we should now be in edit view
    expect(app.find(EditDiv)).toBeDefined();
    const changeField = app.find(NewInput).at(0);
    console.log(changeField);
    changeField.simulate('change', { target: { value: ' We changed you!' } });

    const saveButton = app.find('button').at(0);
    saveButton.simulate('click');

    //update app
    await act(async () => await flushPromises());
    app.update();

    window.confirm.mockClear();

    //update app
    await act(async () => await flushPromises());
    app.update();

    //now we should go back to the view mode
    expect(app.find(View)).toBeDefined();
    //and check that all detail elements are populated
    const newField = app.find(Detail).at(0);
    expect(newField.length).toEqual(1);
  });
});
