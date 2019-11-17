/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';

configure({ adapter: new Adapter() });

export const sampleBookListings = [
  [
    {
      listingID: 1,
      listingID: 51,
      ISBN: '254068722-9',
      condition: 'Good',
      price: 61,
      courseID: 'HARC 0301A'
    },
    {
      listingID: 2,
      listingID: 51,
      ISBN: '810322020-5',
      condition: 'Good',
      price: 21,
      courseID: 'AMST0252A'
    },
    {
      listingID: 3,
      listingID: 40,
      ISBN: '642971602-3',
      condition: 'Good',
      price: 14,
      courseID: 'LITS 0705'
    },
    {
      listingID: 4,
      listingID: 75,
      ISBN: '611450462-3',
      condition: 'Very Good',
      price: 31,
      courseID: 'AMST0252A'
    },
    {
      listingID: 5,
      listingID: 69,
      ISBN: '400835226-0',
      condition: 'Acceptable',
      price: 62,
      courseID: 'LITS 0705'
    },
    {
      listingID: 6,
      listingID: 95,
      ISBN: '581572768-7',
      condition: 'Like New',
      price: 50,
      courseID: 'ANTH 123'
    },
    {
      listingID: 7,
      listingID: 61,
      ISBN: '249568003-8',
      condition: 'Like New',
      price: 34,
      courseID: 'ECON 0150E'
    },
    {
      listingID: 8,
      listingID: 33,
      ISBN: '525486519-9',
      condition: 'Like New',
      price: 38,
      courseID: 'BIOL 0310A'
    },
    {
      listingID: 9,
      listingID: 43,
      ISBN: '518135760-1',
      condition: 'Acceptable',
      price: 63,
      courseID: 'AMST0252A'
    },
    {
      listingID: 10,
      listingID: 85,
      ISBN: '857534205-3',
      condition: 'Like New',
      price: 9,
      courseID: 'ECON 0210A'
    },
    {
      listingID: 11,
      listingID: 21,
      ISBN: '205440969-3',
      condition: 'Acceptable',
      price: 84,
      courseID: 'RELI 0400'
    },
    {
      listingID: 12,
      listingID: 23,
      ISBN: '620283264-9',
      condition: 'Very Good',
      price: 9,
      courseID: 'SPAN 0370'
    },
    {
      listingID: 13,
      listingID: 9,
      ISBN: '851563779-0',
      condition: 'Good',
      price: 36,
      courseID: 'THEA 0208A'
    },
    {
      listingID: 14,
      listingID: 1,
      ISBN: '323832100-5',
      condition: 'Like New',
      price: 59,
      courseID: 'AMST 0204A'
    },
    {
      listingID: 15,
      listingID: 2,
      ISBN: '582298907-1',
      condition: 'Acceptable',
      price: 19,
      courseID: 'PHIL 0170'
    },
    {
      listingID: 16,
      listingID: 17,
      ISBN: '960918582-7',
      condition: 'Good',
      price: 33,
      courseID: 'THEA 0102C'
    },
    {
      listingID: 17,
      listingID: 65,
      ISBN: '453997237-5',
      condition: 'Good',
      price: 67,
      courseID: 'ECON 0150E'
    },
    {
      listingID: 18,
      listingID: 15,
      ISBN: '526794484-X',
      condition: 'Very Good',
      price: 68,
      courseID: 'ECON 0210A'
    },
    {
      listingID: 19,
      listingID: 33,
      ISBN: '663195999-3',
      condition: 'Poor',
      price: 10,
      courseID: 'CHNS 0425'
    },
    {
      listingID: 20,
      listingID: 11,
      ISBN: '687583054-X',
      condition: 'Good',
      price: 97,
      courseID: 'PHIL 0170'
    },
    {
      listingID: 21,
      listingID: 25,
      ISBN: '220120173-0',
      condition: 'Poor',
      price: 24,
      courseID: 'CHEM 0203A'
    },
    {
      listingID: 22,
      listingID: 88,
      ISBN: '449961343-4',
      condition: 'Poor',
      price: 23,
      courseID: 'SPAN 0101B'
    },
    {
      listingID: 23,
      listingID: 80,
      ISBN: '340367646-3',
      condition: 'Like New',
      price: 94,
      courseID: 'CHNS 0370'
    },
    {
      listingID: 24,
      listingID: 80,
      ISBN: '806563910-0',
      condition: 'Acceptable',
      price: 41,
      courseID: 'IGST 0101'
    },
    {
      listingID: 25,
      listingID: 30,
      ISBN: '073962612-4',
      condition: 'Like New',
      price: 62,
      courseID: 'FYSE 1541'
    },
    {
      listingID: 26,
      listingID: 68,
      ISBN: '981995972-1',
      condition: 'Like New',
      price: 68,
      courseID: 'LITS 0705'
    },
    {
      listingID: 27,
      listingID: 82,
      ISBN: '206212115-6',
      condition: 'Good',
      price: 74,
      courseID: 'ANTH 123'
    },
    {
      listingID: 28,
      listingID: 88,
      ISBN: '779143095-9',
      condition: 'Like New',
      price: 9,
      courseID: 'FYSE 1389'
    },
    {
      listingID: 29,
      listingID: 28,
      ISBN: '224019076-0',
      condition: 'Very Good',
      price: 22,
      courseID: 'FYSE 1389'
    },
    {
      listingID: 30,
      listingID: 8,
      ISBN: '331968626-7',
      condition: 'Good',
      price: 78,
      courseID: 'INTD 0235'
    },
    {
      listingID: 31,
      listingID: 14,
      ISBN: '352300458-6',
      condition: 'Good',
      price: 75,
      courseID: 'CHEM 0203A'
    },
    {
      listingID: 32,
      listingID: 79,
      ISBN: '487820087-1',
      condition: 'Like New',
      price: 100,
      courseID: 'THEA 0102C'
    },
    {
      listingID: 33,
      listingID: 53,
      ISBN: '044215256-6',
      condition: 'Good',
      price: 68,
      courseID: 'AMST0252A'
    },
    {
      listingID: 34,
      listingID: 69,
      ISBN: '846253872-6',
      condition: 'Good',
      price: 49,
      courseID: 'INTD 0235'
    },
    {
      listingID: 35,
      listingID: 37,
      ISBN: '024214729-1',
      condition: 'Good',
      price: 39,
      courseID: 'ENVS/ENAM 0243'
    },
    {
      listingID: 36,
      listingID: 97,
      ISBN: '897521772-8',
      condition: 'Like New',
      price: 42,
      courseID: 'ANTH 0396'
    },
    {
      listingID: 37,
      listingID: 1,
      ISBN: '052268518-8',
      condition: 'Like New',
      price: 21,
      courseID: 'ENVS/ENAM 0243'
    },
    {
      listingID: 38,
      listingID: 77,
      ISBN: '850372061-2',
      condition: 'Poor',
      price: 90,
      courseID: 'RELI 0400'
    },
    {
      listingID: 39,
      listingID: 2,
      ISBN: '076698489-3',
      condition: 'Good',
      price: 60,
      courseID: 'CHNS 0370'
    },
    {
      listingID: 40,
      listingID: 91,
      ISBN: '667145674-7',
      condition: 'Good',
      price: 71,
      courseID: 'THEA 0208A'
    },
    {
      listingID: 41,
      listingID: 7,
      ISBN: '622038841-0',
      condition: 'Acceptable',
      price: 11,
      courseID: 'MATH 0122B'
    },
    {
      listingID: 42,
      listingID: 75,
      ISBN: '568269365-5',
      condition: 'Good',
      price: 11,
      courseID: 'MATH 0122B'
    },
    {
      listingID: 43,
      listingID: 77,
      ISBN: '646133432-7',
      condition: 'Very Good',
      price: 50,
      courseID: '0355'
    },
    {
      listingID: 44,
      listingID: 27,
      ISBN: '896982025-6',
      condition: 'Very Good',
      price: 47,
      courseID: 'ANTH 0396'
    },
    {
      listingID: 45,
      listingID: 80,
      ISBN: '740587935-7',
      condition: 'Very Good',
      price: 88,
      courseID: 'PSCI 0242'
    },
    {
      listingID: 46,
      listingID: 5,
      ISBN: '206089436-0',
      condition: 'Acceptable',
      price: 90,
      courseID: 'CHNS 0425'
    },
    {
      listingID: 47,
      listingID: 56,
      ISBN: '334188286-3',
      condition: 'Acceptable',
      price: 91,
      courseID: 'ANTH 0396'
    },
    {
      listingID: 48,
      listingID: 37,
      ISBN: '644956524-1',
      condition: 'Acceptable',
      price: 90,
      courseID: 'ECON 0150E'
    },
    {
      listingID: 49,
      listingID: 77,
      ISBN: '564560585-3',
      condition: 'Good',
      price: 40,
      courseID: 'THEA 0208A'
    },
    {
      listingID: 50,
      listingID: 37,
      ISBN: '974855107-5',
      condition: 'Like New',
      price: 53,
      courseID: 'ANTH 123'
    }
  ]
];

export const pseudoServer = {
  localData: sampleBookListings.slice(),

  stats: {},

  initialize: function() {
    this.localData = sampleBookListings.slice();
    this.stats = {
      get: 0,
      put: 0,
      post: 0,
      delete: 0,
      errors: 0
    };
  },

  find: function(listingID) {
    return this.localData.find(item => item.listingID === listingID);
  }

  // replace: function(item) {
  //   this.localData.splice(this.find(item.listingID), 1, item);
  // },

  // put: function(resource, options) {
  //   this.stats.put += 1;
  //   const data = JSON.parse(options.body);
  //   const listingID = parseInt(resource.slice(resource.lastIndexOf('/') + 1));
  //   if (data.listingID !== listingID) {
  //     this.stats.errors += 1;
  //     return {
  //       ok: false,
  //       status: 500,
  //       statusText: 'listingID mismatch between request and body'
  //     };
  //   }

  //   if (!data.title) {
  //     this.stats.errors += 1;
  //     return {
  //       ok: false,
  //       status: 500,
  //       statusText: 'Title must be defined'
  //     };
  //   }

  //   if (
  //     this.localData.find(
  //       item => item.title === data.title && item.listingID !== data.listingID
  //     )
  //   ) {
  //     this.stats.errors += 1;
  //     return {
  //       ok: false,
  //       status: 500,
  //       statusText: 'Article has duplicate title'
  //     };
  //   }

  // check if this really is an update
  //   if (!this.find(data.listingID)) {
  //     this.stats.errors += 1;
  //     return {
  //       ok: false,
  //       status: 500,
  //       statusText: 'Original item not found'
  //     };
  //   }

  //   this.replace(data);

  //   return {
  //     ok: true,
  //     json: () => data
  //   };
  // },

  // post: function(resource, options) {
  //   this.stats.post += 1;
  //   const data = JSON.parse(options.body);

  //   let maxId = this.localData[0].listingID;
  //   this.localData.forEach(item => {
  //     maxId = Math.max(maxId, item.listingID);
  //   });
  //   maxId = maxId + 2; // In case clients hard code increment
  //   data.listingID = maxId;

  //   if (!data.title) {
  //     this.stats.errors += 1;
  //     return {
  //       ok: false,
  //       status: 400,
  //       statusText: 'Title must be defined'
  //     };
  //   }

  //   if (this.localData.find(item => item.title === data.title)) {
  //     this.stats.errors += 1;
  //     return {
  //       ok: false,
  //       status: 400,
  //       statusText: 'Article has duplicate title'
  //     };
  //   }

  //   this.localData.push(data);
  //   return {
  //     ok: true,
  //     json: () => data
  //   };
  // },

  // delete: function(resource) {
  //   this.stats.delete += 1;
  //   const listingID = parseInt(resource.slice(resource.lastIndexOf('/') + 1));
  //   const index = this.localData.findIndex(item => item.listingID === listingID);
  //   // check if this really is a delete
  //   if (index === -1) {
  //     this.stats.errors += 1;
  //     return {
  //       ok: false,
  //       status: 500,
  //       statusText: 'Original item not found'
  //     };
  //   }

  //   this.localData.splice(index, 1);
  //   return {
  //     ok: true
  //   };
  // },

  // get: function() {
  //   this.stats.get += 1;
  //   // Make deep copy of data in case code under test modifies objects
  //   return {
  //     ok: true,
  //     json: () => JSON.parse(JSON.stringify(this.localData))
  //   };
  // }
};

export const flushPromises = () => {
  return new Promise(resolve => setImmediate(resolve));
};
