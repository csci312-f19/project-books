/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

export const sampleBookListings = [
  [
    {
      listingID: 1,
      ISBN: '254068722-9',
      condition: 'Good',
      price: 61,
      courseID: 'HARC 0301A'
    },
    {
      listingID: 2,
      ISBN: '810322020-5',
      condition: 'Good',
      price: 21,
      courseID: 'AMST0252A'
    },
    {
      listingID: 3,
      ISBN: '642971602-3',
      condition: 'Good',
      price: 14,
      courseID: 'LITS 0705'
    },
    {
      listingID: 4,
      ISBN: '611450462-3',
      condition: 'Very Good',
      price: 31,
      courseID: 'AMST0252A'
    },
    {
      listingID: 5,
      ISBN: '400835226-0',
      condition: 'Acceptable',
      price: 62,
      courseID: 'LITS 0705'
    },
    {
      listingID: 6,
      ISBN: '581572768-7',
      condition: 'Like New',
      price: 50,
      courseID: 'ANTH 123'
    },
    {
      listingID: 7,
      ISBN: '249568003-8',
      condition: 'Like New',
      price: 34,
      courseID: 'ECON 0150E'
    },
    {
      listingID: 8,
      ISBN: '525486519-9',
      condition: 'Like New',
      price: 38,
      courseID: 'BIOL 0310A'
    },
    {
      listingID: 9,
      ISBN: '518135760-1',
      condition: 'Acceptable',
      price: 63,
      courseID: 'AMST0252A'
    },
    {
      listingID: 10,
      ISBN: '857534205-3',
      condition: 'Like New',
      price: 9,
      courseID: 'ECON 0210A'
    },
    {
      listingID: 11,
      ISBN: '205440969-3',
      condition: 'Acceptable',
      price: 84,
      courseID: 'RELI 0400'
    },
    {
      listingID: 12,
      ISBN: '620283264-9',
      condition: 'Very Good',
      price: 9,
      courseID: 'SPAN 0370'
    },
    {
      listingID: 13,
      ISBN: '851563779-0',
      condition: 'Good',
      price: 36,
      courseID: 'THEA 0208A'
    },
    {
      listingID: 14,
      ISBN: '323832100-5',
      condition: 'Like New',
      price: 59,
      courseID: 'AMST 0204A'
    },
    {
      listingID: 15,
      ISBN: '582298907-1',
      condition: 'Acceptable',
      price: 19,
      courseID: 'PHIL 0170'
    },
    {
      listingID: 16,
      ISBN: '960918582-7',
      condition: 'Good',
      price: 33,
      courseID: 'THEA 0102C'
    },
    {
      listingID: 17,
      ISBN: '453997237-5',
      condition: 'Good',
      price: 67,
      courseID: 'ECON 0150E'
    },
    {
      listingID: 18,
      ISBN: '526794484-X',
      condition: 'Very Good',
      price: 68,
      courseID: 'ECON 0210A'
    },
    {
      listingID: 19,
      ISBN: '663195999-3',
      condition: 'Poor',
      price: 10,
      courseID: 'CHNS 0425'
    },
    {
      listingID: 20,
      ISBN: '687583054-X',
      condition: 'Good',
      price: 97,
      courseID: 'PHIL 0170'
    },
    {
      listingID: 21,
      ISBN: '220120173-0',
      condition: 'Poor',
      price: 24,
      courseID: 'CHEM 0203A'
    },
    {
      listingID: 22,
      ISBN: '449961343-4',
      condition: 'Poor',
      price: 23,
      courseID: 'SPAN 0101B'
    },
    {
      listingID: 23,
      ISBN: '340367646-3',
      condition: 'Like New',
      price: 94,
      courseID: 'CHNS 0370'
    },
    {
      listingID: 24,
      ISBN: '806563910-0',
      condition: 'Acceptable',
      price: 41,
      courseID: 'IGST 0101'
    },
    {
      listingID: 25,
      ISBN: '073962612-4',
      condition: 'Like New',
      price: 62,
      courseID: 'FYSE 1541'
    },
    {
      listingID: 26,
      ISBN: '981995972-1',
      condition: 'Like New',
      price: 68,
      courseID: 'LITS 0705'
    },
    {
      listingID: 27,
      ISBN: '206212115-6',
      condition: 'Good',
      price: 74,
      courseID: 'ANTH 123'
    },
    {
      listingID: 28,
      ISBN: '779143095-9',
      condition: 'Like New',
      price: 9,
      courseID: 'FYSE 1389'
    },
    {
      listingID: 29,
      ISBN: '224019076-0',
      condition: 'Very Good',
      price: 22,
      courseID: 'FYSE 1389'
    },
    {
      listingID: 3,
      ISBN: '331968626-7',
      condition: 'Good',
      price: 78,
      courseID: 'INTD 0235'
    },
    {
      listingID: 31,
      ISBN: '352300458-6',
      condition: 'Good',
      price: 75,
      courseID: 'CHEM 0203A'
    },
    {
      listingID: 32,
      ISBN: '487820087-1',
      condition: 'Like New',
      price: 100,
      courseID: 'THEA 0102C'
    },
    {
      listingID: 33,
      ISBN: '044215256-6',
      condition: 'Good',
      price: 68,
      courseID: 'AMST0252A'
    },
    {
      listingID: 34,
      ISBN: '846253872-6',
      condition: 'Good',
      price: 49,
      courseID: 'INTD 0235'
    },
    {
      listingID: 35,
      ISBN: '024214729-1',
      condition: 'Good',
      price: 39,
      courseID: 'ENVS/ENAM 0243'
    },
    {
      listingID: 36,
      ISBN: '897521772-8',
      condition: 'Like New',
      price: 42,
      courseID: 'ANTH 0396'
    },
    {
      listingID: 37,
      ISBN: '052268518-8',
      condition: 'Like New',
      price: 21,
      courseID: 'ENVS/ENAM 0243'
    },
    {
      listingID: 38,
      ISBN: '850372061-2',
      condition: 'Poor',
      price: 90,
      courseID: 'RELI 0400'
    },
    {
      listingID: 39,
      ISBN: '076698489-3',
      condition: 'Good',
      price: 60,
      courseID: 'CHNS 0370'
    },
    {
      listingID: 40,
      ISBN: '667145674-7',
      condition: 'Good',
      price: 71,
      courseID: 'THEA 0208A'
    },
    {
      listingID: 41,
      ISBN: '622038841-0',
      condition: 'Acceptable',
      price: 11,
      courseID: 'MATH 0122B'
    },
    {
      listingID: 42,
      ISBN: '568269365-5',
      condition: 'Good',
      price: 11,
      courseID: 'MATH 0122B'
    },
    {
      listingID: 43,
      ISBN: '646133432-7',
      condition: 'Very Good',
      price: 50,
      courseID: '0355'
    },
    {
      listingID: 44,
      ISBN: '896982025-6',
      condition: 'Very Good',
      price: 47,
      courseID: 'ANTH 0396'
    },
    {
      listingID: 45,
      ISBN: '740587935-7',
      condition: 'Very Good',
      price: 88,
      courseID: 'PSCI 0242'
    },
    {
      listingID: 46,
      ISBN: '206089436-0',
      condition: 'Acceptable',
      price: 90,
      courseID: 'CHNS 0425'
    },
    {
      listingID: 47,
      ISBN: '334188286-3',
      condition: 'Acceptable',
      price: 91,
      courseID: 'ANTH 0396'
    },
    {
      listingID: 48,
      ISBN: '644956524-1',
      condition: 'Acceptable',
      price: 90,
      courseID: 'ECON 0150E'
    },
    {
      listingID: 49,
      ISBN: '564560585-3',
      condition: 'Good',
      price: 40,
      courseID: 'THEA 0208A'
    },
    {
      listingID: 50,
      ISBN: '974855107-5',
      condition: 'Like New',
      price: 53,
      courseID: 'ANTH 123'
    }
  ]
];

export const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};
