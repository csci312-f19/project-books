import React from 'react';
import { mount } from 'enzyme';
import App from '.././App';
import { flushPromises } from '.././setupTests';
import { Link } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import MyPostings from './MyPostings.js';
import {
  View,
  Detail,
  EditButtonBar,
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

  test('MyPostings list exists upon page load', async () => {
    const mypostings = app.find(MyPostings);
    //there is one view for each listing, so expect it to find 1
    const myViews = app.find(View).at(0);

    expect(myViews.length).toEqual(1);
    //check that it has all the fields
    const myFields = app.find(Detail);
    expect(myFields.length).toEqual(7);
  });

  test('Upon clicking delete on a posting, return to MyPostings', async () => {
    const deletebutton = app.find('button').at(0);
    deletebutton.simulate('click');

    //update app
    await act(async () => await flushPromises());
    app.update();
    //we return to the mylistings page and there should be no listings to view anymore
    expect(app.find(View)).toBeDefined();
    // and the old listing should not be there-- instead there should be a create new posting button
    expect(app.find(ButtonBar).length).toEqual(1);
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

  test('View change occurs upon clicking edit', async () => {
    const editbutton = app.find('button').at(1);
    editbutton.simulate('click');
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
    //we should now be in edit view
    expect(app.find(EditDiv)).toBeDefined();
    const changeField = app.find(NewInput).at(0);
    changeField.simulate('change', { target: { value: 'We changed you!' } });

    const saveButton = app.find('button').at(1);
    saveButton.simulate('click');
    //update app
    await act(async () => await flushPromises());
    app.update();
    //now we should go back to listings, and check the value of conditionfield
    expect(app.find(View)).toBeDefined();
    //the third field is condition
    const newField = app.find(Detail).at(0);
    expect(newField.props(0)['children'][2]).toEqual(' We changed you!');
  });
});
