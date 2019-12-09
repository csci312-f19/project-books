import React from 'react';

import NewPosting, {
  InputLine,
  SubmitButton,
  InputComments,
  InputSelect
} from './NewPosting';

import { act } from 'react-dom/test-utils';
import { flushPromises } from '../setupTests';
import { shallow } from 'enzyme';

const sampleListings = [
  {
    title: "American Studies: A User's Guide",
    courseID: 'AMST 0400A',
    listingID: '1',
    userID: '20',
    ISBN: '978-0-520-28773-0',
    condition: 'Like New',
    price: '13',
    edited: '11/7/19',
    comments: 'Some highlighting'
  },
  {
    title: 'Winesburg, Ohio',
    courseID: 'AMST/ENAM 0282A',
    listingID: '2',
    userID: '30',
    ISBN: '978-0-486-28269-5',
    condition: 'Good',
    price: '4',
    edited: '10/4/12',
    comments: 'Missing cover'
  },
  {
    title: 'Object of Memory: Arab and Jew Narrate the Palestinian Village',
    courseID: 'ANTH 0355',
    listingID: '3',
    userID: '40',
    ISBN: '978-0-8122-1525-0',
    condition: 'Acceptable',
    price: '20',
    edited: '1/31/88',
    comments: 'this book is so good!'
  },
  {
    title: 'Stuffed and Starved, Revised and Expanded',
    courseID: 'FYSE 1431',
    listingID: '4',
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

describe('New Posting tests', () => {
  let comp;
  let inputs;

  beforeAll(() => {
    jest.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });

  afterAll(() => {
    global.fetch.mockClear();
  });

  beforeEach(async () => {
    comp = shallow(<NewPosting ifPosting={'postingView'} />);
    await act(async () => await flushPromises());
    comp.update();
    inputs = comp.find(InputLine);
  });

  test('New Postings has input line with placeholder for title', () => {
    expect(comp.find(InputLine)).toBeDefined();
    const input = inputs.at(0);
    expect(input).toHaveProp('placeholder');

    expect(input.prop('value')).toBeFalsy();
  });

  test('New Postings has input line with placeholder for author', () => {
    expect(comp.find(InputLine)).toBeDefined();
    const input = inputs.at(1);
    expect(input).toHaveProp('placeholder');

    expect(input.prop('value')).toBeFalsy();
  });

  test('New Postings has input line with placeholder for course title', () => {
    expect(comp.find(InputLine)).toBeDefined();
    const input = inputs.at(2);
    expect(input).toHaveProp('placeholder');

    expect(input.prop('value')).toBeFalsy();
  });

  test('New Postings has input line with placeholder for ISBN', () => {
    expect(comp.find(InputLine)).toBeDefined();
    const input = inputs.at(3);
    expect(input).toHaveProp('placeholder');

    expect(input.prop('value')).toBeFalsy();
  });

  test('New Postings has input line with placeholder for course code', () => {
    expect(comp.find(InputLine)).toBeDefined();
    const input = inputs.at(4);
    expect(input).toHaveProp('placeholder');

    expect(input.prop('value')).toBeFalsy();
  });

  test('New Postings has select bar for conditions', () => {
    expect(comp.find(InputSelect)).toBeDefined();
    const input = comp.find(InputSelect);

    expect(input.prop('value')).toBeFalsy();
  });

  test('New Postings has input line with placeholder for price', () => {
    expect(comp.find(InputLine)).toBeDefined();
    const input = inputs.at(5);
    expect(input).toHaveProp('placeholder');

    expect(input.prop('value')).toBeFalsy();
  });

  test('New Postings has input box with placeholder for comments', () => {
    expect(comp.find(InputComments)).toBeDefined();
    const input = comp.find(InputComments);
    expect(input).toHaveProp('placeholder');

    expect(input.prop('value')).toBeFalsy();
  });

  test('New Postings has save/submit button', () => {
    expect(comp.find(SubmitButton)).toBeDefined();
  });
});
//todo: routing tests
